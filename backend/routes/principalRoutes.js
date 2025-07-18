
const express = require('express');
const router = express.Router();

const {newAppointment} = require('../controllers/principalController');

router.post('/appointment-request',async (req,res)=>{
    try{
        const userData = req.body;
        const response = await newAppointment(userData);
        if(response) res.sendStatus(200)
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router