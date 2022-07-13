const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeId: {type: String, autoIndex: true},
  dateJoined: String,
  username: String,
  password: String,
  pending: Boolean,
  _isAdmin: Boolean,
  visibility: Array,
});

const User = new mongoose.model('user', userSchema);

module.exports = {
  User,
};