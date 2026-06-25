const express = require('express');
const Backup = require('../models/backup.model');
const { logAudit } = require('../utils/helpers');
const logger = require('../utils/logger');
const { maxLength } = require('../middleware/validation');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const backups = await Backup.find({ companyId: req.user.companyId })
      .select('-data')
      .sort('-createdAt')
      .limit(20);
    res.json({ status: 'success', backups });
  } catch (error) {
    logger.error('خطأ في جلب النسخ الاحتياطية: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/',
  maxLength('label', 100),
  async (req, res) => {
  try {
    const { data, label } = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ status: 'error', message: 'بيانات غير صالحة' });
    }
    const jsonStr = JSON.stringify(data);
    const itemCount = Array.isArray(data.items) ? data.items.length : 0;
    const backup = await Backup.create({
      companyId: req.user.companyId,
      userId: req.user.userId,
      label: label || `نسخة ${new Date().toLocaleDateString('ar')}`,
      data,
      size: Buffer.byteLength(jsonStr, 'utf8'),
      itemCount
    });
    await logAudit(req.user.userId, 'BACKUP_CREATE', 'Backup', backup._id.toString(), { size: backup.size, itemCount }, req);
    res.status(201).json({ status: 'success', backup: { id: backup._id, label: backup.label, size: backup.size, itemCount, createdAt: backup.createdAt } });
  } catch (error) {
    logger.error('خطأ في إنشاء نسخة احتياطية: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/:backupId', async (req, res) => {
  try {
    const backup = await Backup.findOne({ _id: req.params.backupId, companyId: req.user.companyId });
    if (!backup) return res.status(404).json({ status: 'error', message: 'النسخة الاحتياطية غير موجودة' });
    res.json({ status: 'success', backup });
  } catch (error) {
    logger.error('خطأ في جلب النسخة الاحتياطية: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.delete('/:backupId', async (req, res) => {
  try {
    const backup = await Backup.findOneAndDelete({ _id: req.params.backupId, companyId: req.user.companyId });
    if (!backup) return res.status(404).json({ status: 'error', message: 'النسخة الاحتياطية غير موجودة' });
    await logAudit(req.user.userId, 'BACKUP_DELETE', 'Backup', req.params.backupId, {}, req);
    res.json({ status: 'success', message: 'تم حذف النسخة الاحتياطية' });
  } catch (error) {
    logger.error('خطأ في حذف النسخة الاحتياطية: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
