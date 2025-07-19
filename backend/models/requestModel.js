const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    userName:String,
    desc:String,
    dateTime:String
})

module.exports = appointmentModel