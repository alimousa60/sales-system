const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['rent', 'utilities', 'salaries', 'supplies', 'marketing', 'transport', 'maintenance', 'insurance', 'taxes', 'office', 'travel', 'other'],
    required: true
  },
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0.001 },
  date: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cash', 'check', 'bank_transfer', 'card'], default: 'cash' },
  receipt: { type: String, default: '' },
  notes: { type: String, default: '' },
  isRecurring: { type: Boolean, default: false },
  recurringPeriod: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: 'monthly' },
  tags: [{ type: String }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' }
}, { timestamps: true });

expenseSchema.index({ companyId: 1, date: -1 });
expenseSchema.index({ companyId: 1, category: 1 });
expenseSchema.index({ companyId: 1, userId: 1 });

module.exports = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
