const Message = require('../models/Message');

// Admin sends a platform-wide message
exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const message = new Message({
      content,
      sender: 'admin',
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully.', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// User fetches all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// (Optional) Get message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};
