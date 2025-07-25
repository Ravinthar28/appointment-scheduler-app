
const mongoose = require('mongoose');

const appointmentModel = require('./requestModel')
const staffSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:{
        type:String,    
        unique:true
    },
    password:String,   
    upcomingAppointments:[appointmentModel],
    pastAppointments:[appointmentModel],
    expoPushToken:String
});

module.exports = staffSchema;