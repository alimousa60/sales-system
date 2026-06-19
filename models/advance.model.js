const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeNo: { type: String, required: true },
  employeeName: { type: String, required: true },
  type: { type: String, enum: ['advance', 'loan'], required: true },
  amount: { type: Number, required: true, min: 0.001 },
  remainingBalance: { type: Number, required: true, min: 0 },
  monthlyInstallment: { type: Number, default: 0, min: 0 },
  installmentsTotal: { type: Number, default: 1, min: 1 },
  installmentsPaid: { type: Number, default: 0, min: 0 },
  purpose: { type: String, default: '' },
  date: { type: String, required: true },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  cashLedgerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CashLedger' },
  approvedBy: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true });

advanceSchema.index({ companyId: 1, employeeId: 1, status: 1 });
advanceSchema.index({ companyId: 1, date: 1 });

module.exports = mongoose.models.Advance || mongoose.model('Advance', advanceSchema);
