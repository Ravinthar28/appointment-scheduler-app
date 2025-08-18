
const express = require('express');
const router = express.Router();

const { newAppointment, pendingAppointments, acceptAppointment, cancelAppointment } = require('../controllers/secretaryController');

// ROUTE FOR REQUESTING NEW APPOINTMENT FROM STAFF TO THE PRINCIPAL
router.post('/appointment-request',async (req,res)=>{
    try{
        const userData = req.body;
        const response = await newAppointment(userData);
        if(response == 200) res.json({res:"Request sent to the principal successfully"});
        if(response == "date-not-available") res.json({res:"The choosed date is not available"});
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
        const response = await acceptAppointment(userData);
        if(response === 'success') res.json({res:"success"});
        else if(response === 'date-not-available') res.json({res:'date-not-available'})
        else res.json({res:"Something went wrong"});
    }
    catch(error){
        console.log(error);
        return 500;
    }
});

// ROUTE FOR CANCELING THE APPOINTMENTS FROM APPOINTMENT REQUEST AND CONFIRMED APPOINTMENT TAB BY THE PRINCIPAL
router.post('/cancel-appointment',async (req,res)=>{
    try{
        const userData = req.body;
        const response = await cancelAppointment(userData);
        if(response) res.json({'response':'Appointment Canceled'});
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router