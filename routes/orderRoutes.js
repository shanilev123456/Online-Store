const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/history', orderController.getOrderHistory);
router.post('/checkout', orderController.checkoutOrder);

module.exports = router;
// Add the new route for grouping orders by user
router.get('/group', orderController.getGroupedOrders);

