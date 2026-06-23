const Product = require('../models/Product');

// Get all toys
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query; 
    let query = {};

    
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

//     Get best sellers
exports.getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({}).limit(4); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl, category, stock = 0 } = req.body;

  if (price <= 0 || stock < 0) {
    return res.status(400).json({ message: 'Price must be > 0 and stock cannot be negative' });
  }

  try {
    const product = new Product({
      createdBy: req.user._id, 
      name,
      price,
      description,
      imageUrl, 
      category,
      stock
    });

    const createdProduct = await product.save();

    
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


exports.updateProduct = async (req, res) => {
  if (req.body.price <= 0 || req.body.stock < 0) {
    return res.status(400).json({ message: 'Price must be > 0 and stock cannot be negative' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.imageUrl = req.body.imageUrl || product.imageUrl;
      product.category = req.body.category || product.category;
      if (req.body.stock !== undefined) {
        product.stock = req.body.stock;
      }
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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