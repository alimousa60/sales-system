const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Company = require('../models/company.model');
const Account = require('../models/account.model');
const AuditLog = require('../models/auditLog.model');
const { logAudit } = require('../utils/helpers');

const logger = require('../utils/logger');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ companyId: req.user.companyId })
      .select('-passwordHash')
      .populate('createdBy', 'name')
      .sort('-createdAt');

    res.json({ status: 'success', users });
  } catch (error) {
    logger.error('خطأ في الحصول على المستخدمين: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.put('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role, isActive } = req.body;

    const user = await User.findById(userId);
    if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
      return res.status(404).json({ status: 'error', message: 'المستخدم غير موجود' });
    }

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
    await logAudit(req.user.userId, 'UPDATE_USER', 'User', userId, changes, req);

    res.json({ status: 'success', message: 'تم تحديث المستخدم بنجاح', user });
  } catch (error) {
    logger.error('خطأ في تحديث المستخدم: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
      return res.status(404).json({ status: 'error', message: 'المستخدم غير موجود' });
    }

    if (user.role === 'admin' && user._id.toString() !== req.user.userId.toString()) {
      const adminCount = await User.countDocuments({ role: 'admin', companyId: req.user.companyId });
      if (adminCount <= 1) {
        return res.status(400).json({ status: 'error', message: 'يجب أن يكون هناك مسؤول واحد على الأقل' });
      }
    }

    await User.findByIdAndDelete(userId);
    await Account.deleteMany({ user_id: userId });

    await logAudit(req.user.userId, 'DELETE_USER', 'User', userId, null, req);
    res.json({ status: 'success', message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    logger.error('خطأ في حذف المستخدم: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/audit-logs', async (req, res) => {
  try {
    const { limit = 50, skip = 0 } = req.query;

    const logs = await AuditLog.find()
      .populate('userId', 'name username')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await AuditLog.countDocuments();

    res.json({ status: 'success', logs, total, limit: parseInt(limit), skip: parseInt(skip) });
  } catch (error) {
    logger.error('خطأ في الحصول على سجلات التدقيق: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
