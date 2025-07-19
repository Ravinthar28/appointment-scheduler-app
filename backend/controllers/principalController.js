
const mongoose = require('mongoose');

// SCHEMA
const registerSchema = require('../models/registerModel')

// FUNCTION TO APPEND APPOINTMENT REQUESTS FROM THE STAFF
const newAppointment = async (userData)=>{
    try{
        // const messageData = {
        //     desc:userData.desc,
        //     dateTime:userData.dateTime
        // }
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOne({"staffs.mailId":userData.email});
        if(! user) return 500;
        const model = await schema.findOneAndUpdate(
            {},
            {$push:{"principal.pendingAppointments":{
                userName:user.staffs[0].name,
                desc:userData.desc,
                dateTime:userData.dateTime
            }}},
            {new:true,upsert:false}
        );

        if(model) return 200;
        else return 500
        
    }
    catch(error){
        console.log(error);
        return 500;
    }
}

// FUNCTION TO SEND THE PENDING APPOINTMENTS DATA FROM DB
const pendingAppointments = async (userData)=>{
    try{
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOne({});
        const responseData = {
            pendingAppointments:user.principal.pendingAppointments,
            confirmedAppointments:user.principal.confirmedAppointments,
            pastAppointments:user.principal.pastAppointments
        }
        if(user) return responseData;
        else return 500;
    }
    catch(error){
        return 500;
        console.log(error);
    }
}

module.exports = { newAppointment, pendingAppointments }