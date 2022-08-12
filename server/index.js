require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/user.js');
const app = express();
const port = process.env.port || 8082;
const { createJob, getJobs, getJobsRange, deepSearchJobs, getDeletedJobs, updateDeleteJob, deleteJob, getAllJobs, markAsDeleted, toggleScrappedJob} = require('./controllers/jobs.js');
require('../encryption/index.js');
const session = require('./session.js');
const { hash } = require('../encryption/index.js');
const xl = require('../xlsx/index.js');
const { JOBS } = require('../database/controllers.js');

const publicUrl = path.join(__dirname, '..', 'public');

//Middleware
const adminInSession = async (req, res, next) => {
  let { sessionId } = req.cookies;
  if (sessionId !== undefined && session.data[sessionId] !== undefined) {
    if ((await userController.checkAdmin(session.data[sessionId]))) {
      next();
      return;
    }
  }
  res.redirect('/unauthorized');
};

const inSession = (req, res, next) => {
  let { sessionId } = req.cookies;
  if (sessionId !== undefined && session.data[sessionId] !== undefined) {
    next();
    return;
  }
  res.redirect('/unauthorized');
};

app.use(express.static(publicUrl));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(publicUrl, 'index.html'));
});

app.get('/unauthorized', (req, res) => {
  res.end('Unauthorized!');
});

// State
var state = {
  secretKey: '',
  lastBackup: 'unknown',
  nextBackup: null
};

// Login
app.post('/login', userController.login);
app.post('/signup', userController.signup);
app.get('/signout', userController.signout);

// Users
app.get('/users', adminInSession, userController.getUsers);
app.post('/user/accept', adminInSession, userController.acceptUser);
app.post('/user/delete', adminInSession, userController.deleteUser);
app.post('/user/visibility/update', adminInSession, userController.updateUser);
app.post('/user/password/reset', adminInSession, userController.resetPassword);

// Jobs
app.post('/jobs/create', inSession, createJob);
app.get('/jobs/range', inSession, getJobsRange);
app.get('/jobs', inSession, getAllJobs);
app.get('/jobs/:query', inSession, deepSearchJobs);
app.post('/jobs', inSession, getJobs);
app.post('/jobs/deleted', inSession, getDeletedJobs);
app.post('/jobs/update/deleted', inSession, updateDeleteJob);
app.post('/jobs/delete', inSession, deleteJob);
app.post('/jobs/update/scrapped', inSession, toggleScrappedJob);
app.delete('/job', inSession, (req, res, next) => {
  if (req.body.secretKey === state.secretKey) next();
  else res.status(401).end('Wrong Secret Key!');
},markAsDeleted);

//Keys & Backup
const createSecretKey = async() => {
  let newKeyValue = Math.random()* 100000;
  state.secretKey = await hash(`${newKeyValue}`);
  return state.secretKey;
};

app.get('/secretKey', adminInSession, (req, res) => {
  let key = state.secretKey;
  res.end(JSON.stringify(key));
});

const backup = async() => {
  console.log('BACKING UP');
  let jobs = await JOBS.findByField({});
  let bkup = [];
  jobs.forEach(job => {
    const { 
    jobNumber,
    modelNumber,
    serialNumber,
    voltage,
    unloaders,
    statorStatus,
    incomingNumber,
    scrap,
    notes,
    enteredBy,
    enteredOn,
    _isDeleted,
    deletedBy,
    deletedOn,
    warranty} = job;
    bkup.push({
      jobNumber,
      modelNumber,
      serialNumber,
      voltage,
      unloaders,
      statorStatus,
      incomingNumber,
      scrap,
      notes,
      enteredBy,
      enteredOn,
      _isDeleted,
      deletedBy,
      deletedOn,
      warranty
    });
  });
  xl.writeToFile(bkup);
  state.lastBackup = (new Date).toLocaleDateString() + ' ' + (new Date).toLocaleTimeString();
  if (state.nextBackup) clearTimeout(state.nextBackup);
  state.nextBackup = setTimeout(async () => {
    await backup();
  }, 60000 * 30);
};

app.get('/backup', async(req, res) => {
  await backup();
  res.end(state.lastBackup);
});

app.get('/backup/time', (req, res) => res.end(state.lastBackup));

app.listen(port, () => {
  require('../database/index.js');
  backup();
  console.log('Server listening on port: ', port);
  exec('lt -p 8082 -s ncex', (err) => {
    if (err) {
      console.log('Err Deploying Server: ', err);
    } else {
      console.log('Server Deployed @ncex.loca.lt');
    }
  });

  // Secret Key
  createSecretKey();
  setInterval(() => {
    createSecretKey();
  }, (60000*5));
});