const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    desc:String,
    dateTime:String
})

module.exports = appointmentModel