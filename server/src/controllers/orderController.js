const Order = require('../models/Order');

// Member 3 Logic: Create Order from Cart
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;

    // Attach user ID from Member 2's protect middleware
    const order = new Order({
      user: req.user.id, 
      items,
      totalPrice,
      shippingAddress
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ error: "Member 3 Error: " + error.message });
  }
};

// Member 3 Logic: Fetch User History
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};