const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'https://stackit-frontend.vercel.app', // Production frontend (update this with your actual domain)
    'https://stackit.vercel.app', // Alternative production domain
    'https://8k9k469t-5173.inc1.devtunnels.ms', // DevTunnel frontend
    process.env.FRONTEND_URL // Environment variable for frontend URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json()); // To parse JSON requests
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/messages', messageRoutes);
app.get('/', (req, res) => {
  res.json({ 
    message: 'StackIT API is running successfully!', 
    status: 'success',
    version: '1.0.0',
    endpoints: {
      messages: '/api/messages',
      // Add other endpoints as you build them
    }
  });
});


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

