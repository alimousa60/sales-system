const crypto = require('crypto');
const AuditLog = require('../models/auditLog.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

function sanitizeAccountRecord(record, userId) {
  const incoming = record || {};
  const id = typeof incoming.id === 'string' && incoming.id.trim() ? incoming.id.trim() : crypto.randomUUID();
  const name = typeof incoming.name === 'string' && incoming.name.trim() ? incoming.name.trim() : 'Unnamed Account';
  const balance = typeof incoming.balance === 'number' ? incoming.balance : Number(incoming.balance) || 0;

  return {
    id,
    name,
    balance,
    user_id: userId,
    is_synced: true,
    companyId: incoming.companyId,
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
}

function sanitizeTransactionPayload(payload, user) {
  const incoming = payload || {};
  const id = typeof incoming.id === 'string' && incoming.id.trim() ? incoming.id.trim() : crypto.randomUUID();
  const amount = typeof incoming.amount === 'number' ? incoming.amount : Number(incoming.amount);
  const currency = typeof incoming.currency === 'string' && incoming.currency.trim() ? incoming.currency.trim().toUpperCase() : 'LYD';
  const type = typeof incoming.type === 'string' ? incoming.type.trim() : '';
  const direction = typeof incoming.direction === 'string' ? incoming.direction.trim() : '';
  const paymentMethod = ['cash', 'check', 'bank_transfer', 'card', 'online', 'invoice', 'other'].includes(incoming.paymentMethod)
    ? incoming.paymentMethod
    : 'other';
  const status = ['pending', 'completed', 'failed', 'reconciled'].includes(incoming.status)
    ? incoming.status
    : 'completed';
  const approvalState = ['draft', 'pending_approval', 'approved', 'rejected'].includes(incoming.approvalState)
    ? incoming.approvalState
    : (status === 'completed' ? 'approved' : 'pending_approval');

  return {
    id,
    companyId: user.companyId,
    userId: user.userId,
    type,
    category: typeof incoming.category === 'string' ? incoming.category.trim() : '',
    amount: Number.isFinite(amount) ? amount : 0,
    currency,
    direction,
    description: typeof incoming.description === 'string' ? incoming.description.trim() : '',
    accountId: typeof incoming.accountId === 'string' ? incoming.accountId.trim() : '',
    referenceId: typeof incoming.referenceId === 'string' ? incoming.referenceId.trim() : '',
    paymentMethod,
    status,
    approvalState,
    approverId: incoming.approverId || null,
    approvalNote: typeof incoming.approvalNote === 'string' ? incoming.approvalNote.trim() : '',
    dueDate: incoming.dueDate ? new Date(incoming.dueDate) : null,
    metadata: incoming.metadata || {},
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

async function logAudit(userId, action, resource, resourceId, changes, req) {
  try {
    await AuditLog.create({
      userId,
      action,
      resource,
      resourceId,
      changes,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
  } catch (error) {
    console.error('خطأ في تسجيل التدقيق:', error);
  }
}

function createJwtForUser(user, permissions = []) {
  return jwt.sign({
    userId: user._id,
    username: user.username,
    role: user.role,
    roleId: user.roleId,
    status: user.status,
    companyId: user.companyId,
    permissions: permissions
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

module.exports = {
  sanitizeAccountRecord,
  sanitizeTransactionPayload,
  logAudit,
  createJwtForUser,
  JWT_SECRET,
  JWT_EXPIRES_IN
};
