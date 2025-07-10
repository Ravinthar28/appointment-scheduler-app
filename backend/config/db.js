
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/appointmet-scheduler-app",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("MongoDb Connected"))
.catch(err => console.log(err));