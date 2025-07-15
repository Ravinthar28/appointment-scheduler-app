const mongoose = require('mongoose');

const requestModel = new mongoose.Schema({
    desc:String,
    dateTime:String
})

module.exports = requestModel