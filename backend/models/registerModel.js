
const mongoose = require('mongoose');
const principalSchema = require('./principalModel');
const staffSchema  = require('./staffModel');

const registerSchema = new mongoose.Schema({
  principal:[principalSchema],
  staffs:[staffSchema]
});

module.exports = registerSchema;