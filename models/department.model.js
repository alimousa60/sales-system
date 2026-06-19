/**
 * Department Model - Second layer of data isolation
 * Departments belong to companies and have members
 * Enables department-level data isolation
 */

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true,
    minlength: 3,
    maxlength: 100
  },

  code: {
    type: String,
    required: [true, 'Department code is required'],
    uppercase: true,
    match: [/^[A-Z0-9]{2,10}$/, 'Department code must be 2-10 alphanumeric characters']
  },

  // Company Reference
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Department must belong to a company'],
    index: true
  },

  // Management
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Department must have a manager']
  },

  // Members
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['manager', 'lead', 'member'],
      default: 'member'
    }
  }],

  // Budget & Resources
  budget: {
    annual: {
      type: Number,
      default: 0,
      min: 0
    },
    spent: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active',
    index: true
  },

  // Organization Details
  description: String,
  location: String,
  costCenter: String,

  // Policies
  dataRetentionDays: {
    type: Number,
    default: 365,
    min: 30,
    max: 2555
  },

  requiresApprovalFor: {
    dataExport: { type: Boolean, default: false },
    dataPurge: { type: Boolean, default: false },
    largeBatchOperations: { type: Boolean, default: true }
  },

  // Audit
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  metadata: mongoose.Schema.Types.Mixed
});

// Compound index for unique dept per company
departmentSchema.index({ companyId: 1, code: 1 }, { unique: true });
departmentSchema.index({ companyId: 1, manager: 1 });
departmentSchema.index({ 'members.userId': 1 });

// Virtual for member count
departmentSchema.virtual('memberCount').get(function() {
  return this.members ? this.members.length : 0;
});

// Pre-save
departmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

departmentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Department', departmentSchema);
