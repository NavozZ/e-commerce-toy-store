const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import Model directly
const Category = require('../models/Category'); // Import Category Model

// @route   GET /api/search/categories
// @desc    Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/search/filter
// @desc    Search & Filter products
router.get('/filter', async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;
    
    // Build Query
    let query = {};

    // 1. Search by Keyword (Name or Description)
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    // 2. Filter by Category
    if (category && category !== 'All') {
      query.category = category;
    }

    // 3. Filter by Price Range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Execute Query
    const products = await Product.find(query);
    res.json(products);

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;