const Announcement = require('../models/Announcement');

// @desc    Create & Broadcast Announcement (CREATE)
exports.createAnnouncement = async (req, res) => {
  try {
    const { message, type } = req.body;
    const announcement = await Announcement.create({ message, type });

    // MEMBER 4: Real-time broadcast
    const io = req.app.get('socketio');
    io.emit('new-announcement', announcement);

    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all announcements (READ)
exports.getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find({}).sort({ createdAt: -1 });
  res.json(announcements);
};

// @desc    Toggle status (UPDATE)
exports.toggleAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (announcement) {
    announcement.isActive = !announcement.isActive;
    await announcement.save();
    res.json(announcement);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

// @desc    Remove (DELETE)
exports.deleteAnnouncement = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Announcement removed' });
};