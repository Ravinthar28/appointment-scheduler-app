
const express = require('express');
const createPrincipal = require('../controllers/authController');
const router = express.Router();

router.post('/register',async (req,res)=>{
    const data = req.body;
    const role = data["userData"]["role"]

    // IF THE USER IS A PRINCIPAL
    if(role == "principal"){
        try{
          const result = await createPrincipal(data.userData)
          if(result) res.json("Registerd Successfully");
        }
        catch(error){
          console.log(error);
          res.status(500).json("Error during registration");
        }
    }
});

module.exports = router;