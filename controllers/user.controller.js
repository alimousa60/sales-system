const UserService = require('../services/user.service');
const logger = require('../utils/logger');

class UserController {
  static async list(req, res) {
    try {
      const result = await UserService.list(req.user.companyId, req.query);
      res.json({ status: 'success', ...result });
    } catch (error) {
      logger.error('خطأ في جلب المستخدمين: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async create(req, res) {
    try {
      const result = await UserService.create(req.body, req.user.userId, req.user.companyId);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.status(201).json({ status: 'success', message: 'تم إنشاء المستخدم بنجاح', user: result.user });
    } catch (error) {
      logger.error('خطأ في إنشاء مستخدم: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async getById(req, res) {
    try {
      const result = await UserService.getById(req.params.userId, req.user.companyId);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', data: result.data });
    } catch (error) {
      logger.error('خطأ في جلب المستخدم: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async updateRole(req, res) {
    try {
      const result = await UserService.updateRole(req.params.userId, req.body.roleId, req.user.companyId, req.user.userId);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', message: 'تم تحديث الدور بنجاح', data: result.data });
    } catch (error) {
      logger.error('خطأ في تحديث الدور: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async updateStatus(req, res) {
    try {
      const result = await UserService.updateStatus(req.params.userId, req.body.status, req.user.companyId, req.user.userId);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', message: 'تم تحديث الحالة بنجاح', data: result.data });
    } catch (error) {
      logger.error('خطأ في تحديث الحالة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
}

module.exports = UserController;
