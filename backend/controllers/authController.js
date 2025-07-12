
const mongoose = require('mongoose');
const registerSchema = require('../models/registerModel');

async function createPrincipal(data){
    const collectionName = data["collegeCode"]
    const register = mongoose.model(collectionName,registerSchema);
    
    const newUser = new register({
        code:data["collegeCode"],
        principal:{
            name:data["fullName"],
            phoneNo:data["phone"],
            mailId:data["email"],
            password:data["password"],
            messages:[]
        },
        staffs:[]
    })

    await newUser.save();
    return true;
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
            messages:[]
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

module.exports = { 
    createPrincipal,
    createStaff
}