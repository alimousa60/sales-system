const AuthService = require('../services/auth.service');
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
      res.json({ status: 'success', ...result });
    } catch (error) {
      logger.error('خطأ في تسجيل الدخول: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async logout(req, res) {
    try {
      await AuthService.logLogout(req.user?.userId, req.ip);
      res.json({ status: 'success', message: 'تم تسجيل الخروج بنجاح' });
    } catch (error) {
      logger.error('خطأ في تسجيل الخروج: ' + error.message);
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
