const db = require('../../database/index.js');
const { hash, compareHash } = require('../../encryption/index.js');
const session = require('../session.js');

const login = async (req, res) => {
  let clientUsername = req.body.username;
  let clientPassword = req.body.password;
  let sessionId;
  try {
    sessionId = req.cookies.sessionId;
  } catch {
    sessionId = null;
  }

  // Login with Sessions
  if (sessionId && !clientUsername && session.data[sessionId] !== undefined) {
    let dbResponse = await db.USER.find(session.data[sessionId]);
    if (dbResponse[0]) {
      let {username, visibility} = dbResponse[1][0]
      res.end(JSON.stringify({username, visibility}));
      return;
    }
    res.status(401).end("session-mismatch");
    return;
  }
  
  // Login with Credentials
  if (clientUsername !== undefined) {
    let dbResponse = await db.USER.find({username: clientUsername, pending: false});
    if (dbResponse[0]) {
      let {username, password, visibility} = dbResponse[1][0];
      if ((await compareHash(clientPassword, password))) {
        let sessionId = await session.insert({username, password});
        res.cookie('sessionId',sessionId, { maxAge: 43200000, httpOnly: true });
        res.end(JSON.stringify({username, visibility}));
        return;
      }
    }
  }

  res.status(401).end("Unauthorized, or Session Has Ran Out!");
};

const signup = async (req, res) => {
  const {username, password} = req.body;
  const hashedPassword = await hash(password);
  let dbResponse = (await db.USER.create({username, password: hashedPassword}));
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

const signout = (req, res) => {
  let { sessionId } = req.cookies;
  session.remove(sessionId);
  res.end();
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

const checkAdmin = async (findBy) => {
  let user = await db.USER.find(findBy);
  if (user[0]) {
    let curUser = user[1][0];
    if (curUser._isAdmin) return true;
  }
  return false;
};

const resetPassword = async(req, res) => {
  let {username, password} = req.body;
  let user = await db.USER.find({username});
  if (user[0]) {
    let curUser = user[0];
    curUser.password = password;
    await curUser.save();
    res.end();
    return;
  }

  res.status(400).end('Could not find user');
};

module.exports = {
  login,
  signup,
  signout,
  getUsers,
  acceptUser,
  deleteUser,
  updateUser,
  checkAdmin,
  resetPassword
};