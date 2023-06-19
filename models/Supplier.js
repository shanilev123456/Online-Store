const mongoose = require('mongoose');

// Define schema for Supplier model
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Supplier', SupplierSchema);