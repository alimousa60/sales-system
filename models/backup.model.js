const mongoose = require('mongoose');

const backupSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  label: { type: String, default: '' },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  size: { type: Number, default: 0 },
  itemCount: { type: Number, default: 0 },
  status: { type: String, enum: ['success', 'failed'], default: 'success' }
}, { timestamps: true });

backupSchema.index({ companyId: 1, createdAt: -1 });
backupSchema.index({ companyId: 1, userId: 1 });

module.exports = mongoose.models.Backup || mongoose.model('Backup', backupSchema);
