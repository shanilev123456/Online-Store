//Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from a .env file into process.env

// Instantiate an express app
const app = express();

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));

// Set view engine to EJS and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB using the connection string stored in the environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB'); // Log a success message if the connection is successful
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); 
    // Log an error message if there's an error connecting to MongoDB
  });

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming requests with JSON payloads and form data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Use imported routes with base paths
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// handle these routes in Express application
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// After a user logs in, we can display their username by passing it to the EJS template:
app.get('/user', (req, res) => {
  res.render('user', { username: req.session.username });
});

// Route handler for the root URL
app.get("/", (req, res) => {
  res.render("Store");
});

// Start the server and listen on port 5500
app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
