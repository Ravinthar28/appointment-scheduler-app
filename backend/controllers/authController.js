
const mongoose = require('mongoose');
const registerSchema = require('../models/registerModel');

async function createPrincipal(data){
    const collection_name = data["collegeCode"]
    register = mongoose.model(collection_name,registerSchema);
    
    const newUser = new register({
        principal:{
            name:data["fullName"],
            phoneNo:data["phone"],
            mailId:data["ravinthar2022@gmail.com"],
            password:data["1020"],
            messages:[]
        },
        staffs:{}
    })

    await newUser.save();
    return true;
}

module.exports = {createPrincipal}