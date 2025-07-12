const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    default: 'admin'
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  target: {
    type: String,
    default: 'all'  // Future-proofing for role-based messages
  }
});

module.exports = mongoose.model('Message', messageSchema);
