const Product = require('../models/productModel');

exports.ensureAdmin = function(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    }
    res.redirect('/users'); // Redirect non-admins
};

exports.adminDashboard = async function(req, res) {
    try {
        const products = await Product.find();
        // added
        res.render('/admin', { products: products, user: req.session.user });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};
