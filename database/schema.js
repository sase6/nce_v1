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
  unloaders: String,
  statorStatus: String,
  incomingNumber: String,
  scrap: String,
  notes: String,
  enteredBy: String,
  enteredOn: String,
  _isDeleted: {type: Boolean, autoIndex: true},
  deletedBy: String,
  deletedOn: String,
  warranty: String
});

const Job = new mongoose.model('job', jobSchema);

module.exports = {
  User, Job
};