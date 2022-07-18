const path = require('path');
const publicUrl = path.join(__dirname, '..', 'public');
const db = require('../database/index.js');

// Send HTML page
const sendHtml = (req, res) => {
  res.sendFile(path.join(publicUrl, 'index.html'));
};

const login = async (req, res) => {
  const {username, password} = req.body;
  let employeeId;
  try {
    employeeId = req.cookies.employeeId;
  } catch {
    employeeId = null;
  }

  if (employeeId && !username) {
    let dbResponse = await db.USER.find({employeeId});
    if (dbResponse[0]) {
      let {username, visibility} = dbResponse[1][0];
      res.end(JSON.stringify({username, visibility}));
      return;
    }
    res.status(401).end(JSON.stringify(dbResponse[1]));
    return;
  }
  
  let dbResponse = await db.USER.find({username, password});
  if (dbResponse[0]) {
    let {username, visibility, employeeId} = dbResponse[1][0]

    res.cookie('employeeId',employeeId, { maxAge: 43200000, httpOnly: true });
    res.end(JSON.stringify({username, visibility}));
    return;
  }
  res.status(401).end(JSON.stringify(dbResponse[1]));
};

const signup = async (req, res) => {
  const {username, password} = req.body;
  let dbResponse = (await db.USER.create({username, password}));
  if (dbResponse !== true) {
    console.log('Error: ', dbResponse);
    res.status(400).end(JSON.stringify(dbResponse));
    return;
  }
  res.end('sent signup request');
};

const getUsers = async (req, res) => {
  try {
    let users = await db.USER.find({});
    res.end(JSON.stringify(users[1]));
  } catch {
    res.status(500).end('Failed to fetch users');
  }
};

const acceptUser = async (req, res) => {
  let result = await db.USER.accept(req.body.username);
  if (result === true) {
    res.end();
    return;
  }
  res.status(500).end(result);
};

const deleteUser = async (req, res) => {
  let result = await db.USER.delete(req.body.username);
  if (result === true) {
    res.end();
    return;
  }
  res.status(500).end(result);
};

const updateUser = async (req, res) => {
  let result = await db.USER.update(req.body.username, req.body.set);
  if (result === true) {
    res.end();
    return;
  }
  res.status(500).end(result);
};

module.exports = {
  sendHtml, 
  login,
  signup,
  getUsers,
  acceptUser,
  deleteUser,
  updateUser,
};