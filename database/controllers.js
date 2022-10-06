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
    try {
      let start = (await _model.Job.find({}).sort({jobNumber: 1}).limit(1))[0].jobNumber;
      let end = (await _model.Job.find({}).sort({jobNumber: -1}).limit(1))[0].jobNumber;
      return [start, end];
    } catch {
      return [0,0]; 
    }
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
  },

  toggleScrap: async(jobNumber) => {
    try {
      let jobs = await _model.Job.find({jobNumber});
      if (jobs.length <= 0) return 'Cannot Find Job Number';
      let job = jobs[0];

      if (job.scrap === 'YES') {
        job.scrap = 'NO';
      } else {
        job.scrap = 'YES';
      }
      
      await job.save();
      return true;
    } catch {
      return 'Err Deleting';
    }
  }
};

const P1 = {
  find: async jobNumber => {
    try {
      let results = await _model.P1.find({jobNumber});
      if (results.length < 1) return null;
      return results[0];
    } catch {
      return null;
    }
  },

  save: async data => {
    let newp1 = new _model.P1(data);
    try {
      const oldP1 = await _model.P1.find({jobNumber: data.jobNumber});

      if (oldP1[0]) {
        for (x in data) {
          oldP1[0][x] = data[x]
        }

        await _model.P1.findOneAndUpdate({jobNumber: data.jobNumber}, data);
      } else {
        await newp1.save();
      }

      return true;
    } catch {
      console.log('err');
      return false;
    }
  },

  getMostRecent: async () => {
    try {
      const result = await _model.P1.find({}).sort({jobNumber: -1}).limit(1);
      return result[0];
    } catch {
      return {};
    }
  },
};

const RFIDTags = {
  updateRecords: async (arrayOfTagData) => {
    let newTagCount = 0;
    let modifiedTagCount = 0;

    for (let i = 0; i < arrayOfTagData.length; i++) {
      const {tagnumb, tagname, modelNumber, jobNumber, voltage, type, other, current_access, inputBy, subzone, current_reader} = arrayOfTagData[i];
      // Verify tagname, make new if needed
      if (tagnumb === undefined) {
        console.error("NO TAG NUMBER");
        return;
      }

      const dbData = {
        tagNumber: tagnumb,
        tagName: tagname,
        readerId: inputBy || "Not Yet Scanned",
        readerName: current_reader || "Not Yet Scanned",
        subzone: subzone || "Not Yet Scanned",
        jobNumber: jobNumber || "Missing Data",
        modelNumber: modelNumber || "Missing Data",
        voltage: voltage || "Missing data",
        type: type || "Missing Data",
        other : other || "",
        date: current_access || "Not Yet Scanned"
      };

      const dbResults = await _model.RFIDTag.find({tagNumber: tagnumb});
      if (dbResults.length <= 0) {
        const tagData = new _model.RFIDTag(dbData);
        await tagData.save();
        newTagCount++;
      } else {
        for (prop in dbData) {
          dbResults[0][prop] = dbData[prop];
        }

        await dbResults[0].save();
        modifiedTagCount++;
      }
    }
  
    return {newTagCount, modifiedTagCount};
  },

  getAll: async() => {
    return (await _model.RFIDTag.find({}));
  }
};

module.exports = {
  find, make, remove, update, JOBS, P1, RFIDTags
};