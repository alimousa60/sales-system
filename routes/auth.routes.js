const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Role = require('../models/rbac.models').Role;
const RBACauditLog = require('../models/rbacAuditLog.model');
const { logAudit, createJwtForUser } = require('../utils/helpers');
const logger = require('../utils/logger');
const { loginValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/', loginValidator, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ status: 'error', message: 'اسم المستخدم وكلمة المرور مطلوبان.' });
    }

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'بيانات دخول غير صحيحة.' });
    }

    if (user.loginAttempts?.lockedUntil && user.loginAttempts.lockedUntil > new Date()) {
      const minutesRemaining = Math.ceil(
        (user.loginAttempts.lockedUntil - new Date()) / 60000
      );
      return res.status(429).json({
        status: 'error',
        message: `الحساب مقفول. حاول بعد ${minutesRemaining} دقيقة`
      });
    }

    if (!user.isActive || user.status !== 'active') {
      return res.status(403).json({ status: 'error', message: 'حسابك غير نشط' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      user.loginAttempts = user.loginAttempts || { count: 0 };
      user.loginAttempts.count += 1;
      user.loginAttempts.lastAttempt = new Date();

      if (user.loginAttempts.count >= 5) {
        user.loginAttempts.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        await RBACauditLog.create({
          userId: user._id,
          action: 'FAILED_LOGIN_LOCKED',
          resource: 'User',
          status: 'failure',
          ipAddress: req.ip
        });

        return res.status(429).json({
          status: 'error',
          message: 'الحساب مقفول بسبب محاولات دخول متعددة'
        });
      }

      await user.save();
      return res.status(401).json({ status: 'error', message: 'بيانات دخول غير صحيحة.' });
    }

    user.loginAttempts = { count: 0, lastAttempt: null, lockedUntil: null };
    user.lastLogin = new Date();
    await user.save();

    let permissions = [];
    if (user.roleId) {
      const roleDoc = await Role.findById(user.roleId);
      permissions = roleDoc?.permissions || [];
    }

    const token = createJwtForUser(user, permissions);

    await RBACauditLog.create({
      userId: user._id,
      action: 'LOGIN',
      resource: 'User',
      status: 'success',
      ipAddress: req.ip
    });

    await logAudit(user._id, 'LOGIN', 'User', user._id.toString(), null, req);

    res.json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        roleId: user.roleId,
        status: user.status,
        companyId: user.companyId,
        permissions: permissions
      }
    });
  } catch (error) {
    logger.error('خطأ في تسجيل الدخول: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
