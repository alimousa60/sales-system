const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Role = require('../models/rbac.models').Role;
const RBACauditLog = require('../models/rbacAuditLog.model');
const logger = require('../utils/logger');

class UserService {
  static async list(companyId, { role, status, page = 1, limit = 20 }) {
    const filter = { companyId };
    if (role) filter.role = role;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-passwordHash')
        .populate('roleId', 'name description hierarchy')
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter)
    ]);

    return {
      data: users,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) }
    };
  }

  static async getById(userId, companyId) {
    const user = await User.findById(userId)
      .select('-passwordHash')
      .populate('roleId', 'name description hierarchy permissions');
    if (!user || user.companyId.toString() !== companyId.toString()) return { error: 'المستخدم غير موجود', code: 404 };
    return { data: user };
  }

  static async create({ username, password, name, email, role, companyId }, reqUserId, reqCompanyId) {
    if (!username || !password || !name) return { error: 'الحقول المطلوبة مفقودة.', code: 400 };
    const validRoles = ['system_admin', 'admin', 'manager', 'user', 'sales', 'inventory'];
    const userRole = role || 'user';
    if (!validRoles.includes(userRole)) return { error: 'دور غير صحيح.', code: 400 };

    const targetCompanyId = companyId || reqCompanyId;
    if (!targetCompanyId) return { error: 'companyId مطلوب', code: 400 };

    const existingUser = await User.findOne({ username });
    if (existingUser) return { error: 'اسم المستخدم موجود بالفعل.', code: 409 };

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username, passwordHash, name, email,
      role: userRole, companyId: targetCompanyId, createdBy: reqUserId
    });
    await newUser.save();

    await RBACauditLog.create({
      userId: reqUserId, action: 'CREATE_USER', resource: 'User',
      resourceId: newUser._id, changes: { role: userRole, companyId: targetCompanyId },
      status: 'success'
    }).catch(() => {});

    return {
      user: { id: newUser._id, username: newUser.username, name: newUser.name, role: newUser.role, email: newUser.email, companyId: newUser.companyId }
    };
  }

  static async updateRole(userId, roleId, companyId, reqUserId) {
    const role = await Role.findById(roleId);
    if (!role) return { error: 'الدور غير موجود', code: 404 };

    const user = await User.findById(userId);
    if (!user || user.companyId.toString() !== companyId.toString()) return { error: 'المستخدم غير موجود', code: 404 };

    const oldRole = user.roleId;
    user.roleId = roleId;
    user.role = role.name.toLowerCase();
    await user.save();

    await RBACauditLog.create({
      userId: reqUserId, action: 'CHANGE_USER_ROLE', resource: 'User',
      resourceId: user._id, oldValues: { roleId: oldRole }, newValues: { roleId },
      status: 'success'
    });

    return { data: user };
  }

  static async updateStatus(userId, status, companyId, reqUserId) {
    if (!['active', 'inactive', 'suspended'].includes(status)) return { error: 'حالة غير صحيحة', code: 400 };

    const user = await User.findById(userId);
    if (!user || user.companyId.toString() !== companyId.toString()) return { error: 'المستخدم غير موجود', code: 404 };

    const oldStatus = user.status;
    user.status = status;
    user.isActive = status === 'active';
    await user.save();

    await RBACauditLog.create({
      userId: reqUserId, action: 'CHANGE_USER_STATUS', resource: 'User',
      resourceId: user._id, oldValues: { status: oldStatus }, newValues: { status },
      status: 'success'
    });

    return { data: user };
  }
}

module.exports = UserService;
