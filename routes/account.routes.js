const express = require('express');
const crypto = require('crypto');
const Account = require('../models/account.model');
const { logAudit } = require('../utils/helpers');
const logger = require('../utils/logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find({ companyId: req.user.companyId })
      .sort('-updated_at');
    res.json({ status: 'success', accounts });
  } catch (error) {
    logger.error('خطأ في جلب الحسابات: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, balance = 0 } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ status: 'error', message: 'اسم الحساب مطلوب' });
    }

    const account = await Account.create({
      id: crypto.randomUUID(),
      name: name.trim(),
      balance: Number(balance) || 0,
      user_id: req.user.userId,
      companyId: req.user.companyId,
      is_synced: true
    });

    await logAudit(req.user.userId, 'CREATE_ACCOUNT', 'Account', account.id, { name: account.name, balance: account.balance }, req);

    res.status(201).json({ status: 'success', account });
  } catch (error) {
    logger.error('خطأ في إنشاء الحساب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { name, balance } = req.body;

    const account = await Account.findOne({ id: accountId, companyId: req.user.companyId });
    if (!account) {
      return res.status(404).json({ status: 'error', message: 'الحساب غير موجود' });
    }

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

    await logAudit(req.user.userId, 'UPDATE_ACCOUNT', 'Account', account.id, changes, req);

    res.json({ status: 'success', account });
  } catch (error) {
    logger.error('خطأ في تحديث الحساب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.delete('/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findOneAndDelete({ id: accountId, companyId: req.user.companyId });
    if (!account) {
      return res.status(404).json({ status: 'error', message: 'الحساب غير موجود' });
    }

    await logAudit(req.user.userId, 'DELETE_ACCOUNT', 'Account', accountId, null, req);
    res.json({ status: 'success', message: 'تم حذف الحساب بنجاح' });
  } catch (error) {
    logger.error('خطأ في حذف الحساب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
