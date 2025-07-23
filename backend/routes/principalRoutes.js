
const express = require('express');
const router = express.Router();

const { newAppointment, pendingAppointments, acceptAppointment } = require('../controllers/principalController');

// ROUTE FOR REQUESTING NEW APPOINTMENT FROM STAFF TO THE PRINCIPAL
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

// ROUTE FOR FETCHING THE PENDING APPOINTMENTS DATA FROM THE DB FOR PRINCIPAL PENDING TAB
router.post('/appointments-data',async (req,res)=>{
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

// ROUTE FOR ACCEPTING THE APPOINTMENT BASED ON THE STAFF ASSIGNED TIME IN THE PRINCIPAL PENDING TAB
router.post('/accept-appointment',async (req,res)=>{
    try{
        const userData = req.body;
        const response = acceptAppointment(userData);
        if(response) res.sendStatus(200);
        else res.sendStatus(500);
    }
    catch(error){
        console.log(error);
        return 500;
    }
});

module.exports = router