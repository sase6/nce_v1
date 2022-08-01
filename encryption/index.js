const bcrypt = require('bcrypt');

const hash = async (string) => {
  const salt = await bcrypt.genSalt(10);
  let result = await bcrypt.hash(string, salt);
  return result;
};

const verifyHash = async (enteredString, hashedString) => {
  let result = await bcrypt.compare(enteredString, hashedString);
  return result;
};

module.exports = {
  hash, 
  verifyHash
};