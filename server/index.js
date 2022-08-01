require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/user.js');
const app = express();
const port = process.env.port || 8082;
const { createJob, getJobs, getJobsRange } = require('./controllers/jobs.js');
require('../encryption/index.js');

const publicUrl = path.join(__dirname, '..', 'public');

app.use(express.static(publicUrl));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(publicUrl, 'index.html'));
});

// Login
app.post('/login', userController.login);
app.post('/signup', userController.signup);
app.get('/signout', userController.signout);

// Users
app.get('/users', userController.getUsers);
app.post('/user/accept', userController.acceptUser);
app.post('/user/delete', userController.deleteUser);
app.post('/user/visibility/update', userController.updateUser);

// Jobs
app.post('/jobs/create', createJob);
app.get('/jobs/range', getJobsRange);
app.post('/jobs', getJobs);

app.listen(port, () => {
  require('../database/index.js');
  console.log('Server listening on port: ', port);
});