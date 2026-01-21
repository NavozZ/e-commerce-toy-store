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

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Toy not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    
  
    const io = req.app.get('socketio');
if (io) {
  io.emit('broadcast-alert', {
    message: `✨ New Toy Alert: ${newProduct.name} has just been added to the store!`
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