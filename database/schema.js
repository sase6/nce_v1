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

const jobSchema = new mongoose.Schema({
  jobNumber: {type: Number, autoIndex: true},
  modelNumber: {type: String, autoIndex: true},
  serialNumber: String,
  voltage: String,
  ccHeater: Boolean,
  unloaders: Number,
  statorStatus: String,
  incomingNumber: String,
  scrap: Boolean,
  notes: String,
  enteredBy: String,
  enteredOn: String,
  _isDeleted: {type: Boolean, autoIndex: true},
  deletedBy: String,
  deletedOn: String
});

const Job = new mongoose.model('job', jobSchema);

module.exports = {
  User, Job
};