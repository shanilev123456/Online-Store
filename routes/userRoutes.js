const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.createUser);
router.get('/signup', userController.signupForm);
router.post('/login', userController.login);
router.get('/user', userController.login);

//router.post('/logout', userController.logout);
router.get('/:id', userController.logout);
//router.get('/:id', userController.getUser);

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/checkout', userController.checkout);

//router.get('/cart', userController.getCart);
//router.post('/cart/addToCart/:productId', userController.addToCart);
//router.get('/cart/checkout', userController.checkout);
module.exports = router;
