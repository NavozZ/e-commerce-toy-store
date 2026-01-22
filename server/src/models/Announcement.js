const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, default: 'info' }, // e.g., 'info', 'success', 'warning'
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);