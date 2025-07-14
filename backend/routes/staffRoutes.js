
const express = require('express')
const router = express.Router();

// STAFF CONTROLLER
const staffController = require('../controllers/staffController');

router.post('/fetch-staff-data',(req,res)=>{
    try{
        const userData = req.body;
        console.log(userData);
    }
    catch(error){
        console.log(error);
    }
})
router.post('/request-appointment',(req,res)=>{

})

module.exports = router