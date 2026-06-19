const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeNo: { type: String, default: '' },
  employeeName: { type: String, default: '' },
  date: { type: String, required: true },
  quality: { type: Number, min: 1, max: 5, default: 3 },
  productivity: { type: Number, min: 1, max: 5, default: 3 },
  teamwork: { type: Number, min: 1, max: 5, default: 3 },
  attendance: { type: Number, min: 1, max: 5, default: 3 },
  average: { type: Number, default: 0 },
  grade: { type: String, default: '' },
  notes: { type: String, default: '' },
  evaluatedBy: { type: String, default: '' }
}, { timestamps: true });

performanceSchema.index({ companyId: 1, employeeId: 1, date: 1 });

module.exports = mongoose.models.Performance || mongoose.model('Performance', performanceSchema);
