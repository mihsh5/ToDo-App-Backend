// mongoose
const mongoose = require('mongoose');
// constants
const {USERS_MODEL} = require('../constants');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: String,
  password: String,
  name: String,
});

const UserModel = mongoose.model(USERS_MODEL, UserSchema);

module.exports = {
  UserModel,
};