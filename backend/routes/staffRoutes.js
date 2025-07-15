
const express = require('express')
const router = express.Router();

// STAFF CONTROLLER
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

router.post('/request-appointment',(req,res)=>{

})

module.exports = router