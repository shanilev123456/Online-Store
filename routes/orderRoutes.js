const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;

//This new routes file includes routes for fetching all orders,
// a specific order, and all orders from a specific user.