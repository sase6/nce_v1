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

module.exports = {
  find, make, 
};