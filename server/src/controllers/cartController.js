const Cart = require('../models/Cart');

// @desc    Get user cart (READ)
exports.getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    // Return empty array if no cart exists yet
    res.json(cart ? cart.cartItems : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync cart from frontend (CREATE/UPDATE)
exports.syncCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    
    // Find cart and update, or create if it doesn't exist (upsert)
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, cartItems },
      { new: true, upsert: true }
    );

    res.json(updatedCart.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};