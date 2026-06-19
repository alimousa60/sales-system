/**
 * User Data Access Audit Model - Tracks all data access attempts
 * For compliance, security, and forensics
 */

const mongoose = require('mongoose');

const userDataAccessSchema = new mongoose.Schema({
  // Who accessed the data
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // What was accessed
  resourceType: {
    type: String,
    enum: ['sales', 'users', 'reports', 'documents', 'audit_log', 'analytics', 'settings', 'other'],
    required: true,
    index: true
  },

  resourceId: mongoose.Schema.Types.ObjectId,

  // The action
  action: {
    type: String,
    enum: ['read', 'write', 'create', 'update', 'delete', 'export', 'download', 'print', 'share'],
    required: true,
    index: true
  },

  // Query details
  queryDetails: {
    filters: mongoose.Schema.Types.Mixed,
    searchTerm: String,
    resultCount: Number,
    fieldsAccessed: [String]
  },

  // Result of access attempt
  result: {
    type: String,
    enum: ['granted', 'denied', 'partial', 'error'],
    default: 'granted',
    index: true
  },

  reason: {
    type: String,
    default: ''
  },

  // Organization context
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    index: true
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },

  // Security context
  ipAddress: String,
  userAgent: String,
  device: String,
  location: {
    country: String,
    city: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number]
    }
  },

  // Timing
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },

  responseTimeMs: Number,

  // Anomaly detection
  flagged: {
    type: Boolean,
    default: false,
    index: true
  },

  anomalies: [{
    type: String,
    enum: [
      'unusual_time',
      'unusual_location',
      'unusual_frequency',
      'bulk_access',
      'failed_attempt',
      'permission_bypass_attempt',
      'data_exfiltration_suspect'
    ]
  }],

  // Additional context
  sessionId: String,
  endpointUrl: String,
  httpMethod: String,

  metadata: mongoose.Schema.Types.Mixed
});

// Indexes for efficient queries
userDataAccessSchema.index({ userId: 1, timestamp: -1 });
userDataAccessSchema.index({ companyId: 1, timestamp: -1 });
userDataAccessSchema.index({ resourceType: 1, action: 1 });
userDataAccessSchema.index({ result: 1, timestamp: -1 });
userDataAccessSchema.index({ flagged: 1, timestamp: -1 });
userDataAccessSchema.index({ ipAddress: 1, timestamp: -1 });
userDataAccessSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 }); // Auto-delete after 90 days

// Text index for search
userDataAccessSchema.index({
  reason: 'text',
  resourceType: 'text'
});

// Geospatial index for location
userDataAccessSchema.index({ 'location.coordinates': '2dsphere' });

// Pre-save
userDataAccessSchema.pre('save', function(next) {
  // Set location to last known if available
  if (this.ipAddress && !this.location) {
    // Could integrate IP geolocation service here
  }
  next();
});

module.exports = mongoose.model('UserDataAccess', userDataAccessSchema);
