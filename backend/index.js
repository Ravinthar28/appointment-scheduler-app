
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

db_uri = "mongodb://localhost:27017/db";


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

async function createPrincipal(data){
    const collection_name = data["collegeCode"]
    register = mongoose.model(collection_name,registerSchema);
    
    const newUser = new register({
        principal:{
            name:data["fullName"],
            phoneNo:data["phone"],
            mailId:data["ravinthar2022@gmail.com"],
            password:data["1020"],
            messages:[]
        },
        staffs:{}
    })

    await newUser.save();
}

app.use(cors());
app.use(express.json());

app.post('/register',(req,res)=>{
    const data = req.body;
    const role = data["userData"]["role"]
    if(role == "principal"){
        createPrincipal(data["userData"]);
    }
});

mongoose.connect(db_uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=>{
        console.log("Db is connected");
    })
    .then(()=>{
        app.listen(3000,()=>{
            console.log("Server is Started");
        })
    })
