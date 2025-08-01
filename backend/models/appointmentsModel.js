const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        default:() => new mongoose.Types.ObjectId()
    },
    userName:String,
    userEmail:String,
    desc:String,
    dateTime:Date,
    collegeCode:String
})

module.exports = appointmentModel