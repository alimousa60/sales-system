/**
 * Data Isolation Middleware - 3-Layer Security System
 * Layer 1: Request Validation
 * Layer 2: Query Auto-Filtering
 * Layer 3: Response Sanitization
 * 
 * Ensures complete data isolation between companies, departments, and users
 */

const UserDataAccess = require('../models/userDataAccess.model');

/**
 * LAYER 1: Request Validation
 * Validates that user has permission to access resource type
 */
const validateDataAccess = (allowedResourceTypes = []) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // From JWT token
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: No user context' });
      }

      // Extract resource type from request
      const resourceType = req.body?.resourceType || extractResourceType(req);

      // Check if resource type is in allowed list
      if (allowedResourceTypes.length > 0 && !allowedResourceTypes.includes(resourceType)) {
        await logDataAccess(user.userId, resourceType, 'read', 'denied', 
          'Resource type not allowed for this user', req);
        return res.status(403).json({ 
          error: 'Access Denied',
          message: `You are not allowed to access ${resourceType}`
        });
      }

      // Check user's allowedResources field
      if (user.allowedResources && !user.allowedResources.includes(resourceType)) {
        await logDataAccess(user.userId, resourceType, 'read', 'denied', 
          'Resource type not in user allowedResources', req);
        return res.status(403).json({ 
          error: 'Access Denied',
          message: `Resource type ${resourceType} not allowed`
        });
      }

      // Store resource type for next middleware
      req.resourceType = resourceType;
      req.userContext = {
        userId: user.userId,
        companyId: user.companyId,
        departmentId: user.metadata?.department,
        roleId: user.roleId,
        role: user.role // From RBAC
      };

      next();
    } catch (error) {
      console.error('validateDataAccess error:', error);
      res.status(500).json({ error: 'Data access validation failed' });
    }
  };
};

/**
 * LAYER 2: Query Auto-Filtering
 * Automatically adds filters to every query based on user's role and company
 */
const applyDataIsolation = (req, res, next) => {
  try {
    const user = req.user;
    const userContext = req.userContext;

    if (!user || !userContext) {
      return res.status(401).json({ error: 'No user context for isolation' });
    }

    // Create isolation filter based on role
    const isolationFilter = buildIsolationFilter(user);

    // Attach to request for use in query
    req.isolationFilter = isolationFilter;

      // Middleware to intercept next() and apply filter
      const originalJson = res.json;
      res.json = function(data) {
        // Response is being sent, log the access
        setImmediate(() => {
          logDataAccess(
            user.userId,
            req.resourceType,
            extractAction(req),
            'granted',
            'Data access granted',
            req
          ).catch(err => console.error('Audit log error:', err));
        });

      return originalJson.call(this, data);
    };

    next();
  } catch (error) {
    console.error('applyDataIsolation error:', error);
    res.status(500).json({ error: 'Data isolation layer error' });
  }
};

/**
 * LAYER 3: Response Sanitization
 * Strips sensitive fields and validates response data
 */
const sanitizeResponse = (req, res, next) => {
  const originalJson = res.json;

  res.json = function(data) {
    try {
      if (data && typeof data === 'object') {
        // Sanitize data
        data = sanitizeData(data, req.user);
      }

      return originalJson.call(this, data);
    } catch (error) {
      console.error('sanitizeResponse error:', error);
      return originalJson.call(this, { error: 'Response sanitization failed' });
    }
  };

  next();
};

/**
 * Helper: Build isolation filter based on user role
 */
function buildIsolationFilter(user) {
  const filter = {};

  // Level 1: Always filter by company (hard boundary)
  if (user.companyId) {
    filter.companyId = user.companyId;
  }

  // Level 2: Filter by department based on role
  const roleHierarchy = {
    5: 'viewer',      // Read-only, personal data only
    4: 'employee',    // Department data + personal
    3: 'manager',     // Department data
    2: 'admin',       // Company data
    1: 'superuser'    // All data
  };

  const userRole = roleHierarchy[user.roleId] || 'viewer';

  switch (userRole) {
    case 'superuser':
      // No additional filters
      break;

    case 'admin':
      // Can see all company data
      filter.companyId = user.companyId;
      break;

    case 'manager':
      // Can see department data
      filter.companyId = user.companyId;
      filter.departmentId = user.departmentId;
      break;

    case 'employee':
      // Can see department + personal data
      filter.companyId = user.companyId;
      filter.$or = [
        { departmentId: user.metadata?.department },
        { ownerId: user.userId },
        { sharedWith: user.userId }
      ];
      break;

    case 'viewer':
    default:
      // Can only see personal data and explicitly shared data
      filter.companyId = user.companyId;
      filter.$or = [
        { ownerId: user.userId },
        { sharedWith: user.userId }
      ];
      break;
  }

  return filter;
}

/**
 * Helper: Sanitize sensitive fields from response
 */
function sanitizeData(data, user) {
  const sensitiveFields = [
    'password',
    'passwordHash',
    'loginAttempts',
    'lockedUntil',
    '__v',
    'encryptionKey',
    'accessTokens'
  ];

  // Handle array
  if (Array.isArray(data)) {
    return data.map(item => sanitizeObject(item, sensitiveFields, user));
  }

  // Handle object
  if (data && typeof data === 'object') {
    return sanitizeObject(data, sensitiveFields, user);
  }

  return data;
}

function sanitizeObject(obj, sensitiveFields, currentUser) {
  const sanitized = { ...obj };

  sensitiveFields.forEach(field => {
    delete sanitized[field];
  });

  // Redact emails if not same user
  const objUserId = obj.userId || obj._id?.toString();
  if (obj.email && currentUser && objUserId !== currentUser.userId) {
    sanitized.email = redactEmail(obj.email);
  }

  return sanitized;
}

/**
 * Helper: Extract resource type from request
 */
function extractResourceType(req) {
  const url = req.originalUrl || req.url;
  
  if (url.includes('/sales')) return 'sales';
  if (url.includes('/users')) return 'users';
  if (url.includes('/reports')) return 'reports';
  if (url.includes('/documents')) return 'documents';
  if (url.includes('/audit')) return 'audit_log';
  if (url.includes('/analytics')) return 'analytics';
  
  return 'other';
}

/**
 * Helper: Extract action from HTTP method
 */
function extractAction(req) {
  const method = req.method.toUpperCase();
  
  if (method === 'GET') return 'read';
  if (method === 'POST') return 'create';
  if (method === 'PATCH' || method === 'PUT') return 'update';
  if (method === 'DELETE') return 'delete';
  
  return 'other';
}

/**
 * Helper: Redact email address
 */
function redactEmail(email) {
  if (!email || typeof email !== 'string') return '***@***.***';
  const [name, domain] = email.split('@');
  const redacted = name.substring(0, 2) + '***';
  return `${redacted}@${domain}`;
}

/**
 * Log data access for audit trail
 */
async function logDataAccess(userId, resourceType, action, result, reason, req) {
  try {
    await UserDataAccess.create({
      userId,
      resourceType,
      action,
      result,
      reason,
      companyId: req.user?.companyId,
      departmentId: req.user?.departmentId,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      sessionId: req.sessionID,
      endpointUrl: req.originalUrl,
      httpMethod: req.method,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error logging data access:', error);
  }
}

module.exports = {
  validateDataAccess,
  applyDataIsolation,
  sanitizeResponse,
  buildIsolationFilter,
  logDataAccess
};
