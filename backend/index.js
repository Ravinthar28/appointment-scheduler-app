
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

db_uri = "mongodb://localhost:27017/db";
mongoose.connect(db_uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const principal_schema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:String,
    password:String,
    messages:[String]
});
const staffs_schema = new mongoose.Schema({
    name:String,
    phoneNo:Number,
    mailId:String,
    password:String,
    messages:[String]
})
const registerSchema = new mongoose.Schema({
  principal:[principal_schema],
  staffs:[staffs_schema]
});

function createPrincipal(data){
    mongoose.model(data["college_code"])
}

app.use(cors());
app.use(express.json());

app.post('/register',(req,res)=>{
    const data = req.body;
    role = data["role"]
    // if(role == "principal"){
    //     //createPrincipal(data)
    // }
});

app.listen(3000,()=>{
    console.log("Server is Started")
})