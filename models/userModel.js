const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
}, { collection: 'Users' }); // Set the collection name to 'Users'

// Define static methods on the User model
UserSchema.statics.findOne = function() {
    // Implementation of the findOne method
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
