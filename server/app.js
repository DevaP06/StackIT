const express = require('express');
const app = express();
const messageRoutes = require('./routes/messageRoutes');

// Middleware
app.use(express.json());

// API Routes
app.use('/api/messages', messageRoutes);

module.exports = app;
