const AdminService = require('../services/admin.service');
const logger = require('../utils/logger');

class AdminController {
  static async listUsers(req, res) {
    try {
      const users = await AdminService.listUsers(req.user.companyId);
      res.json({ status: 'success', users });
    } catch (error) {
      logger.error('خطأ في الحصول على المستخدمين: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async updateUser(req, res) {
    try {
      const result = await AdminService.updateUser(req.params.userId, req.body, req.user.companyId, req.user.userId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', message: 'تم تحديث المستخدم بنجاح', user: result.user });
    } catch (error) {
      logger.error('خطأ في تحديث المستخدم: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const result = await AdminService.deleteUser(req.params.userId, req.user.companyId, req.user.userId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', message: result.message });
    } catch (error) {
      logger.error('خطأ في حذف المستخدم: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async getAuditLogs(req, res) {
    try {
      const result = await AdminService.getAuditLogs(req.query);
      res.json({ status: 'success', ...result });
    } catch (error) {
      logger.error('خطأ في الحصول على سجلات التدقيق: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
}

module.exports = AdminController;
