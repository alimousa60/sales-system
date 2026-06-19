const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  employeeNo: { type: String, required: true },
  name: { type: String, required: true },
  nameAr: { type: String, default: '' },
  nationalId: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  position: { type: String, default: '' },
  department: { type: String, default: '' },
  contractType: { type: String, enum: ['full_time', 'part_time', 'hourly', 'contract'], default: 'full_time' },
  hourlyRate: { type: Number, default: 0, min: 0 },
  overtimeRate: { type: Number, default: 0, min: 0 },
  monthlySalary: { type: Number, default: 0, min: 0 },
  startDate: { type: String, required: true },
  endDate: { type: String, default: '' },
  status: { type: String, enum: ['active', 'inactive', 'terminated'], default: 'active' },
  bankAccount: { type: String, default: '' },
  bank: { type: String, default: '' },
  workHours: { type: Number, default: 8, min: 1, max: 24 },
  notes: { type: String, default: '' },
  avatar: { type: String, default: '' }
}, { timestamps: true });

employeeSchema.index({ companyId: 1, employeeNo: 1 }, { unique: true });
employeeSchema.index({ companyId: 1, status: 1 });
employeeSchema.index({ companyId: 1, name: 'text', nameAr: 'text' });

module.exports = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
