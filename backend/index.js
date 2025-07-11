
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/',authRoutes);

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is started successfully at ${port}`);
    });
});


