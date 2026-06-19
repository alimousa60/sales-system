const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeNo: { type: String, required: true },
  employeeName: { type: String, required: true },
  period: { type: String, required: true },
  hourlyRate: { type: Number, default: 0 },
  overtimeRate: { type: Number, default: 0 },
  totalWorkedHours: { type: Number, default: 0 },
  totalOvertimeHours: { type: Number, default: 0 },
  grossSalary: { type: Number, default: 0 },
  loanDeduction: { type: Number, default: 0 },
  advanceDeduction: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'approved', 'paid', 'cancelled'], default: 'draft' },
  approvedBy: { type: String, default: '' },
  approvedAt: { type: String, default: '' },
  paidDate: { type: String, default: '' },
  cashLedgerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CashLedger' },
  notes: { type: String, default: '' }
}, { timestamps: true });

payrollSchema.index({ companyId: 1, employeeId: 1, period: 1 }, { unique: true });
payrollSchema.index({ companyId: 1, period: 1 });
payrollSchema.index({ companyId: 1, status: 1 });

module.exports = mongoose.models.Payroll || mongoose.model('Payroll', payrollSchema);
