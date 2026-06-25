const express = require('express');
const ErrorLog = require('../models/error-log.model');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, source, filename, lineno, colno, stack, url, level, metadata } = req.body;
    if (!message) return res.status(400).json({ status: 'error', message: 'Message required' });

    const companyId = req.user?.companyId;
    const userId = req.user?.userId;

    const existing = companyId ? await ErrorLog.findOne({ companyId, message, source, filename, resolved: false }) : null;
    if (existing) {
      existing.count += 1;
      existing.lastOccurrence = new Date();
      if (stack && !existing.stack) existing.stack = stack;
      await existing.save();
      return res.json({ status: 'success', id: existing._id, count: existing.count });
    }

    const error = await ErrorLog.create({
      companyId, userId, message, source, filename, lineno, colno, stack,
      url: url || req.get('Referer'),
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection?.remoteAddress,
      level: level || 'error',
      metadata
    });

    res.status(201).json({ status: 'success', id: error._id });
  } catch (e) {
    res.status(201).json({ status: 'success', id: null });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50, resolved, level } = req.query;
    const filter = { companyId: req.user.companyId };
    if (resolved !== undefined) filter.resolved = resolved === 'true';
    if (level) filter.level = level;

    const errors = await ErrorLog.find(filter)
      .sort({ lastOccurrence: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ErrorLog.countDocuments(filter);

    res.json({ status: 'success', errors, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) } });
  } catch (e) {
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/:id/resolve', authenticateToken, async (req, res) => {
  try {
    await ErrorLog.findByIdAndUpdate(req.params.id, { resolved: true, resolvedAt: new Date(), resolvedBy: req.user.userId });
    res.json({ status: 'success' });
  } catch (e) {
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await ErrorLog.findByIdAndDelete(req.params.id);
    res.json({ status: 'success' });
  } catch (e) {
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const filter = { companyId: req.user.companyId };
    const total = await ErrorLog.countDocuments(filter);
    const unresolved = await ErrorLog.countDocuments({ ...filter, resolved: false });
    const byLevel = await ErrorLog.aggregate([
      { $match: filter },
      { $group: { _id: '$level', count: { $sum: '$count' } } }
    ]);
    res.json({ status: 'success', total, unresolved, byLevel });
  } catch (e) {
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
