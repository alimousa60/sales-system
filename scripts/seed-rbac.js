require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { seedRBACRoles } = require('../seeds/rbac.seed');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sales-system';
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  } catch (err) {
    const canUseFallback = process.env.NODE_ENV !== 'production' && process.env.USE_MEMORY_DB !== 'false';
    if (canUseFallback) {
      console.log('External DB failed, using in-memory MongoDB...');
      const memoryServer = await MongoMemoryServer.create();
      await mongoose.connect(memoryServer.getUri());
    } else {
      throw err;
    }
  }
  console.log('Connected. Seeding RBAC roles...');
  const results = await seedRBACRoles();
  results.forEach(r => console.log(r));
  console.log('Done.');
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
