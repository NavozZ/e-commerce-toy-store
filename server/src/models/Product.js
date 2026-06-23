const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  ageRange: { 
    type: String, 
    enum: ['0-2', '3-5', '6-8', '9-12', '13+', 'All Ages'], 
    default: 'All Ages' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);