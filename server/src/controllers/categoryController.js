const Product = require('../models/Product');

// Get categories for the sidebar
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filtered Search (Session 5 requirement)
exports.searchProducts = async (req, res) => {
  try {
    const { category, query } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (query) {
      filter.name = { $regex: query, $options: 'i' }; // Case-insensitive search
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};