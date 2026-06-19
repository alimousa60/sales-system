const express = require('express');
const Transaction = require('../models/transaction.model');
const { sanitizeTransactionPayload, logAudit } = require('../utils/helpers');

const logger = require('../utils/logger');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const transaction = sanitizeTransactionPayload(req.body, req.user);

    if (!transaction.type || !transaction.direction || !transaction.amount || transaction.amount <= 0) {
      return res.status(400).json({ status: 'error', message: 'النوع، الاتجاه والمبلغ مطلوبون وصالحون' });
    }

    const created = await Transaction.create(transaction);
    await logAudit(req.user.userId, 'CREATE_TRANSACTION', 'Transaction', created.id, transaction, req);

    res.status(201).json({ status: 'success', transaction: created });
  } catch (error) {
    logger.error('خطأ في إنشاء المعاملة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 25, type, status, direction, accountId, referenceId, from, to, search } = req.query;
    const filter = { companyId: req.user.companyId };

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (direction) filter.direction = direction;
    if (accountId) filter.accountId = accountId;
    if (referenceId) filter.referenceId = referenceId;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { description: regex },
        { category: regex },
        { paymentMethod: regex },
        { referenceId: regex }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [transactions, total] = await Promise.all([
      Transaction.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
      Transaction.countDocuments(filter)
    ]);

    res.json({ status: 'success', data: transactions, pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    logger.error('خطأ في جلب المعاملات: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/:transactionId', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ id: req.params.transactionId, companyId: req.user.companyId });
    if (!transaction) {
      return res.status(404).json({ status: 'error', message: 'المعاملة غير موجودة' });
    }
    res.json({ status: 'success', transaction });
  } catch (error) {
    logger.error('خطأ في جلب المعاملة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const updates = {};
    const allowedFields = ['description', 'status', 'approvalState', 'approverId', 'approvalNote', 'paymentMethod', 'category', 'dueDate'];

    allowedFields.forEach(field => {
      if (field in req.body) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ status: 'error', message: 'لا توجد بيانات صالحة للتحديث' });
    }

    const transaction = await Transaction.findOne({ id: transactionId, companyId: req.user.companyId });
    if (!transaction) {
      return res.status(404).json({ status: 'error', message: 'المعاملة غير موجودة' });
    }

    if (updates.status && !['pending', 'completed', 'failed', 'reconciled'].includes(updates.status)) {
      return res.status(400).json({ status: 'error', message: 'حالة غير صحيحة للمعاملة' });
    }

    Object.assign(transaction, updates, { updatedAt: new Date() });
    await transaction.save();

    await logAudit(req.user.userId, 'UPDATE_TRANSACTION', 'Transaction', transaction.id, updates, req);
    res.json({ status: 'success', transaction });
  } catch (error) {
    logger.error('خطأ في تحديث المعاملة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/:transactionId/reconcile', async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findOne({ id: transactionId, companyId: req.user.companyId });
    if (!transaction) {
      return res.status(404).json({ status: 'error', message: 'المعاملة غير موجودة' });
    }

    if (transaction.status === 'reconciled') {
      return res.status(400).json({ status: 'error', message: 'المعاملة معاد تسويتها بالفعل' });
    }

    transaction.status = 'reconciled';
    transaction.updatedAt = new Date();
    await transaction.save();

    await logAudit(req.user.userId, 'RECONCILE_TRANSACTION', 'Transaction', transaction.id, { status: 'reconciled' }, req);
    res.json({ status: 'success', transaction });
  } catch (error) {
    logger.error('خطأ في تسوية المعاملة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/receive', async (req, res) => {
  try {
    const payload = { ...req.body, type: 'payment', direction: 'credit' };
    const transaction = sanitizeTransactionPayload(payload, req.user);

    if (!transaction.amount || transaction.amount <= 0) {
      return res.status(400).json({ status: 'error', message: 'مبلغ الدفع مطلوب وصحيح' });
    }

    const created = await Transaction.create(transaction);
    await logAudit(req.user.userId, 'RECEIVE_PAYMENT', 'Transaction', created.id, transaction, req);

    res.status(201).json({ status: 'success', transaction: created });
  } catch (error) {
    logger.error('خطأ في استلام الدفع: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/send', async (req, res) => {
  try {
    const payload = { ...req.body, type: 'payment', direction: 'debit' };
    const transaction = sanitizeTransactionPayload(payload, req.user);

    if (!transaction.amount || transaction.amount <= 0) {
      return res.status(400).json({ status: 'error', message: 'مبلغ الدفع مطلوب وصحيح' });
    }

    const created = await Transaction.create(transaction);
    await logAudit(req.user.userId, 'SEND_PAYMENT', 'Transaction', created.id, transaction, req);

    res.status(201).json({ status: 'success', transaction: created });
  } catch (error) {
    logger.error('خطأ في تسليم الدفع: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
