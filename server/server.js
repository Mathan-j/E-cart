const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const mongoose = require('./src/config/db'); // MongoDB connectivity
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./src/config/passport-config');

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://your-production-url.com",
    credentials: true
}));

app.use(bodyParser.json());
app.use(passport.initialize());

// API routes
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Fallback route for serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
