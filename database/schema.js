const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeId: {type: String, autoIndex: true},
  dateJoined: String,
  name: String,
  password: String
});

const User = new mongoose.model('user', userSchema);

module.exports = {
  User,
};