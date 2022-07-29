require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const controller = require('./controllers.js');
const app = express();
const port = process.env.port || 8082;
const { createJob, getJobs, getJobsRange } = require('./controllers/jobs.js');

const publicUrl = path.join(__dirname, '..', 'public');

app.use(express.static(publicUrl));
app.use(express.json());
app.use(cookieParser());

app.get('/', controller.sendHtml);

app.post('/login', controller.login);

app.post('/signup', controller.signup);

// Users
app.get('/users', controller.getUsers);

app.post('/user/accept', controller.acceptUser);

app.post('/user/delete', controller.deleteUser);

app.post('/user/visibility/update', controller.updateUser);

app.post('/jobs/create', createJob);
app.get('/jobs/range', getJobsRange);
app.post('/jobs', getJobs);

app.listen(port, () => {
  require('../database/index.js');
  console.log('Server listening on port: ', port);
});