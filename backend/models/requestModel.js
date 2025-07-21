const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    userName:String,
    userEmail:String,
    desc:String,
    dateTime:Date
})

module.exports = appointmentModel