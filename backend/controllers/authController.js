
const mongoose = require('mongoose');
const registerSchema = require('../models/registerModel');

async function createPrincipal(data){
    try{
        const collectionName = data["collegeCode"]
        const register = mongoose.model(collectionName,registerSchema);
        const newUser = new register({
            code:data["collegeCode"],
            principal:{
                name:data["fullName"],
                phoneNo:data["phone"],
                mailId:data["email"],
                password:data["password"],
                pendingAppointments:[],
                confirmedAppointments:[],
                pastAppointments:[],
                expoPushToken:data["expoPushToken"]
            },
            staffs:[]
        });
        await newUser.save();
        return 200;
    }
    catch(error){
        if(error.code == 11000){
            return 500;
        }
    }
}

async function createStaff(data) {
    const collectionName = data["collegeCode"]
    try{
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema)
        const newStaff = {
            name:data['fullName'],
            phoneNo:data['phone'],
            mailId:data['email'],
            password:data['password'],
            upcomingAppointments:[],
            pastAppointments:[],
            expoPushToken:data["expoPushToken"]
        }
        const model = await schema.findOneAndUpdate(
            {},
            {$push:{staffs:newStaff}},
            {new:true,upsert:false}
        );
        if(! model){
            console.log("console errror");
            return null
        }

        return model;
        
        
    }
    catch(error){
        console.log(error);
    }
}

async function loginPrincipal(data){
    try{
        const collectionName = data.collegeCode
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOne({'principal.mailId':data.email});
        if(user){

            if(user.principal.password == data.password){
                return 200;
            }
            else{
                return 401;
            }
        }
        else{
            return 401;
        }
    }
    catch(error){
        return 401;
    }
}

async function loginStaff(data){
    try{
        const collectionName = data.collegeCode;
        const schema = mongoose.models[collectionName] || mongoose.model(collectionName,registerSchema);
        const user = await schema.findOne({'staffs.mailId':data.email});
        if(user){
            if(user.staffs[0].password == data.password) return 200;
            else return 401;
        }
        else{
            return 401;
        }
    }
    catch(error){
        return 401;
    }
    
}
module.exports = { 
    createPrincipal,
    createStaff,
    loginPrincipal,
    loginStaff
}