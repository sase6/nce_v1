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