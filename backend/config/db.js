
const mongoose = require('mongoose');

require('dotenv').config();

const db_uri = "mongodb://localhost:27017/db";

// process.env.mongoDb_URI
const connectDB = async ()=> {
    try{
        await mongoose.connect(db_uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true});
        console.log("Db is connected");
    }
    catch(error){
        console.error("Db connection failed");
        process.exit(1);
    }
};

module.exports = connectDB