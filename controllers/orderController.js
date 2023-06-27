const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Fetch all Orders
// Fetch all Orders
exports.getAllOrders = async function (req, res) {
    try {
        const orders = await Order.find().populate('user').populate('products');
        res.render('orders/index', { orders });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Fetch a Order by Id
exports.getOrderById = async function (req, res) {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products');
        if (!order) {
            return res.status(404).render('error', { error: 'Order not found' });
        }
        res.render('orders/show', { order });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

// Fetch a User's Order History
exports.getUserOrders = async function (req, res) {
    try {
        const orders = await Order.find({user: req.params.userId}).populate('products');
        res.render('orders/index', { orders });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

module.exports = exports;

//Here, we have added methods to get all orders,
//get a single order by ID, and to get all orders for a specific user.