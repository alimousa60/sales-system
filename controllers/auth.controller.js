const AuthService = require('../services/auth.service');
const User = require('../models/user.model');
const logger = require('../utils/logger');

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ status: 'error', message: 'اسم المستخدم وكلمة المرور مطلوبان.' });
      }
      const result = await AuthService.login(username, password);
      if (result.error) {
        return res.status(result.code).json({ status: 'error', message: result.error });
      }
      if (result.token && result.userId) {
        try {
          const user = await User.findById(result.userId);
          if (user) {
            user.sessions.push({
              token: result.token.slice(-20),
              ip: req.ip || req.connection?.remoteAddress,
              userAgent: req.get('User-Agent'),
              loginAt: new Date(),
              lastActive: new Date(),
              isActive: true
            });
            if (user.sessions.length > 10) user.sessions = user.sessions.slice(-10);
            await user.save();
          }
        } catch (e) { logger.error('خطأ في تسجيل الجلسة: ' + e.message); }
      }
      res.json({ status: 'success', ...result });
    } catch (error) {
      logger.error('خطأ في تسجيل الدخول: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async logout(req, res) {
    try {
      if (req.user?.userId && req.token) {
        try {
          await User.findByIdAndUpdate(req.user.userId, {
            $pull: { sessions: { token: req.token.slice(-20) } }
          });
        } catch (e) {}
      }
      await AuthService.logLogout(req.user?.userId, req.ip);
      res.json({ status: 'success', message: 'تم تسجيل الخروج بنجاح' });
    } catch (error) {
      logger.error('خطأ في تسجيل الخروج: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async getSessions(req, res) {
    try {
      const user = await User.findById(req.user.userId).select('sessions name username');
      if (!user) return res.status(404).json({ status: 'error', message: 'المستخدم غير موجود' });
      res.json({ status: 'success', sessions: user.sessions || [] });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async terminateSession(req, res) {
    try {
      const { sessionId } = req.params;
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ status: 'error', message: 'المستخدم غير موجود' });
      user.sessions = user.sessions.filter(s => s._id.toString() !== sessionId);
      await user.save();
      res.json({ status: 'success', message: 'تم إنهاء الجلسة' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async terminateAllSessions(req, res) {
    try {
      await User.findByIdAndUpdate(req.user.userId, { $set: { sessions: [] } });
      res.json({ status: 'success', message: 'تم إنهاء جميع الجلسات' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async profile(req, res) {
    try {
      const user = await AuthService.getProfile(req.user.userId);
      if (!user) return res.status(404).json({ status: 'error', message: 'المستخدم غير موجود' });
      res.json({ status: 'success', data: user });
    } catch (error) {
      logger.error('خطأ في جلب ملف التعريف: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async createUser(req, res) {
    try {
      const result = await AuthService.createUser(req.body, req.user.userId);
      if (result.error) {
        return res.status(result.code).json({ status: 'error', message: result.error });
      }
      await AuthService.logAudit(req.user.userId, 'CREATE_USER', 'User', result.user.id.toString(), { role: result.user.role, companyId: result.user.companyId }, req);
      res.status(201).json({ status: 'success', message: 'تم إنشاء المستخدم بنجاح', user: result.user });
    } catch (error) {
      logger.error('خطأ في إنشاء مستخدم: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
}

module.exports = AuthController;
