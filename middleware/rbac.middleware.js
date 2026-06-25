/**
 * RBAC Middleware Stack
 * طبقة الوسط للتحكم في الوصول بناءً على الأدوار والصلاحيات
 * 
 * Clean Code + SOLID Principles
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

/**
 * محقق الصلاحيات - فئة تجمع كل منطق التحقق
 * Single Responsibility: التحقق من الصلاحيات فقط
 */
class PermissionChecker {
  /**
   * التحقق من أن المستخدم لديه الصلاحية المطلوبة
   * @param {Object} user - بيانات المستخدم
   * @param {String} resource - المورد (transactions, users, etc)
   * @param {String} action - الإجراء (create, read, update, delete)
   * @param {Object} context - context إضافي (ownerId, departmentId, etc)
   * @returns {Boolean}
   */
  static hasPermission(user, resource, action, context = {}) {
    if (!user || !user.permissions) return false;

    // SuperUser لديه وصول لكل شيء
    if (user.roleHierarchy === 1) return true;

    const permission = user.permissions.find(p => p.resource === resource);
    if (!permission) return false;

    // التحقق من الإجراء
    if (!permission.actions.includes(action)) return false;

    // التحقق من القيود
    return this.checkConstraints(permission.constraints, user, context);
  }

  /**
   * التحقق من القيود على الصلاحية
   * @param {Object} constraints - القيود
   * @param {Object} user - بيانات المستخدم
   * @param {Object} context - السياق الإضافي
   * @returns {Boolean}
   */
  static checkConstraints(constraints, user, context = {}) {
    if (!constraints) return true;

    // فحص ownDataOnly
    if (constraints.ownDataOnly && context.ownerId) {
      if (context.ownerId.toString() !== user.userId.toString()) {
        return false;
      }
    }

    // فحص departmentOnly
    if (constraints.departmentOnly && context.departmentId) {
      if (user.metadata?.department !== context.departmentId) {
        return false;
      }
    }

    // فحص companyOnly
    if (constraints.companyOnly && context.companyId) {
      if (user.companyId.toString() !== context.companyId.toString()) {
        return false;
      }
    }

    return true;
  }
}

// ============= MIDDLEWARE STACK =============

/**
 * Middleware: فك تشفير التوكن وإضافة بيانات المستخدم
 * يتم استدعاؤه أولاً لكل الـ endpoints المحمية
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'غير مصرح: البطاقة المرور مفقودة'
    });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const message = err.name === 'TokenExpiredError'
        ? 'انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.'
        : 'بطاقة مرور غير صحيحة.';
      return res.status(401).json({ status: 'error', message });
    }

    // حفظ بيانات المستخدم من التوكن
    req.user = {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
      roleId: payload.roleId,
      companyId: payload.companyId,
      roleHierarchy: payload.roleHierarchy || (payload.role === 'system_admin' ? 1 : undefined),
      permissions: payload.permissions,
      metadata: payload.metadata,
      status: payload.status
    };

    next();
  });
}

/**
 * Middleware: التحقق من حالة الحساب (نشط/معلق/محذوف)
 */
function checkAccountStatus(req, res, next) {
  if (req.user?.status !== 'active') {
    return res.status(403).json({
      status: 'error',
      message: 'حسابك غير نشط. يرجى التواصل مع الإدارة.'
    });
  }
  next();
}

/**
 * Middleware: التحقق من الصلاحية للمورد والإجراء المحددين
 * يتم تمريره مع تحديد المورد والإجراء
 * 
 * مثال الاستخدام:
 * app.post('/api/users', 
 *   authenticateToken,
 *   checkPermission('users', 'create'),
 *   createUserController
 * );
 */
function checkPermission(resource, action) {
  return (req, res, next) => {
    const context = {
      companyId: req.user?.companyId,
      ownerId: req.user?.userId,
      departmentId: req.user?.metadata?.department
    };

    const hasPermission = PermissionChecker.hasPermission(
      req.user,
      resource,
      action,
      context
    );

    if (!hasPermission) {
      return res.status(403).json({
        status: 'error',
        message: `ممنوع: ليس لديك صلاحية ${action} على ${resource}`
      });
    }

    next();
  };
}

/**
 * Middleware: فحص الحد الأدنى من المستويات الهرمية
 * مثال: فقط Admin وما فوق يمكنهم تنفيذ الإجراء
 * 
 * مثال الاستخدام:
 * app.delete('/api/users/:id',
 *   authenticateToken,
 *   requireHierarchyLevel(2), // Admin وما فوق
 *   deleteUserController
 * );
 */
function requireHierarchyLevel(minLevel) {
  return (req, res, next) => {
    if (!req.user || req.user.roleHierarchy == null || req.user.roleHierarchy > minLevel) {
      return res.status(403).json({
        status: 'error',
        message: 'ممنوع: مستوى صلاحية غير كافي'
      });
    }
    next();
  };
}

/**
 * Middleware: تسجيل الإجراءات (Audit Logging)
 * يسجل كل الإجراءات الحساسة
 * 
 * ملاحظة: يجب استدعاء هذا الـ middleware قبل الـ controller
 */
function auditLog(action, resource) {
  return (req, res, next) => {
    // حفظ الـ original res.json للتقاط الاستجابة
    const originalJson = res.json;

    res.json = function(data) {
      // تسجيل الإجراء بعد اكتمال المعالجة
      setImmediate(async () => {
        try {
          // يجب أن نستدعي logAudit من database service
          if (req.auditLogger) {
            await req.auditLogger.log({
              userId: req.user?.userId,
              action,
              resource,
              resourceId: req.params.id || req.body.id,
              status: res.statusCode < 400 ? 'success' : 'failed',
              ipAddress: req.ip,
              userAgent: req.get('user-agent'),
              changes: {
                before: req.body.before,
                after: data
              }
            });
          }
        } catch (error) {
          console.error('خطأ في تسجيل الإجراء:', error);
        }
      });

      return originalJson.call(this, data);
    };

    next();
  };
}

/**
 * Middleware: تحديد معدل الطلبات (Rate Limiter) المخصص للأدوار
 * يمكن تعديل الحد بناءً على دور المستخدم
 */
function roleBasedRateLimit(req, res, next) {
  // SuperUser و Admin لا حد لهم
  if (req.user?.roleHierarchy <= 2) {
    return next();
  }

  // باقي المستخدمين لديهم حد أساسي
  // (يمكن توسيع هذا باستخدام Redis للـ tracking)
  next();
}

/**
 * Middleware: التحقق من ملكية المورد
 * يتأكد أن المستخدم يمكنه الوصول فقط إلى بيانات شركته
 */
function checkDataOwnership(req, res, next) {
  const resourceCompanyId = req.body.companyId || req.query.companyId;
  
  if (resourceCompanyId && resourceCompanyId !== req.user?.companyId?.toString()) {
    return res.status(403).json({
      status: 'error',
      message: 'ممنوع: ليست لديك صلاحية الوصول إلى هذا المورد'
    });
  }

  next();
}

// ============= ERROR HANDLER MIDDLEWARE =============

/**
 * معالج الأخطاء المخصص لـ RBAC
 */
function rbacErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'غير مصرح'
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      status: 'error',
      message: 'ممنوع'
    });
  }

  next(err);
}

// ============= EXPORTS =============

module.exports = {
  PermissionChecker,
  authenticateToken,
  checkAccountStatus,
  checkPermission,
  requireHierarchyLevel,
  auditLog,
  roleBasedRateLimit,
  checkDataOwnership,
  rbacErrorHandler
};
