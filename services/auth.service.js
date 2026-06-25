const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Company = require('../models/company.model');
const AuditLog = require('../models/auditLog.model');
const RBACauditLog = require('../models/rbacAuditLog.model');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

class AuthService {
  static async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) return { error: 'اسم المستخدم غير موجود', code: 401 };

    const isLocked = user.loginAttempts?.lockedUntil && user.loginAttempts.lockedUntil > new Date();
    if (isLocked) {
      const waitMin = Math.ceil((user.loginAttempts.lockedUntil - new Date()) / 60000);
      return { error: `الحساب مقفل. حاول بعد ${waitMin} دقيقة`, code: 423 };
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      const attempts = (user.loginAttempts?.count || 0) + 1;
      const update = { 'loginAttempts.count': attempts };
      if (attempts >= 5) {
        update['loginAttempts.lockedUntil'] = new Date(Date.now() + 15 * 60 * 1000);
        update['loginAttempts.count'] = 0;
      }
      await User.findByIdAndUpdate(user._id, update);
      return { error: 'كلمة المرور غير صحيحة', code: 401 };
    }

    if (user.status !== 'active') {
      return { error: 'حسابك غير نشط. يرجى التواصل مع الإدارة.', code: 403 };
    }

    await User.findByIdAndUpdate(user._id, { 'loginAttempts.count': 0, 'loginAttempts.lockedUntil': null, lastLogin: new Date() });

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role, username: user.username, companyId: user.companyId?.toString() },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      token,
      user: { id: user._id, username: user.username, name: user.name, role: user.role, email: user.email, companyId: user.companyId }
    };
  }

  static async getProfile(userId) {
    return User.findById(userId).select('-passwordHash').populate('roleId', 'name description hierarchy permissions');
  }

  static async createUser({ username, password, name, email, role, companyId }, creatorId) {
    if (!username || !password || !name) return { error: 'الحقول المطلوبة مفقودة.', code: 400 };
    const validRoles = ['system_admin', 'admin', 'manager', 'user', 'sales', 'inventory'];
    if (!validRoles.includes(role)) return { error: 'دور غير صحيح.', code: 400 };
    if (!companyId) return { error: 'companyId مطلوب', code: 400 };

    const targetCompany = await Company.findById(companyId);
    if (!targetCompany) return { error: 'الشركة غير موجودة', code: 404 };

    const existingUser = await User.findOne({ username });
    if (existingUser) return { error: 'اسم المستخدم موجود بالفعل.', code: 409 };

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, name, email, role, companyId, createdBy: creatorId });
    await newUser.save();

    return {
      user: { id: newUser._id, username: newUser.username, name: newUser.name, role: newUser.role, email: newUser.email, companyId: newUser.companyId }
    };
  }

  static async logLogout(userId, ip) {
    try {
      if (RBACauditLog) {
        await RBACauditLog.create({ userId, action: 'LOGOUT', resource: 'User', status: 'success', ipAddress: ip });
      }
    } catch (error) {
      logger.error('خطأ في تسجيل الخروج: ' + error.message);
    }
  }

  static async logAudit(userId, action, resource, resourceId, changes, req) {
    try {
      await AuditLog.create({
        userId, action, resource, resourceId, changes,
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    } catch (error) {
      logger.error('خطأ في تسجيل التدقيق: ' + error.message);
    }
  }
}

module.exports = AuthService;
