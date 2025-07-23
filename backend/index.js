
const express = require('express');
const cors = require('cors');
// ROUTES
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
const pricipalRoutes = require('./routes/principalRoutes');
// DB
const connectDB = require('./config/db');

require('./scheduler');




const app = express();
const port = 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/auth',authRoutes);
app.use('/staff',staffRoutes);
app.use('/principal',pricipalRoutes)

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is started successfully at ${port}`);
    });
});


