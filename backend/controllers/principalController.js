
const mongoose = require('mongoose');

// SCHEMA
const registerSchema = require('../models/registerModel')

// FUNCTION TO APPEND APPOINTMENT REQUESTS FROM THE STAFF TO THE PRINCIPAL'S PENDING APPOINTMNETS TAB
const newAppointment = async (userData)=>{
    try{
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOne({"staffs.mailId":userData.email});
        if(! user) return 500;
        const model = await schema.findOneAndUpdate(
            {},
            {$push:{"principal.pendingAppointments":{
                userName:user.staffs[0].name,
                userEmail:user.staffs[0].mailId,
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

// FUNCTION TO SEND THE PENDING APPOINTMENTS DATA FROM DB TO THE PRINCIPAL'S PENDING APPOINTMENTS TAB
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
        console.log(error);
        return 500;   
    }
}

// FUNCTION FOR ACCEPTING THE PENDING APPOINTMENTS BASED ON THE TIME ASIGNED BY THE STAFF
const acceptAppointment = async (userData)=>{
    try{
        console.log(userData);
    }
    catch(error){
        console.log(error);
    }
}
module.exports = { newAppointment, pendingAppointments, acceptAppointment }