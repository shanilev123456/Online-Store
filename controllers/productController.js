const Product = require('../models/productModel');

// Display the form for creating a new Product
exports.newProductForm = function (req, res) {
    res.render('products/new');
};

// Create a new Product
exports.createProduct = async function (req, res) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    });
    try {
      await product.save();
      res.redirect('/products');
    } catch (error) {
      res.status(400).render('error', { error });
    }
};

// Fetch all Products
exports.getAllProducts = async function (req, res) {
    try {
        const products = await Product.find();
        res.render('products/index', { products });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Fetch a Product by Id
exports.getProductById = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { error: 'Product not found' });
        }
        res.render('products/show', { product });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Display the form for updating a Product
exports.editProductForm = async function (req, res) {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
};

// Update a Product by Id
exports.updateProduct = async function (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).render('error', { error: 'Product not found' });
        }
        res.redirect(`/products/${product._id}`);
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Delete a Product by Id
exports.deleteProduct = async function (req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).render('error', { error: 'Product not found' });
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { error });
    }
};
