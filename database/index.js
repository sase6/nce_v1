const mongoose = require('mongoose');
const username = process.env.mongoUser;
const password = process.env.mongoPass;
const model = require('./schema.js');
const db = require('./controllers.js');

mongoose.connect(`mongodb+srv://${username}:${password}@nationalcompressor.ge84b.mongodb.net/?retryWrites=true&w=majority`, err => {
  if (err) {
    console.log('Error connecting to MongoDB');
  } else {
    console.log('Mongo Connection Successful!');
  }
});

// Users
const USER = {
  find: async (findBy) => {
    let users = await model.User.find(findBy);
    if (users.length <= 0) return [false, 'username or password is incorrect'];
    return [true, users];
  },
  create: async (login) => {
    let userExist = (await USER.find({username: login.username}))[0];
    if (userExist) return 'username taken';

    let user = {
      employeeId: 1,
      dateJoined: (new Date()).toString(),
      username: login.username,
      password: login.password,
      pending: true,
      _isAdmin: false,
      visibility: ['Job Book'],
    };

    if (await db.make(user)) {
      return true;
    }
    return 'error creating user'
  }
};

module.exports = {
  USER,
};