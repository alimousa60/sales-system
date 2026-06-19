const express = require('express');
const crypto = require('crypto');
const Account = require('../models/account.model');
const { logAudit } = require('../utils/helpers');

const logger = require('../utils/logger');

const router = express.Router();

router.post('/push', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ status: 'error', message: 'متوقع مصفوفة من السجلات' });
    }

    const records = req.body.map((incoming) => ({
      id: incoming.id || crypto.randomUUID(),
      name: incoming.name || 'حساب بدون اسم',
      balance: Number(incoming.balance) || 0,
      user_id: req.user.userId,
      companyId: req.user.companyId,
      is_synced: true,
      updated_at: new Date()
    }));

    for (const record of records) {
      await Account.findOneAndUpdate(
        { id: record.id, user_id: record.user_id, companyId: record.companyId },
        record,
        { upsert: true, new: true }
      );
    }

    await logAudit(req.user.userId, 'SYNC_PUSH', 'Account', 'batch',
      { count: records.length }, req);

    res.json({
      status: 'success',
      message: 'تمت المزامنة بنجاح',
      pushedCount: records.length
    });
  } catch (error) {
    logger.error('خطأ في مزامنة الدفع: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/pull', async (req, res) => {
  try {
    const records = await Account.find({ companyId: req.user.companyId })
      .sort('-updated_at');
    res.json({ status: 'success', records });
  } catch (error) {
    logger.error('خطأ في مزامنة السحب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
