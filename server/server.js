const express = require('express');
require('dotenv').config()
const path = require('path')
const app = express();
const mongoose = require('./src/config/db'); //MongoDB connectivity
const bodyParser = require('body-parser'); //json to string change
const cors = require('cors');
const passport = require('./src/config/passport-config');

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Change to your production URL
    credentials: true
}));




app.use(bodyParser.json()); //use body parser

app.use(passport.initialize()); // initialize passport middleware



app.get('/get',(req,res)=>{
    res.send();
})

const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static files from the client build folder
app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Ensure correct path

// For any other routes, serve the built index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); // Ensure correct path
});

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined
// get port from environment variable  


app.listen(PORT,()=>{
    console.log(`app run in port ${PORT}` );
    
})