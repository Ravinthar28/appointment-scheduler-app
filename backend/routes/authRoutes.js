
const express = require('express');

const { createPrincipal, loginPrincipal }= require('../controllers/authController');
const {createStaff, loginStaff} = require('../controllers/authController');

const router = express.Router();

router.post('/register',async (req,res)=>{
    const data = req.body;
    const role = data["userData"]["role"]

    try{
      // FOR PRINCIPAL REGISTER
      if(role == 'principal'){
        const result = await createPrincipal(data.userData)
        if(result) res.sendStatus(result);
      }
      // FOR STAFF REGISTER
      else if(role == 'staff'){
        const result = await createStaff(data.userData)
          if(result) res.json("Registed Successfully");
      }
      // TO HANDLE UNKNOWN REGISTER
      else{
        res.json("Unknown role is selected");
      }
    }
    catch(error){
          console.log(error);
          res.status(500).json("Error during registration");
        }
});

router.post('/login',async (req,res)=>{
  const data = req.body;
  const role = data.userData.selectedRole;
  try{
    if(role == 'principal'){
      const result = await loginPrincipal(data.userData);
      if(result) res.sendStatus(result);
    }
    else if(role == 'staff'){
      const result = await loginStaff(data.userData);
      if(result) res.sendStatus(result);
    }
  }
  catch(error){
    res.json(`error occured ${error}`);
  }
})

module.exports = router;