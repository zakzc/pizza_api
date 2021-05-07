const bcrypt = require("bcrypt");

async function hashFunc(dataToHash) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(dataToHash, salt);
  return hashed;
}

module.exports = hashFunc;
