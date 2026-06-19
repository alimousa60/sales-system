/**
 * Data Sharing Model - Track who shared what with whom
 * Enables secure data sharing with expiration and permission levels
 */

const mongoose = require('mongoose');

const dataSharingSchema = new mongoose.Schema({
  // Resource Being Shared
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Resource ID is required']
  },

  resourceType: {
    type: String,
    required: [true, 'Resource type is required'],
    enum: ['sales', 'report', 'document', 'dataset', 'user', 'audit_log', 'other'],
    index: true
  },

  // Sharing Parties
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Shared by user is required'],
    index: true
  },

  sharedWith: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sharedAt: {
      type: Date,
      default: Date.now
    },
    permission: {
      type: String,
      enum: ['read', 'write', 'admin'],
      default: 'read'
    },
    expiresAt: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],

  // Sharing Context
  purpose: {
    type: String,
    enum: ['collaboration', 'review', 'approval', 'analysis', 'archival', 'other'],
    default: 'collaboration'
  },

  reason: String,
  comment: String,

  // Organization Context
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },

  // Access Control
  requiresApproval: {
    type: Boolean,
    default: false
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  approvedAt: Date,

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'revoked'],
    default: 'approved',
    index: true
  },

  // Security
  encryptionKey: String, // If resource needs encryption
  accessLog: [{
    userId: mongoose.Schema.Types.ObjectId,
    accessedAt: Date,
    action: String, // 'read', 'download', 'print', etc.
    ipAddress: String,
    userAgent: String
  }],

  // Audit
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  updatedAt: Date,
  revokedAt: Date,
  revokedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  revocationReason: String,

  metadata: mongoose.Schema.Types.Mixed
});

// Indexes for performance
dataSharingSchema.index({ resourceId: 1, resourceType: 1 });
dataSharingSchema.index({ sharedBy: 1, createdAt: -1 });
dataSharingSchema.index({ 'sharedWith.userId': 1 });
dataSharingSchema.index({ companyId: 1, status: 1 });
dataSharingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 days TTL

// Pre-save
dataSharingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('DataSharing', dataSharingSchema);
