
const mongoose = require('mongoose');
const principalSchema = require('./principalModel');
const staffSchema  = require('./staffModel');

const registerSchema = new mongoose.Schema({
  code:String,
  principal:{
    type:principalSchema,
    unique:true
  },
  staffs:[staffSchema]
});

module.exports = registerSchema;