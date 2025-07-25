
const mongoose = require('mongoose');
const registerSchema = require('../models/registerModel');


// async function fetchDataController(userData) {
//     try{
//         const collectionName = userData.collegeCode;
//         const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
//         const user = await schema.findOne({"staffs.mailId":userData.email});
//         if(user){
//             return user.staffs[0].name;
//         }
//         else{
//             return 404;
//         }
//     }
//     catch(error){
//         return 404;
//     }
// }

// FUNCION TO SEND THE PRINCIPAL DETAILS TO THE STAFF SCREEN
const fetchPrincipal = async (userData)=>{
    try{
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);

        const users = await schema.findOne({});
        const principal = users.principal
        if(users){
            return {
            name:principal.name,
            email:principal.mailId
        }
        }
        
    }
    catch(error){
        console.log(error);
        return "Error in fetching";
    }
}

async function fetchAppointmentsController(userData){
    try{
        const collectionName = userData.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOne({"staffs.mailId":userData.email});
        if (! user) return 404
        const staff = user.staffs.find(data => data.mailId === userData.email);
        return {
            upcomingAppointments:staff.upcomingAppointments,
            pastAppointments:staff.pastAppointments
        };
        
    }
    catch(error){
        console.log("Error from the console",error);
    }
}

async function requestAppointmentController(messageData){
    try{
        const collectionName = messageData.collegeCode;
        const newMessage = {
            desc:messageData.desc,
            dateTime:messageData.dateTime
        }
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const model = await schema.findOneAndUpdate(
            {'staffs.mailId':messageData.email},
            {$push:{'staffs.$.upcomingAppointments':newMessage}},
            {new:true,upsert:false}
        );
        if(!model) console.log("error in model");
        return model;
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    fetchPrincipal,
    fetchAppointmentsController,
    requestAppointmentController
}