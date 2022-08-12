// Controllers for Job Book
const { JOBS } = require('../../database/controllers.js');

class JobsQueue {
  constructor() {
    this.toDo = [];
    this.running = false;
  }

  async start() {
    this.running = true;
    await this.toDo[0]();
  }

  enqueue(func) {
    this.toDo.push(async () => {
      await func();
      this.whenDone();
    });

    if (this.running === false) this.start();
  };

  dequeue() {
    this.toDo.splice(0, 1);
  }

  whenDone() {
    this.dequeue();
    if (this.toDo.length <= 0) {
      this.running = false;
    } else {
      this.start();
    }
  }
};

var JOBQUEUE = new JobsQueue;


const getJobByRange = (req, res, next) => {
  //
};

const createJob = (req, res, next) => {
  let jobData = req.body;
  jobData.enteredOn = (new Date).toLocaleDateString();
  jobData._isDeleted = false;
  jobData.deletedBy = 'N/A';
  jobData.deletedOn = 'N/A';

  const handleSaveJob = async() => {
    let jobNumber;
    if (jobData.jobNumber === 'AUTO') {
      jobNumber = await JOBS.getLastJobNumber();

      if (jobNumber === 'NONE') {
        res.status(500).end('There is no Jobs in the database');
      } else {
        jobNumber++;
        try {
          jobData.jobNumber = jobNumber;
          await JOBS.create(jobData);
          res.end(JSON.stringify({jobNumber}));
        } catch {
          res.status(500).end('Failed to create new entry');
        }
      }
    } else {
      let jobs = await JOBS.findByField({jobNumber: jobData.jobNumber});
      let job = jobs[0];

      if (job) {
        Object.keys(jobData).forEach((prop) => {
          job[prop] = jobData[prop];
        });
        try {
          await job.save();
          res.end(JSON.stringify({jobNumber: jobData.jobNumber}));
        } catch {
          res.end('Error overwriting existing job');
        }
      } else {
        try {
          await JOBS.create(jobData);
          res.end(JSON.stringify({jobNumber: jobData.jobNumber}));
        } catch {
          res.status(500).end('Failed to create new entry');
        }
      }
    }
  };

  JOBQUEUE.enqueue(handleSaveJob);
};

const getJobs = async(req, res, next) => {
  const {min, max} = req.body;
  res.end(JSON.stringify(await JOBS.findByRange(min, max)));
};

const getJobsRange = async(req, res, next) => {
  res.end(JSON.stringify(await JOBS.getJobRange()));
};

const deepSearchJobs = async (req, res) => {
  let { query } = req.params;
  res.end(JSON.stringify(await JOBS.findByData(query)));
};

const getDeletedJobs = async(req, res) => {
  res.end(JSON.stringify(await JOBS.findDeletedJobs()));
};

const updateDeleteJob = async(req, res) => {
  const { del, jobNumber } = req.body;
  try {
    await JOBS.update({jobNumber}, {_isDeleted: del});
    res.end();
  } catch {
    res.status(500).end('Error changing delete status');
  }
};

const deleteJob = async(req, res) => {
  const { jobNumber } = req.body;
  try {
    await JOBS.deleteOne({jobNumber});
    res.end();
  } catch {
    res.status(500).end('Err Deleting');
  }
};

const getAllJobs = async(req, res) => {
  try {
    let jobs = await JOBS.findByField({});
    res.end(JSON.stringify(jobs));
  } catch {
    res.status(500).end('Err Getting * Jobs');
  }
};

const markAsDeleted = async(req, res) => {
  const { username, jobNumber} = req.body;
  let jobs = await JOBS.findByField({jobNumber});
  let job = jobs[0];
  job._isDeleted = true;
  job.deletedBy = username;
  job.deletedOn = (new Date()).toLocaleDateString();
  await job.save();
  res.end();
};

const toggleScrappedJob = async(req, res) => {
  const { jobNumber } = req.body;
  try {
    await JOBS.toggleScrap(jobNumber);
    res.end();
  } catch {
    res.status(500).end();
  }
};

module.exports = {
  createJob, getJobs, getJobsRange, deepSearchJobs, getDeletedJobs,
  updateDeleteJob, deleteJob, getAllJobs, markAsDeleted, toggleScrappedJob
};