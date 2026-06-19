const mongoose = require('mongoose');
const crypto = require('crypto');

const accountSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID() },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  is_synced: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema);
