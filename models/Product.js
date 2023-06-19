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
    supplier: {
        type: mongoose.Schema.Types.ObjectId, // This will store Supplier's ObjectId
        ref: 'Supplier', // reference to the Supplier model
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);