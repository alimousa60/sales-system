const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Account = require('../models/account.model');
const AuditLog = require('../models/auditLog.model');
const { logAudit } = require('../utils/helpers');
const logger = require('../utils/logger');

class AdminService {
  static async listUsers(companyId) {
    return User.find({ companyId })
      .select('-passwordHash')
      .populate('createdBy', 'name')
      .sort('-createdAt');
  }

  static async updateUser(userId, { name, email, role, isActive }, companyId, reqUserId, req) {
    const user = await User.findById(userId);
    if (!user || user.companyId.toString() !== companyId.toString()) return { error: 'المستخدم غير موجود', code: 404 };

    const changes = {};
    if (name && name !== user.name) { user.name = name; changes.name = name; }
    if (email && email !== user.email) { user.email = email; changes.email = email; }
    if (role && role !== user.role && ['admin', 'manager', 'user'].includes(role)) {
      user.role = role; changes.role = role;
    }
    if (isActive !== undefined && isActive !== user.isActive) {
      user.isActive = isActive; changes.isActive = isActive;
    }

    await user.save();
    await logAudit(reqUserId, 'UPDATE_USER', 'User', userId, changes, req);
    return { user };
  }

  static async deleteUser(userId, companyId, reqUserId, req) {
    const user = await User.findById(userId);
    if (!user || user.companyId.toString() !== companyId.toString()) return { error: 'المستخدم غير موجود', code: 404 };

    if (user.role === 'admin' && user._id.toString() !== reqUserId.toString()) {
      const adminCount = await User.countDocuments({ role: 'admin', companyId });
      if (adminCount <= 1) return { error: 'يجب أن يكون هناك مسؤول واحد على الأقل', code: 400 };
    }

    await User.findByIdAndDelete(userId);
    await Account.deleteMany({ user_id: userId });
    await logAudit(reqUserId, 'DELETE_USER', 'User', userId, null, req);
    return { message: 'تم حذف المستخدم بنجاح' };
  }

  static async getAuditLogs({ limit = 50, skip = 0 }) {
    const [logs, total] = await Promise.all([
      AuditLog.find()
        .populate('userId', 'name username')
        .sort('-createdAt')
        .limit(parseInt(limit))
        .skip(parseInt(skip)),
      AuditLog.countDocuments()
    ]);
    return { logs, total, limit: parseInt(limit), skip: parseInt(skip) };
  }
}

module.exports = AdminService;
