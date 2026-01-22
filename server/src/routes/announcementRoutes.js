const express = require('express');
const router = express.Router();
const { 
  createAnnouncement, 
  getAnnouncements, 
  toggleAnnouncement, 
  deleteAnnouncement 
} = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAnnouncements)
  .post(protect, admin, createAnnouncement);

router.route('/:id')
  .put(protect, admin, toggleAnnouncement)
  .delete(protect, admin, deleteAnnouncement);

module.exports = router;