const crypto = require('crypto');
const Account = require('../models/account.model');
const { logAudit } = require('../utils/helpers');
const logger = require('../utils/logger');

class AccountService {
  static async list(companyId) {
    return Account.find({ companyId }).sort('-updated_at');
  }

  static async create({ name, balance }, userId, companyId, req) {
    if (!name || !name.trim()) return { error: 'اسم الحساب مطلوب', code: 400 };
    const account = await Account.create({
      id: crypto.randomUUID(),
      name: name.trim(),
      balance: Number(balance) || 0,
      user_id: userId,
      companyId,
      is_synced: true
    });
    await logAudit(userId, 'CREATE_ACCOUNT', 'Account', account.id, { name: account.name, balance: account.balance }, req);
    return { account };
  }

  static async update(accountId, { name, balance }, companyId, userId, req) {
    const account = await Account.findOne({ id: accountId, companyId });
    if (!account) return { error: 'الحساب غير موجود', code: 404 };

    const changes = {};
    if (typeof name === 'string' && name.trim() && name.trim() !== account.name) {
      account.name = name.trim();
      changes.name = account.name;
    }
    if (typeof balance !== 'undefined' && Number(balance) !== account.balance) {
      account.balance = Number(balance) || 0;
      changes.balance = account.balance;
    }

    account.updated_at = new Date();
    await account.save();
    await logAudit(userId, 'UPDATE_ACCOUNT', 'Account', account.id, changes, req);
    return { account };
  }

  static async remove(accountId, companyId, userId, req) {
    const account = await Account.findOneAndDelete({ id: accountId, companyId });
    if (!account) return { error: 'الحساب غير موجود', code: 404 };
    await logAudit(userId, 'DELETE_ACCOUNT', 'Account', accountId, null, req);
    return { message: 'تم حذف الحساب بنجاح' };
  }
}

module.exports = AccountService;
