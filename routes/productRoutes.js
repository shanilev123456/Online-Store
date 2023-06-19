const express = require('express');
const router = express.Router();
// Require the product controller to handle the routing logic
const productController = require('../controllers/productController');

// Define routes for creating, getting, updating and deleting products
router.post('/', productController.createProduct); // POST route for creating new product
router.get('/', productController.getAllProducts); // GET route for getting all products
router.get('/:id', productController.getProductById); // GET route for getting a specific product by id
router.put('/:id', productController.updateProduct); // PUT route for updating a specific product by id
router.delete('/:id', productController.deleteProduct); // DELETE route for deleting a specific product by id

module.exports = router; // Export the router to be used in other files