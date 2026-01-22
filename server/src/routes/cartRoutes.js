const express = require('express');
const router = express.Router();
const { getMyCart, syncCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getMyCart)   // Read Cart from DB
  .post(protect, syncCart);  // Save Cart to DB

module.exports = router;