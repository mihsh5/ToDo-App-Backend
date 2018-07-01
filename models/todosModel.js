// mongoose
const mongoose = require('mongoose');
// constants
const {TODOS_MODEL} = require('../constants');

const Schema = mongoose.Schema;
const ToDosSchema = new Schema({
  done: Boolean,
  itemName: String,
  userId: String,
});

const ToDosModel = mongoose.model(TODOS_MODEL, ToDosSchema);

module.exports = {
  ToDosModel,
};