
const mongoose = require('mongoose');

// SCHEMA
const registerSchema = require('../models/registerModel')

const newAppointment = async (userData)=>{
    try{
        const messageData = {
            desc:userData.desc,
            dateTime:userData.dateTime
        }
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOneAndUpdate({},
            {$push:{"principal.pendingAppointments":messageData}},
            {new:true,upsert:false}
        );
        if(user) return 200;
        else return 500
        
    }
    catch(error){
        console.log(error);
        return 500;
    }
}

module.exports = { newAppointment }