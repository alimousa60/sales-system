const { body, param, query, validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'بيانات غير صحيحة',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}

const loginValidator = [
  body('username').trim().notEmpty().withMessage('اسم المستخدم مطلوب'),
  body('password').notEmpty().withMessage('كلمة المرور مطلوبة'),
  handleValidation
];

const createUserValidator = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('اسم المستخدم يجب أن يكون بين 3 و 30 حرفاً'),
  body('password').isLength({ min: 4 }).withMessage('كلمة المرور يجب أن تكون 4 أحرف على الأقل'),
  body('name').trim().notEmpty().withMessage('الاسم مطلوب'),
  body('role').isIn(['system_admin', 'admin', 'manager', 'user', 'sales', 'inventory']).withMessage('دور غير صحيح'),
  body('companyId').isMongoId().withMessage('companyId غير صحيح'),
  body('email').optional().isEmail().withMessage('البريد الإلكتروني غير صحيح'),
  handleValidation
];

const updateCompanyValidator = [
  body('name').optional().trim().notEmpty().withMessage('اسم الشركة لا يمكن أن يكون فارغاً'),
  body('phone').optional().trim(),
  body('address').optional().trim(),
  body('email').optional().isEmail().withMessage('البريد الإلكتروني غير صحيح'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('الحالة غير صحيحة'),
  handleValidation
];

const accountValidator = [
  body('name').trim().notEmpty().withMessage('اسم الحساب مطلوب'),
  body('balance').optional().isFloat({ min: 0 }).withMessage('الرصيد يجب أن يكون رقماً موجباً'),
  handleValidation
];

const transactionValidator = [
  body('type').trim().notEmpty().withMessage('نوع المعاملة مطلوب'),
  body('amount').isFloat({ min: 0.001 }).withMessage('المبلغ يجب أن يكون أكبر من 0'),
  body('direction').isIn(['in', 'out']).withMessage('الاتجاه غير صحيح'),
  handleValidation
];

const mongoIdParam = (name) => [
  param(name).isMongoId().withMessage(`المعرف ${name} غير صحيح`),
  handleValidation
];

module.exports = {
  loginValidator,
  createUserValidator,
  updateCompanyValidator,
  accountValidator,
  transactionValidator,
  mongoIdParam
};
