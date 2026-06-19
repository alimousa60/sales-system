/**
 * Company Model - Data Isolation Foundation
 * Represents an organization/company with multiple departments and users
 * Part of 3-layer data isolation system (Company → Department → User)
 */

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [3, 'Company name must be at least 3 characters'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },

  code: {
    type: String,
    required: [true, 'Company code is required'],
    unique: true,
    uppercase: true,
    match: [/^[A-Z0-9]{2,10}$/, 'Company code must be 2-10 alphanumeric characters']
  },

  // Ownership
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Company must have an owner']
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
      enum: ['owner', 'admin', 'member'],
      default: 'member'
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active'
    }
  }],

  // Capacity & Limits
  maxUsers: {
    type: Number,
    default: 100,
    min: [1, 'Company must allow at least 1 user'],
    max: [10000, 'Company cannot exceed 10000 users']
  },

  maxDepartments: {
    type: Number,
    default: 20,
    min: 1,
    max: 500
  },

  storageQuotaMB: {
    type: Number,
    default: 5000,
    min: 100,
    max: 1000000
  },

  // Status & Settings
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'archived'],
    default: 'active',
    index: true
  },

  industry: {
    type: String,
    enum: [
      'retail',
      'manufacturing',
      'services',
      'technology',
      'healthcare',
      'finance',
      'education',
      'other'
    ]
  },

  country: String,
  city: String,
  timezone: {
    type: String,
    default: 'UTC'
  },

  // Features & Permissions
  features: {
    analyticsEnabled: { type: Boolean, default: true },
    notificationsEnabled: { type: Boolean, default: true },
    reportingEnabled: { type: Boolean, default: true },
    themingEnabled: { type: Boolean, default: true },
    advancedRBACEnabled: { type: Boolean, default: true },
    dataIsolationEnabled: { type: Boolean, default: true }
  },

  // Billing & Plan
  plan: {
    type: String,
    enum: ['free', 'starter', 'professional', 'enterprise'],
    default: 'free'
  },

  billingEmail: String,
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },

  // Audit & Compliance
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

  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  metadata: {
    description: String,
    logo: String,
    website: String,
    phone: String,
    customFields: mongoose.Schema.Types.Mixed
  }
});

// Indexes for performance
companySchema.index({ owner: 1 });
companySchema.index({ status: 1, createdAt: -1 });
companySchema.index({ 'members.userId': 1 });

// Virtual for member count
companySchema.virtual('memberCount').get(function() {
  return this.members ? this.members.length : 0;
});

// Pre-save validation
companySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtuals to JSON
companySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Company', companySchema);
