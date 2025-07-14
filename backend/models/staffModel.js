
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:{
        type:String,
        unique:true
    },
    password:String,
    upcomingAppointments:Object,
    pastAppointments:Object
});

module.exports = staffSchema;