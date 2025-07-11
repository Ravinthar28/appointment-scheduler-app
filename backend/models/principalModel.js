
const mongoose = require('mongoose');

const principalSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:String,
    password:String,
    messages:[Object]
});

module.exports = principalSchema;