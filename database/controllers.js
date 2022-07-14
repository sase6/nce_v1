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

const remove = async (model, findBy) => {
  try {
    await model.findOneAndDelete(findBy);
    return true;
  } catch {
    return 'could not remove document';
  }
};

const update = async (model, findBy, setTo) => {
  try {
    let docArr = await model.find(findBy);
    let doc = docArr[0];
    Object.keys(setTo).forEach(key => doc[key] = setTo[key]);
    await doc.save();
    return true;
  } catch {
    return 'could not update document';
  }
};

module.exports = {
  find, make, remove, update,
};