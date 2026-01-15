const Product = require('../models/Product');

// Get all toys
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Member 1 Error: " + err.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    
  
    const io = req.app.get('socketio');
    if (io) {
      io.emit('broadcast-alert', {
        message: `🐾 New Item: ${newProduct.name} is now available!`
      });
    }
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a toy
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Toy removed from store' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};