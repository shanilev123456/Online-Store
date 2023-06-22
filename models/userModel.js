// Import mongoose to interact with MongoDB and bcryptjs for password hashing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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