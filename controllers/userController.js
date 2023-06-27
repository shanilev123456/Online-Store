// Import the User model
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Import bcrypt to hash passwords
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received username:', username);
    console.log('Received password:', password);

    // Check if the user already exists
    const userExists = await User.findOne({ username });
    console.log('User exists:', userExists);

    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ username, password: hashedPassword });
    console.log('New user:', newUser);

    await newUser.save();

    req.session.user = newUser;

    // Redirect to the Store page after successful signup
    res.redirect('/');

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Function to render the signup form
exports.signupForm = (req, res) => {
    res.render('users/signup');
};

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user already exists
        const userExists = await User.findOne({ username });
        if(userExists) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};


// Function to update a user
exports.updateUser = async (req, res) => {
    try {
        const updatedFields = req.body; // Get the updated fields from the request body
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true }); // Find the user by ID and update them

        res.json(updatedUser); // Respond with the updated user data
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' }); // If there's an error, respond with an error message
    }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); // Find the user by ID and delete them

        res.json({ message: 'User deleted' }); // Respond with a success message
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' }); // If there's an error, respond with an error message
    }
};

// Function to get a user by ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find the user by ID
        if (user) {
            res.json(user); // If the user is found, respond with the user data
        } else {
            res.status(404).json({ message: 'User not found' }); // If the user is not found, respond with an error message
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting user' }); // If there's an error, respond with an error message
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by their username
        const user = await User.findOne({ username });

        //console.log('Database user:', user); // Debugging line

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        const isMatch = await bcrypt.compare(password, user.password);

        //console.log('Password match:', isMatch); // Debugging line

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If the password matches, log the user in by storing user information in the session
        req.session.user = user;

        //console.log('Session User:', req.session.user); // Debugging line

        // Redirect the user to the appropriate page based on their role
        if (user.isAdmin) {
            res.redirect('/admin');
        } else {
            const products = await Product.find();
            res.render('users/user', { products: products, user: req.session.user });  // Pass user object here
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {  // Destroy the session
      if(err) {
        return res.status(500).json({error: 'Error logging out'}); // If there's an error, respond with an error message
      }
      res.redirect('/');  // Redirect to homepage
    });
  };

/*-------------------------------Cart-----------------------------------------*/

exports.addToCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const user = await User.findById(req.session.user._id);
  
      if (!user) {
        return res.status(401).json({ error: 'User not logged in' });
      }
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Add the product to the user's cart
      user.cart.push(productId);
      await user.save();
  
      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.checkout = async (req, res) => {
    try {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ error: 'User not logged in' });
        }

        // Calculate total amount
        let totalAmount = 0;
        for(let productId of user.cart){
            const product = await Product.findById(productId);
            totalAmount += product.price;
        }

        // Create an order with the products
        const order = new Order({
            user: user._id,
            products: user.cart,
            total: totalAmount
        });

        // Save the order to the database
        await order.save();

        // Add the order to user's order history
        user.orders.push(order._id);
        
        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//In checkout method in userController.js, now we create an order and store it in the database,
//then we add this order to the user's order history and clear the cart.