const bcrypt = require('bcrypt');
const salt = {
  pass: process.env.userPasswordSalt,
  ref: process.env.userReferenceSalt
};

const hash = async (string, type) => {
  let result = await bcrypt.hash(string, salt[type]);
  return result;
};

const verifyHash = async (enteredString, hashedString, type) => {
  let result = await bcrypt.compare(enteredString, hashedString);
  return result;
};

module.exports = {
  hash, 
  verifyHash
};