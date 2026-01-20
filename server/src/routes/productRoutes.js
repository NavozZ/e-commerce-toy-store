const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); //
const Product = require('../models/Product');

// Handler for 'Shop All' page (GET /api/products)
router.get('/', productController.getAllProducts);

// Handler for 'Best Sellers' on Home page (GET /api/products/best-sellers)
router.get('/best-sellers', async (req, res) => {
  try {
    const bestSellers = await Product.find({ isFeatured: true }).limit(4);
    res.status(200).json(bestSellers);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Failed to fetch best sellers" });
  }
});

module.exports = router;