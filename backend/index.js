
const express = require('express');
const cors = require('cors');
// ROUTES
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
// DB
const connectDB = require('./config/db');

const app = express();
const port = 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/',authRoutes);
app.use('/',staffRoutes);

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is started successfully at ${port}`);
    });
});


