const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware المصادقة الموحد
 * يستخرج بيانات المستخدم من JWT token
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'غير مصرح: البطاقة المرور مفقودة' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const message = err.name === 'TokenExpiredError'
        ? 'انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.'
        : 'بطاقة مرور غير صحيحة.';
      return res.status(401).json({ status: 'error', message });
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
      username: payload.username,
      companyId: payload.companyId
    };

    next();
  });
}

/**
 * Middleware التحقق من حالة الحساب
 */
function checkAccountStatus(req, res, next) {
  if (req.user?.status && req.user.status !== 'active') {
    return res.status(403).json({ status: 'error', message: 'حسابك غير نشط. يرجى التواصل مع الإدارة.' });
  }
  next();
}

/**
 * Middleware التحقق من صلاحيات المدير
 */
function requireAdmin(req, res, next) {
  if (!['admin', 'system_admin'].includes(req.user?.role)) {
    return res.status(403).json({ status: 'error', message: 'ممنوع: مطلوب صلاحيات الإدارة' });
  }
  next();
}

/**
 * Middleware التحقق من صلاحيات مدير النظام
 */
function requireSystemAdmin(req, res, next) {
  if (req.user?.role !== 'system_admin') {
    return res.status(403).json({ status: 'error', message: 'ممنوع: مطلوب صلاحيات مدير النظام' });
  }
  next();
}

module.exports = { authenticateToken, checkAccountStatus, requireAdmin, requireSystemAdmin };
