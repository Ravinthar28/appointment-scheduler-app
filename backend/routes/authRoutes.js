

const express = require('express');
const cors = require('cors');
const { default: authController } = require('../controllers/authController');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register',(req,res)=>{
    const data = req.body;
    authController(data)
});

app.listen(3000,()=>{
    console.log("Server is Started")
})