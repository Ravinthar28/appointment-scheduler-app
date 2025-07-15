
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
