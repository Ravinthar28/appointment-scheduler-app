
const mongoose = require('mongoose');

const appointmentModel = require('./requestModel');
const principalSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:{
        type:String,
        unique:true
    },
    password:String,
    pendingAppointments:[appointmentModel],
    confirmedAppointments:[appointmentModel],
    pastAppointments:[appointmentModel],
    expoPushToken:String
});

module.exports = principalSchema;