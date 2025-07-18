
const express = require('express');
const router = express.Router();

const { newAppointment, pendingAppointments } = require('../controllers/principalController');

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

router.post('/pending-appointments',async (req,res)=>{
    try{
        const userData = req.body;
        const response = await pendingAppointments(userData);
        if(response == 500) res.sendStatus(500);
        else res.json(response);
    }
    catch(error){
        res.sendStatus(500);
        console.log(error);
    }
})

module.exports = router