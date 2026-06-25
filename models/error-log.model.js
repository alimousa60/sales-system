const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  level: { type: String, enum: ['error', 'warning', 'info'], default: 'error' },
  message: { type: String, required: true },
  source: { type: String },
  filename: String,
  lineno: Number,
  colno: Number,
  stack: String,
  url: { type: String },
  userAgent: String,
  ip: String,
  metadata: mongoose.Schema.Types.Mixed,
  resolved: { type: Boolean, default: false },
  resolvedAt: Date,
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  count: { type: Number, default: 1 },
  lastOccurrence: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: false });

errorSchema.index({ companyId: 1, message: 1 });
errorSchema.index({ companyId: 1, createdAt: -1 });

module.exports = mongoose.models.ErrorLog || mongoose.model('ErrorLog', errorSchema);
