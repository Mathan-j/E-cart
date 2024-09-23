const express = require('express');
require('dotenv').config()
const path = require('path')
const app = express();
const mongoose = require('./src/config/db'); //MongoDB connectivity
const bodyParser = require('body-parser'); //json to string change
const cors = require('cors');
const passport = require('./src/config/passport-config');

app.use(cors({
    orgin:["http://localhost:3000"],
    credentials:true
}
)); //enable cors for cross origin requests



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

app.use(express.static(path.join(__dirname, '../client/dist'))); // serve static files from the build folder

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '../client/dist/index.html')); // serve the built index.html file
})

const PORT = process.env.PORT ; // get port from environment variable  


app.listen(PORT,()=>{
    console.log(`app run in port ${PORT}` );
    
})