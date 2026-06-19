const mongoose = require('mongoose');
const crypto = require('crypto');

const transactionSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID() },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: {
    type: String,
    enum: ['invoice', 'payment', 'purchase', 'refund', 'adjustment', 'transfer', 'fee', 'settlement'],
    required: true
  },
  category: { type: String, trim: true },
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'LYD', trim: true },
  direction: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  },
  description: { type: String, trim: true },
  accountId: { type: String, trim: true, index: true },
  referenceId: { type: String, trim: true, index: true },
  paymentMethod: {
    type: String,
    enum: ['cash', 'check', 'bank_transfer', 'card', 'online', 'invoice', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'reconciled'],
    default: 'completed'
  },
  approvalState: {
    type: String,
    enum: ['draft', 'pending_approval', 'approved', 'rejected'],
    default: 'approved'
  },
  approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvalNote: { type: String, trim: true },
  dueDate: Date,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
