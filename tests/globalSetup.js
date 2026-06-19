const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

module.exports = async function () {
  process.env.JWT_SECRET = 'test-secret-key';
  process.env.NODE_ENV = 'test';

  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const dbPath = path.join(__dirname, '..', 'test-db.json');
  fs.writeFileSync(dbPath, JSON.stringify({ uri }));

  global.__MONGOD__ = mongod;
};
