const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    userName:String,
    userEmail:String,
    desc:String,
    dateTime:String
})

module.exports = appointmentModel