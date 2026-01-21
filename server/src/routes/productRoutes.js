const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getProductById, 
  getBestSellers,
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// 1. General routes
router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

// 2. Specialized routes (must be above /:id)
router.get('/best-sellers', getBestSellers);

// 3. ID specific routes
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;