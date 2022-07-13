const path = require('path');
const publicUrl = path.join(__dirname, '..', 'public');
const db = require('../database/index.js');

// Send HTML page
const sendHtml = (req, res) => {
  res.sendFile(path.join(publicUrl, 'index.html'));
};

const login = async (req, res) => {
  const {username, password} = req.body;
  let dbResponse = await db.USER.find({username, password});
  if (dbResponse[0]) {
    let {username, visibility} = dbResponse[1]
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

module.exports = {
  sendHtml, 
  login,
  signup,
};