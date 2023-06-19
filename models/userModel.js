// Import mongoose to interact with MongoDB and bcryptjs for password hashing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Login function using asynchronous operation
exports.login = async function(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user in the database by username
        const user = await User.findOne({ username });

        // If user not found, return error response
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare submitted password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return error response
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // On successful match, return success response
        res.status(200).json({ message: 'Logged in successfully' });

    } catch (err) {
        // If any error occurs, return error response
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Define user schema for MongoDB
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Use Mongoose's pre-save middleware to hash password before saving user document
UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the User model for use in other modules
module.exports = User;