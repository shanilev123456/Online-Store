const Product = require('../models/Product');

// Create a new Product
exports.createProduct = async function (req, res) {
    const product = new Product(req.body); // Creates a new product instance with the request body data
    try {
        await product.save(); // Save the product to the database
        res.status(201).send(product); // Respond with the newly created product
    } catch (error) {
        res.status(400).send(error);
    }
};

// Fetch all Products
exports.getAllProducts = async function (req, res) {
    try {
        const products = await Product.find().populate('supplier'); // Fetch all products with their respective supplier data
        res.send(products); // Respond with the fetched products
    } catch (error) {
        res.status(500).send(error);
    }
};

// Fetch a Product by Id
exports.getProductById = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('supplier'); // Fetch a product with its supplier data using the provided ID
        if (!product) {
            return res.status(404).send();
        }
        res.send(product); // Respond with the fetched product
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a Product by Id
exports.updateProduct = async function (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update a product with the request body data
        if (!product) {
            return res.status(404).send();
        }
        res.send(product); // Respond with the updated product
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a Product by Id
exports.deleteProduct = async function (req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id); // Delete a product using the provided ID
        if (!product) {
            return res.status(404).send();
        }
        res.send(product); // Respond with the deleted product
    } catch (error) {
        res.status(500).send(error);
    }
};