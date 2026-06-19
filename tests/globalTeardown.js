const fs = require('fs');
const path = require('path');

module.exports = async function () {
  const dbPath = path.join(__dirname, '..', 'test-db.json');
  try {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  } catch (e) {}

  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
  }
};
