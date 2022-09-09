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

const procedureToQualifyingStatorIronsForRewindingSchema = new mongoose.Schema({
  modelNumber: String,
  jobNumber: String,
  voltage: String,
  leads: String,
  imp: String,
  phase: String,
  rotorFitShaft: Boolean,
  rotorMatchShaft: Boolean,
  ironDmgTest: Boolean,
  coreLossTest: Boolean,
  hotSpotTest: Boolean,
  isRewinding: String,
  rotorNumber: String,
  whoIsWinding: String,
  megOhm1: String,
  megOhm2: String,
  megOhm3: String,
  act44: Boolean,
  act14: Boolean,
  s1Sensors: String,
  s2Sensors: String,
  s3Sensors: String,
  byThermal: String,
  acrossSensor: String,
  lead3_1: String,
  lead3_2: String,
  lead3_3: String,
  lead6_1: String,
  lead6_2: String,
  lead6_3: String,
  lead9_440_1: String,
  lead9_440_2: String,
  lead9_440_3: String,
  lead9_208_1: String,
  lead9_208_2: String,
  lead9_208_3: String,
});

const P1 = new mongoose.model('P1', procedureToQualifyingStatorIronsForRewindingSchema);

module.exports = {
  User, Job, P1
};

//Key:
// P1 -> procedureToQualifyingStatorIronsForRewinding 