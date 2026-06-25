const express = require('express');
const Expense = require('../models/expense.model');
const { requireAdmin } = require('../middleware/auth.middleware');
const { requireFields } = require('../middleware/validation');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, from, to, limit = 100, skip = 0 } = req.query;
    const filter = { companyId: req.user.companyId };
    if (category) filter.category = category;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }
    const [expenses, total] = await Promise.all([
      Expense.find(filter).sort('-date').limit(parseInt(limit)).skip(parseInt(skip)).populate('userId', 'name'),
      Expense.countDocuments(filter)
    ]);
    const summary = await Expense.aggregate([
      { $match: { companyId: req.user.companyId, ...(from || to ? { date: {} } : {}) } },
      ...(from || to ? [{ $match: { date: { ...(from ? { $gte: from } : {}), ...(to ? { $lte: to } : {}) } } }] : []),
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json({ status: 'success', expenses, total, summary });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', requireFields('description', 'amount', 'date', 'category'), async (req, res) => {
  try {
    const expense = await Expense.create({
      companyId: req.user.companyId,
      userId: req.user.userId,
      category: req.body.category,
      description: req.body.description,
      amount: Number(req.body.amount),
      date: req.body.date,
      paymentMethod: req.body.paymentMethod || 'cash',
      notes: req.body.notes || '',
      tags: req.body.tags || [],
      isRecurring: req.body.isRecurring || false,
      recurringPeriod: req.body.recurringPeriod || 'monthly'
    });
    res.status(201).json({ status: 'success', expense });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.patch('/:expenseId', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.expenseId, companyId: req.user.companyId });
    if (!expense) return res.status(404).json({ status: 'error', message: 'المصروف غير موجود' });
    const allowed = ['category', 'description', 'amount', 'date', 'paymentMethod', 'notes', 'status', 'tags'];
    allowed.forEach(f => { if (req.body[f] !== undefined) expense[f] = req.body[f]; });
    await expense.save();
    res.json({ status: 'success', expense });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.delete('/:expenseId', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.expenseId, companyId: req.user.companyId });
    if (!expense) return res.status(404).json({ status: 'error', message: 'المصروف غير موجود' });
    res.json({ status: 'success', message: 'تم حذف المصروف' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = { companyId: req.user.companyId };
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = from;
      if (to) match.date.$lte = to;
    }
    const [totalResult, byCategory, byMonth] = await Promise.all([
      Expense.aggregate([{ $match: match }, { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }]),
      Expense.aggregate([{ $match: match }, { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } }, { $sort: { total: -1 } }]),
      Expense.aggregate([
        { $match: match },
        { $group: { _id: { $substr: ['$date', 0, 7] }, total: { $sum: '$amount' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
    ]);
    res.json({
      status: 'success',
      total: totalResult[0]?.total || 0,
      count: totalResult[0]?.count || 0,
      byCategory,
      byMonth
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
