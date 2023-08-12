const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.createUser);
router.get('/signup', userController.signupForm);
router.post('/login', userController.login);
router.get('/user', userController.login);


router.get('/:id', userController.logout);


router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/checkout', userController.checkout);


module.exports = router;
