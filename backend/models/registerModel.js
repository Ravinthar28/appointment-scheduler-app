
const mongoose = require('mongoose');
const principalSchema = require('./principalModel');
const secretarySchema = require('./secretaryModel');
const staffSchema  = require('./staffModel');

const registerSchema = new mongoose.Schema({
  code:String,
  secretary:{
    type:secretarySchema,
    unique:true
  },
  principal:{
    type:principalSchema,
    unique:true
  },
  staffs:[staffSchema]
});

module.exports = registerSchema;