// Import the User model
const User = require('../models/userModel');

// Import bcrypt to hash passwords
const bcrypt = require('bcryptjs');

// Function to create a new user
exports.createUser = async (req, res) => {
    try {
        const userData = req.body; // Get the user data from the request body
        const newUser = new User(userData); // Create a new user instance with the data
        await newUser.save(); // Save the user to the database

        res.status(201).json({ message: 'User created successfully' }); // Respond with a success message
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' }); // If there's an error, respond with an error message
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
        // Find the user by their email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If the password matches, log the user in (how you do this will depend on your setup)
        req.session.user = user;

        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};