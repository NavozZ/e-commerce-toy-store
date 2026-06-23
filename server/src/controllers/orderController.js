const Order = require('../models/Order');


exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  if (!shippingAddress || shippingAddress.address === undefined || shippingAddress.city === undefined || totalPrice === undefined) {
    return res.status(400).json({ message: 'Missing required fields: shippingAddress or totalPrice' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
    });

    const createdOrder = await order.save();

   
    const io = req.app.get('socketio');
    if (io) {
      io.emit('broadcast-alert', {
        message: '🧸 Someone just adopted a toy from our collection!',
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({
      message: 'Order creation failed: ' + error.message,
    });
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
