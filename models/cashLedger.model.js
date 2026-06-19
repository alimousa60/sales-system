const mongoose = require('mongoose');

const cashLedgerSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  type: { type: String, enum: ['in', 'out'], required: true },
  category: { type: String, enum: ['sale', 'payment', 'purchase', 'supplier_payment', 'advance', 'loan_disbursement', 'loan_repayment', 'payroll', 'expense', 'adjustment', 'other'], required: true },
  amount: { type: Number, required: true, min: 0.001 },
  balanceAfter: { type: Number, required: true },
  referenceId: { type: String, default: '' },
  referenceModel: { type: String, default: '' },
  description: { type: String, default: '' },
  date: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  employeeNo: { type: String, default: '' },
  employeeName: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isLocked: { type: Boolean, default: false }
}, { timestamps: true });

cashLedgerSchema.index({ companyId: 1, date: 1 });
cashLedgerSchema.index({ companyId: 1, employeeId: 1 });
cashLedgerSchema.index({ companyId: 1, category: 1 });
cashLedgerSchema.index({ companyId: 1, isLocked: 1 });

module.exports = mongoose.models.CashLedger || mongoose.model('CashLedger', cashLedgerSchema);
