
const express = require('express')
const router = express.Router();


// STAFF CONTROLLER
const {
    fetchPrincipal,
    requestAppointmentController,
    fetchAppointmentsController
    } = require('../controllers/staffController');

// const { fetchDataController } = require('../controllers/staffController');

// router.post('/fetch-staff-data',async (req,res)=>{
//     try{
//         const userData = req.body;
//         const response = await fetchDataController(userData)
//         if(response) res.json({response});
//         else res.sendStatus(404);
//     }
//     catch(error){
//         res.sendStatus(404);
//         console.log(error);
//     }
// });

router.post('/fetch-principal',async (req,res)=>{
    try{
        const userData = req.body;
        const response = await fetchPrincipal(userData);
        if(response) res.json(response);
        else res.sendStatus(500);
    }
    catch(error){
        console.log(error);
    }
})

router.post('/fetch-appointments',async (req,res)=>{
    try{
        const userData = req.body;
        const response = await fetchAppointmentsController(userData);
        if(response) res.json(response);
        else res.sendStatus(500);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/request-appointment',async (req,res)=>{
    try{
        const messageData = req.body;
        const response = await requestAppointmentController(messageData);
        if(response) console.log("message Stored");
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router