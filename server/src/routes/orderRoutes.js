const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// Note: We will add the 'protect' middleware here in the next step to secure these routes
const { protect } = require('../middleware/authMiddleware'); 

router.post('/', protect, orderController.createOrder);
router.get('/myorders', protect, orderController.getUserOrders);

module.exports = router;