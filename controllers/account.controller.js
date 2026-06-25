const AccountService = require('../services/account.service');
const logger = require('../utils/logger');

class AccountController {
  static async list(req, res) {
    try {
      const accounts = await AccountService.list(req.user.companyId);
      res.json({ status: 'success', accounts });
    } catch (error) {
      logger.error('خطأ في جلب الحسابات: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async create(req, res) {
    try {
      const result = await AccountService.create(req.body, req.user.userId, req.user.companyId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.status(201).json({ status: 'success', message: 'تم إنشاء الحساب بنجاح', account: result.account });
    } catch (error) {
      logger.error('خطأ في إنشاء حساب: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async update(req, res) {
    try {
      const result = await AccountService.update(req.params.accountId, req.body, req.user.companyId, req.user.userId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', message: 'تم تحديث الحساب بنجاح', account: result.account });
    } catch (error) {
      logger.error('خطأ في تحديث الحساب: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async remove(req, res) {
    try {
      const result = await AccountService.remove(req.params.accountId, req.user.companyId, req.user.userId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', message: result.message });
    } catch (error) {
      logger.error('خطأ في حذف الحساب: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
}

module.exports = AccountController;
