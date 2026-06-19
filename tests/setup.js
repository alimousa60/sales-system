const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Company = require('../models/company.model');

process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';

async function connectTestDB() {
  const dbPath = path.join(__dirname, '..', 'test-db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  await mongoose.connect(data.uri);
}

async function disconnectTestDB() {
  await mongoose.disconnect();
}

async function clearTestDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (key !== 'roles') {
      await collections[key].deleteMany({});
    }
  }
}

async function createTestCompany(overrides = {}) {
  return await Company.create({
    name: 'شركة اختبار',
    code: 'TEST01',
    owner: new mongoose.Types.ObjectId(),
    address: 'طرابلس',
    phone: '0912345678',
    status: 'active',
    ...overrides
  });
}

async function createTestUser(overrides = {}) {
  const company = overrides.companyId
    ? await Company.findById(overrides.companyId)
    : await createTestCompany();

  const passwordHash = await bcrypt.hash(overrides.password || 'test1234', 10);
  const user = await User.create({
    username: overrides.username || 'testuser',
    passwordHash,
    name: overrides.name || 'مستخدم اختبار',
    role: overrides.role || 'admin',
    companyId: company._id,
    status: overrides.status || 'active',
    isActive: overrides.isActive !== undefined ? overrides.isActive : true
  });
  return user;
}

function generateToken(user, permissions = []) {
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
      companyId: user.companyId,
      permissions
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
  createTestCompany,
  createTestUser,
  generateToken
};
