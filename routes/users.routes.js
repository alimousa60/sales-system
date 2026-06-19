const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Role = require('../models/rbac.models').Role;
const RBACauditLog = require('../models/rbacAuditLog.model');
const logger = require('../utils/logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;

    let filter = { companyId: req.user.companyId };
    if (role) filter.role = role;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const users = await User
      .find(filter)
      .select('-passwordHash')
      .populate('roleId', 'name description hierarchy')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      status: 'success',
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('خطأ في جلب المستخدمين: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, password, name, email, role, companyId } = req.body;
    if (!username || !password || !name) return res.status(400).json({ status: 'error', message: 'الحقول المطلوبة مفقودة.' });
    const validRoles = ['system_admin', 'admin', 'manager', 'user', 'sales', 'inventory'];
    const userRole = role || 'user';
    if (!validRoles.includes(userRole)) return res.status(400).json({ status: 'error', message: 'دور غير صحيح.' });
    const targetCompanyId = companyId || req.user.companyId;
    if (!targetCompanyId) return res.status(400).json({ status: 'error', message: 'companyId مطلوب' });
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ status: 'error', message: 'اسم المستخدم موجود بالفعل.' });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, name, email, role: userRole, companyId: targetCompanyId, createdBy: req.user.userId });
    await newUser.save();
    await RBACauditLog.create({ userId: req.user.userId, action: 'CREATE_USER', resource: 'User', resourceId: newUser._id, changes: { role: userRole, companyId: targetCompanyId }, status: 'success', ipAddress: req.ip }).catch(() => {});
    res.status(201).json({ status: 'success', message: 'تم إنشاء المستخدم بنجاح', user: { id: newUser._id, username: newUser.username, name: newUser.name, role: newUser.role, email: newUser.email, companyId: newUser.companyId } });
  } catch (error) {
    logger.error('خطأ في إنشاء مستخدم: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User
      .findById(req.params.userId)
      .select('-passwordHash')
      .populate('roleId', 'name description hierarchy permissions');

    if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
      return res.status(404).json({
        status: 'error',
        message: 'المستخدم غير موجود'
      });
    }

    res.json({ status: 'success', data: user });
  } catch (error) {
    logger.error('خطأ في جلب المستخدم: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/:userId/role', async (req, res) => {
  try {
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({
        status: 'error',
        message: 'roleId مطلوب'
      });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        status: 'error',
        message: 'الدور غير موجود'
      });
    }

    const user = await User.findById(req.params.userId);
    if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
      return res.status(404).json({
        status: 'error',
        message: 'المستخدم غير موجود'
      });
    }

    const oldRole = user.roleId;
    user.roleId = roleId;
    user.role = role.name.toLowerCase();
    await user.save();

    await RBACauditLog.create({
      userId: req.user.userId,
      action: 'CHANGE_USER_ROLE',
      resource: 'User',
      resourceId: user._id,
      oldValues: { roleId: oldRole },
      newValues: { roleId },
      status: 'success',
      ipAddress: req.ip
    });

    res.json({
      status: 'success',
      message: 'تم تحديث الدور بنجاح',
      data: user
    });
  } catch (error) {
    logger.error('خطأ في تحديث الدور: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/:userId/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'حالة غير صحيحة'
      });
    }

    const user = await User.findById(req.params.userId);
    if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
      return res.status(404).json({
        status: 'error',
        message: 'المستخدم غير موجود'
      });
    }

    const oldStatus = user.status;
    user.status = status;
    user.isActive = status === 'active';
    await user.save();

    await RBACauditLog.create({
      userId: req.user.userId,
      action: 'CHANGE_USER_STATUS',
      resource: 'User',
      resourceId: user._id,
      oldValues: { status: oldStatus },
      newValues: { status },
      status: 'success',
      ipAddress: req.ip
    });

    res.json({
      status: 'success',
      message: 'تم تحديث الحالة بنجاح',
      data: user
    });
  } catch (error) {
    logger.error('خطأ في تحديث الحالة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
