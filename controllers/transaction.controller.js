const TransactionService = require('../services/transaction.service');
const logger = require('../utils/logger');

class TransactionController {
  static async create(req, res) {
    try {
      const result = await TransactionService.create(req.body, req.user, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.status(201).json({ status: 'success', transaction: result.transaction });
    } catch (error) {
      logger.error('خطأ في إنشاء المعاملة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async list(req, res) {
    try {
      const result = await TransactionService.list(req.user.companyId, req.query);
      res.json({ status: 'success', ...result });
    } catch (error) {
      logger.error('خطأ في جلب المعاملات: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async getById(req, res) {
    try {
      const result = await TransactionService.getById(req.params.transactionId, req.user.companyId);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', transaction: result.transaction });
    } catch (error) {
      logger.error('خطأ في جلب المعاملة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async update(req, res) {
    try {
      const result = await TransactionService.update(req.params.transactionId, req.body, req.user.companyId, req.user.userId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', transaction: result.transaction });
    } catch (error) {
      logger.error('خطأ في تحديث المعاملة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async reconcile(req, res) {
    try {
      const result = await TransactionService.reconcile(req.params.transactionId, req.user.companyId, req.user.userId, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', transaction: result.transaction });
    } catch (error) {
      logger.error('خطأ في تسوية المعاملة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async receivePayment(req, res) {
    try {
      const result = await TransactionService.receivePayment(req.body, req.user, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.status(201).json({ status: 'success', transaction: result.transaction });
    } catch (error) {
      logger.error('خطأ في استلام الدفع: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async sendPayment(req, res) {
    try {
      const result = await TransactionService.sendPayment(req.body, req.user, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.status(201).json({ status: 'success', transaction: result.transaction });
    } catch (error) {
      logger.error('خطأ في إرسال الدفع: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
}

module.exports = TransactionController;
