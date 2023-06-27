const Product = require('../models/productModel');

exports.adminDashboard = async function(req, res) {
    try {
        const products = await Product.find();
        res.render('admin/dashboard', { products: products });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};
