const express = require('express');
const router = express.Router();

// Controllers
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController'); // Import this

// Routes
router.get('/', cartController.getCart);
router.post('/:productId', cartController.addToCart);
router.post('/checkout', orderController.checkoutOrder);

module.exports = router;
