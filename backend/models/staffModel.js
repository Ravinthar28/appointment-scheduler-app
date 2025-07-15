
const mongoose = require('mongoose');

const requestModel = require('./requestModel')
const staffSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:{
        type:String,
        unique:true
    },
    password:String,
    upcomingAppointments:[requestModel],
    pastAppointments:[requestModel]
});

module.exports = staffSchema;