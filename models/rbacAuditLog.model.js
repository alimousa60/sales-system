const mongoose = require('mongoose');

const rbacAuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  resource: String,
  resourceId: mongoose.Schema.Types.ObjectId,
  oldValues: mongoose.Schema.Types.Mixed,
  newValues: mongoose.Schema.Types.Mixed,
  status: { type: String, enum: ['success', 'failure'], default: 'success' },
  ipAddress: String,
  createdAt: { type: Date, default: Date.now }
}, {
  expires: 7776000
});

module.exports = mongoose.models.RBACauditLog || mongoose.model('RBACauditLog', rbacAuditLogSchema);
