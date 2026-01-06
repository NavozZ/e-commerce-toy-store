const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define your routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// CRITICAL: This is what fixes the "argument handler must be a function" error
module.exports = router;