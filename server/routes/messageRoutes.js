const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getMessageById
} = require('../controllers/messageController');

const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Admin: Send message
router.post('/send', isAuthenticated, isAdmin, sendMessage);

// User: Get all messages
router.get('/', isAuthenticated, getMessages);

// Optional: Get one message
router.get('/:id', isAuthenticated, getMessageById);

module.exports = router;
