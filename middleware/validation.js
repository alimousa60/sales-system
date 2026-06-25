/**
 * Input Validation Middleware
 * يتحقق من صحة المدخلات قبل الوصول لقاعدة البيانات
 */

const VALID_ROLES = ['system_admin', 'admin', 'manager', 'user', 'sales', 'inventory'];
const VALID_TRANSACTION_TYPES = ['invoice', 'payment', 'purchase', 'refund', 'adjustment', 'transfer', 'fee', 'settlement'];
const VALID_DIRECTIONS = ['debit', 'credit'];
const VALID_STATUSES = ['pending', 'approved', 'rejected', 'completed', 'cancelled'];
const VALID_CONTRACT_TYPES = ['full_time', 'part_time', 'contract', 'intern'];
const VALID_ATTENDANCE_STATUS = ['present', 'absent', 'late', 'leave', 'holiday'];

/**
 * إزالة المسافات البيضاء الزائدة من النصوص
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * تنظيف كائن البيانات
 */
function sanitizeBody(fields) {
  return (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
      for (const key of Object.keys(req.body)) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = sanitizeString(req.body[key]);
        }
      }
    }
    next();
  };
}

/**
 * التحقق من الحقول المطلوبة
 */
function requireFields(...fields) {
  return (req, res, next) => {
    const missing = fields.filter(f => !req.body[f] || (typeof req.body[f] === 'string' && !req.body[f].trim()));
    if (missing.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `الحقول المطلوبة مفقودة: ${missing.join(', ')}`
      });
    }
    next();
  };
}

/**
 * التحقق من طول النص
 */
function maxLength(field, max) {
  return (req, res, next) => {
    if (req.body[field] && req.body[field].length > max) {
      return res.status(400).json({
        status: 'error',
        message: `${field} لا يمكن أن يتجاوز ${max} حرف`
      });
    }
    next();
  };
}

/**
 * التحقق من الأرقام الموجبة
 */
function positiveNumber(...fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        const val = parseFloat(req.body[field]);
        if (isNaN(val) || val < 0) {
          return res.status(400).json({
            status: 'error',
            message: `${field} يجب أن يكون رقماً موجباً`
          });
        }
      }
    }
    next();
  };
}

/**
 * التحقق من صحة الدور
 */
function validRole(req, res, next) {
  if (req.body.role && !VALID_ROLES.includes(req.body.role)) {
    return res.status(400).json({ status: 'error', message: `دور غير صحيح. الأدوار المسموحة: ${VALID_ROLES.join(', ')}` });
  }
  next();
}

/**
 * التحقق من صحة البريد الإلكتروني
 */
function validEmail(req, res, next) {
  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ status: 'error', message: 'البريد الإلكتروني غير صحيح' });
    }
  }
  next();
}

/**
 * التحقق من قوة كلمة المرور
 */
function strongPassword(req, res, next) {
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({ status: 'error', message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
    }
  }
  next();
}

/**
 * الحد الأقصى للعناصر في المصفوفة
 */
function maxArrayLength(field, max) {
  return (req, res, next) => {
    if (Array.isArray(req.body[field]) && req.body[field].length > max) {
      return res.status(400).json({
        status: 'error',
        message: `${field} لا يمكن أن يحتوي على أكثر من ${max} عنصر`
      });
    }
    next();
  };
}

/**
 * التحقق من صحة MongoId في URL params
 */
function mongoIdParam(paramName) {
  const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
  return (req, res, next) => {
    const value = req.params[paramName];
    if (value && !mongoIdRegex.test(value)) {
      return res.status(400).json({ status: 'error', message: `معرف غير صحيح: ${paramName}` });
    }
    next();
  };
}

/**
 * التحقق من صحة القيمة من قائمة محددة
 */
function validEnum(field, allowedValues) {
  return (req, res, next) => {
    if (req.body[field] && !allowedValues.includes(req.body[field])) {
      return res.status(400).json({
        status: 'error',
        message: `${field} قيمة غير صحيحة. القيم المسموحة: ${allowedValues.join(', ')}`
      });
    }
    next();
  };
}

/**
 * التحقق من صحة الحالة (status)
 */
function validStatus(req, res, next) {
  if (req.body.status && !VALID_STATUSES.includes(req.body.status)) {
    return res.status(400).json({ status: 'error', message: `حالة غير صحيحة. الحالات المسموحة: ${VALID_STATUSES.join(', ')}` });
  }
  next();
}

module.exports = {
  sanitizeBody,
  requireFields,
  maxLength,
  positiveNumber,
  validRole,
  validEmail,
  strongPassword,
  maxArrayLength,
  mongoIdParam,
  validEnum,
  validStatus,
  VALID_ROLES,
  VALID_TRANSACTION_TYPES,
  VALID_DIRECTIONS,
  VALID_STATUSES,
  VALID_CONTRACT_TYPES,
  VALID_ATTENDANCE_STATUS
};
