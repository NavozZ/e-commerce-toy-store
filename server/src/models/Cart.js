const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String }, // Store snapshot of name
      price: { type: Number }, // Store snapshot of price
      image: { type: String },
      qty: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);