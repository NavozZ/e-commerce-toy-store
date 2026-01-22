const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCategories) // Public: Anyone can see categories
  .post(protect, admin, createCategory); // Admin Only: Add new

router.route('/:id')
  .delete(protect, admin, deleteCategory); // Admin Only: Delete

module.exports = router;