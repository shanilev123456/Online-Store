const mongoose = require('mongoose');

// Define schema for Product model
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);