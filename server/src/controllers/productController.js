const Product = require('../models/Product');

// Get all toys
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get category from URL
    let query = {};

    // If a category is provided, filter by it
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Toy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format" });
  }
};

// @desc    Get best sellers
exports.getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({}).limit(4); // Simulating best sellers
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl, category } = req.body;

  try {
    const product = new Product({
      user: req.user._id, // Links to admin
      name,
      price,
      description,
      imageUrl, // ✅ Matches the model field
      category,
      countInStock: 10
    });

    const createdProduct = await product.save();

    // Member 4: Broadcast to live feed
    const io = req.app.get('socketio');
    if (io) {
      io.emit('broadcast-alert', { 
        message: `✨ NEW TOY: ${name} is now available!` 
      });
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product (Admin Only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.image = req.body.image || product.image;
      product.category = req.body.category || product.category;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}