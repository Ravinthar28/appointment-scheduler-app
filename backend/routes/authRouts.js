

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register',(req,res)=>{
    const data = req.body;
    console.log(data)
});

app.listen(3000,()=>{
    console.log("Server is Started")
})