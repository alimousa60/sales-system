const Transaction = require('../models/transaction.model');
const { sanitizeTransactionPayload, logAudit } = require('../utils/helpers');
const logger = require('../utils/logger');

class TransactionService {
  static async create(body, user, req) {
    const transaction = sanitizeTransactionPayload(body, user);
    if (!transaction.type || !transaction.direction || !transaction.amount || transaction.amount <= 0) {
      return { error: 'النوع، الاتجاه والمبلغ مطلوبون وصالحون', code: 400 };
    }
    const created = await Transaction.create(transaction);
    await logAudit(user.userId, 'CREATE_TRANSACTION', 'Transaction', created.id, transaction, req);
    return { transaction: created };
  }

  static async list(companyId, query) {
    const { page = 1, limit = 25, type, status, direction, accountId, referenceId, from, to, search } = query;
    const filter = { companyId };

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
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(safeSearch, 'i');
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

    return {
      data: transactions,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) }
    };
  }

  static async getById(transactionId, companyId) {
    const transaction = await Transaction.findOne({ id: transactionId, companyId });
    if (!transaction) return { error: 'المعاملة غير موجودة', code: 404 };
    return { transaction };
  }

  static async update(transactionId, body, companyId, userId, req) {
    const updates = {};
    const allowedFields = ['description', 'status', 'approvalState', 'approverId', 'approvalNote', 'paymentMethod', 'category', 'dueDate'];
    allowedFields.forEach(field => { if (field in body) updates[field] = body[field]; });

    if (Object.keys(updates).length === 0) return { error: 'لا توجد بيانات صالحة للتحديث', code: 400 };

    const transaction = await Transaction.findOne({ id: transactionId, companyId });
    if (!transaction) return { error: 'المعاملة غير موجودة', code: 404 };

    if (updates.status && !['pending', 'completed', 'failed', 'reconciled'].includes(updates.status)) {
      return { error: 'حالة غير صحيحة للمعاملة', code: 400 };
    }

    Object.assign(transaction, updates, { updatedAt: new Date() });
    await transaction.save();
    await logAudit(userId, 'UPDATE_TRANSACTION', 'Transaction', transaction.id, updates, req);
    return { transaction };
  }

  static async reconcile(transactionId, companyId, userId, req) {
    const transaction = await Transaction.findOne({ id: transactionId, companyId });
    if (!transaction) return { error: 'المعاملة غير موجودة', code: 404 };
    if (transaction.status === 'reconciled') return { error: 'المعاملة معاد تسويتها بالفعل', code: 400 };

    transaction.status = 'reconciled';
    transaction.updatedAt = new Date();
    await transaction.save();
    await logAudit(userId, 'RECONCILE_TRANSACTION', 'Transaction', transaction.id, { status: 'reconciled' }, req);
    return { transaction };
  }

  static async receivePayment(body, user, req) {
    const payload = { ...body, type: 'payment', direction: 'credit' };
    const transaction = sanitizeTransactionPayload(payload, user);
    if (!transaction.amount || transaction.amount <= 0) return { error: 'مبلغ الدفع مطلوب وصحيح', code: 400 };
    const created = await Transaction.create(transaction);
    await logAudit(user.userId, 'RECEIVE_PAYMENT', 'Transaction', created.id, transaction, req);
    return { transaction: created };
  }

  static async sendPayment(body, user, req) {
    const payload = { ...body, type: 'payment', direction: 'debit' };
    const transaction = sanitizeTransactionPayload(payload, user);
    if (!transaction.amount || transaction.amount <= 0) return { error: 'مبلغ الدفع مطلوب وصحيح', code: 400 };
    const created = await Transaction.create(transaction);
    await logAudit(user.userId, 'SEND_PAYMENT', 'Transaction', created.id, transaction, req);
    return { transaction: created };
  }
}

module.exports = TransactionService;
