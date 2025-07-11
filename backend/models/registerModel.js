
const mongoose = require('mongoose');
const principalSchema = require('./principalModel');
const staffSchema  = require('./staffModel');

const registerSchema = new mongoose.Schema({
  code:String,
  principal:[principalSchema],
  staffs:[staffSchema]
});

module.exports = registerSchema;