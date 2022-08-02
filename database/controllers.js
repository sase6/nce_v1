const mongoose = require('mongoose');
const _model = require('./schema.js');

const find = async (model, findBy) => {
  return await model.find(findBy);
};

const make = async (data) => {
  try {
    let user = new _model.User(data);
    await user.save();
    return true;
  } catch {
    return false;
  }
};

const remove = async (model, findBy) => {
  try {
    await model.findOneAndDelete(findBy);
    return true;
  } catch {
    return 'could not remove document';
  }
};

const update = async (model, findBy, setTo) => {
  try {
    let docArr = await model.find(findBy);
    let doc = docArr[0];
    Object.keys(setTo).forEach(key => doc[key] = setTo[key]);
    await doc.save();
    return true;
  } catch {
    return 'could not update document';
  }
};

const JOBS = {
  findByRange: async (min, max) => {
    const result = await _model.Job.find({$and: [
      {_isDeleted: {$eq: false}},
      {jobNumber: {
        $gt: min,
        $lte: max
      }}
    ]}).sort({jobNumber: -1});
    return result;
  },

  findByField: async (findBy) => {
    return await _model.Job.find(findBy);
  },

  findByData: async (query) => {
    let result = await _model.Job.find({$or: [
      {jobNumber: isNaN(parseInt(query))? -1 : parseInt(query)},
      {modelNumber: query},
      {serialNumber: query},
      {incomingNumber: query},
      {enteredOn: query},
    ]});

    return result;
  },

  findDeletedJobs: async () => {
    const result = await _model.Job.find({_isDeleted: {$eq: true}});
    return result;
  },

  getJobRange: async () => {
    let start = (await _model.Job.find({}).sort({jobNumber: 1}).limit(1))[0].jobNumber;
    let end = (await _model.Job.find({}).sort({jobNumber: -1}).limit(1))[0].jobNumber;
    return [start, end];
  },

  getLastJobNumber: async () => {
    let result = await _model.Job.find({}).sort({jobNumber: -1}).limit(1);
    return result[0]? await result[0].jobNumber : 'NONE';
  },

  create: async (jobData) => {
    let job = new _model.Job(jobData);
    try {
      await job.save();
      return true;
    } catch {
      return "Error Creating Job";
    }
  },

  update: async (findBy, setTo) => {
    let job = (await _model.Job.find(findBy))[0];
    Object.keys(setTo).forEach(key => {
      job[key] = setTo[key];
    });
    try {
      await job.save();
      return true;
    } catch {
      return 'Error Updating';
    }
  },

  deleteOne: async(findBy) => {
    try {
      await _model.Job.findOneAndDelete(findBy);
      return true;
    } catch {
      return 'Err Deleting';
    }
  }
};

module.exports = {
  find, make, remove, update, JOBS,
};