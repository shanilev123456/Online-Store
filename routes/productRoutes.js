const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/new', productController.newProductForm);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);

router.get('/:id/edit', productController.editProductForm);

router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;