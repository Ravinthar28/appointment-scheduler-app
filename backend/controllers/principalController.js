
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
        const msgData = {
            userName:userData.userName,
            userEmail:userData.userEmail,
            desc:userData.desc,
            dateTime:userData.dateTime
        }
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);

        // STORES THE ACCEPTED APPOINTMENT IN STAFF'S UPCOMMING APPOINTMENTS
        const staffUpdate = await schema.findOneAndUpdate(
            {"staffs.mailId":userData.userEmail},
            {$push:{"staffs.$.upcomingAppointments":msgData}},
            {new:true,upsert:false}
        );

        // STORE THE ACCEPTED APPOINTMENT IN PRINCIPALS CONFIRMEND APPOINTMENTS
        const principalUpdate = await schema.findOneAndUpdate({},
            {$push:{"principal.confirmedAppointments":msgData}},
            {new:true,upsert:false}
        )

        // REMOVES THE ACCEPTED APPOINTMENT FROM THE PRINCIPALS PENDING APPOINTMENTS
        const removeAppointment = await schema.findOneAndUpdate(
            {"principal.pendingAppointments._id":userData._id},
            {
                $pull: {
                    "principal.pendingAppointments":{_id:userData._id}
                }
            },
            {new:true}
        )
         if(staffUpdate && principalUpdate && removeAppointment) return 200;
         else return 500;

         
    }
    catch(error){
        console.log(error);
    }
}
module.exports = { newAppointment, pendingAppointments, acceptAppointment }