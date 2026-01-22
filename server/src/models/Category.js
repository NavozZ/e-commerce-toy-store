const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Lego"
  icon: { type: String, default: 'Box' }, // Store an icon name or emoji
  color: { type: String, default: 'bg-blue-50 text-blue-500' }, // Tailwind classes
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);