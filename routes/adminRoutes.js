const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.ensureAdmin, adminController.adminDashboard);

module.exports = router;

