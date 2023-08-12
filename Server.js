//Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from a .env file into process.env

const session = require('express-session');

// Import models
const User = require('./models/userModel'); 
const Product = require('./models/productModel');
const order = require('./models/orderModel');

// Import routes
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');


// Instantiate an express app
const app = express();

// Import controllers
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const adminController = require('./controllers/adminController');
const orderController = require('./controllers/orderController');
const cartController = require('./controllers/cartController');

app.use(
  session({
    secret: 'Ri0505838397o',
    resave: false,
    saveUninitialized: true,
  })
);

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


// Use imported routes with base paths
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);


/**************/
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use(async (req, res, next) => {
  const products = await Product.find();
  res.locals.products = products;
  next();
});
/**************/

// Middleware to check if user is logged in
function checkLoggedIn(req, res, next) {
  if (req.session.user) {
    // User is logged in
    next(); // Proceed to the next middleware or route handler
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
}

// handle these routes in Express application
app.get('/signup', (req, res) => {
  res.render('users/signup', { user: req.session.user });
});

app.post('/signup', userController.createUser);

app.get('/login', (req, res) => {
  res.render('users/login', { user: req.session.user });  // Pass user object here
});

// Protected route: only accessible if user is logged in
app.get('/admin', checkLoggedIn, checkAdmin, (req, res) => {
  res.render('users/admin');
});

/***************************************************************************************/
app.get('/user', checkLoggedIn, async (req, res) => {
  const userWithOrders = await User.findById(req.session.user._id).populate({
    path: 'order',
    populate: {
      path: 'products',
      model: 'Product'
    }
  });
  res.render('users/user', { user: userWithOrders });
});

//This would populate the 'orders' field in the user document with
//the actual order documents rather than just the IDs.
/****************************************************************************************/

// Middleware to check if user is an admin
function checkAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
      next();
  } else {
      res.status(403).json({ error: 'You do not have admin access' });
  }
}

app.post('/checkout', orderController.checkoutOrder);

app.get('/thank-you', (req, res) => {
  res.render('thankYou');
});

app.get('/', (req, res) => {
  const user = req.session.user; // Get the user object from the session
  res.render('Store', { user }); // Pass the user object to the view
});

app.get('/myApiTemplate', function(req, res) {
  res.render('myApiTemplate');
});

app.get('/Statistics', function(req, res) {
  res.render('Statistics');
});


// Start the server and listen on port 5500
app.listen(5500, () => {
  console.log('Server is running on port 5500');
});