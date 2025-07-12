
const mongoose = require('mongoose');

const principalSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:{
        type:String,
        unique:true
    },
    password:String,
    messages:[Object]
});

module.exports = principalSchema;