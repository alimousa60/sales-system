const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  role: { type: String, default: 'user' },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', sparse: true },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  metadata: {
    department: String,
    location: String,
    managerId: mongoose.Schema.Types.ObjectId
  },
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: Date,
    lockedUntil: Date
  },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date,
  sessions: [{
    token: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    loginAt: { type: Date, default: Date.now },
    lastActive: { type: Date },
    isActive: { type: Boolean, default: true }
  }]
}, {
  timestamps: false
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
