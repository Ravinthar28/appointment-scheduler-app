
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:String,
    password:String,
    messages:[Object]
});

module.exports = staffSchema;