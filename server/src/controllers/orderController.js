const asyncHandler = require('../utils/asyncHandler');

const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.createOrder = asyncHandler(async (req, res) => {
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

    await Promise.all(
      orderItems.map(async (item) => {
        const updatedProduct = await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.qty } },
          { new: true }
        );
        if (updatedProduct && updatedProduct.stock < 0) {
          console.warn(
            `Warning: Product ${updatedProduct._id} (${updatedProduct.name}) has negative stock: ${updatedProduct.stock}`
          );
        }
      })
    );

    await Cart.findOneAndDelete({ user: req.user._id });

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
});

exports.getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const validStatuses = ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status: ${status}. Must be one of ${validStatuses.join(', ')}` });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    if (status === 'Paid') {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
