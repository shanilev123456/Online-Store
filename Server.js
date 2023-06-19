// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Load environment variables from a .env file into process.env

// Instantiate an express app
const app = express();

// Connect to MongoDB using the connection string stored in the environment variable
mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB!') // Callback to log success message once connected
);

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming requests with JSON payloads and form data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Import routes
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const userRoutes = require('./routes/userRoutes');

// Use imported routes with base paths
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/users', userRoutes);

// Set view engine to EJS and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Start the server and listen on port 5500
app.listen(5500, () => {
  console.log('Server is running on port 5500');
});