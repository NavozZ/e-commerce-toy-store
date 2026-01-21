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


router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);


router.get('/best-sellers', getBestSellers);


router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;