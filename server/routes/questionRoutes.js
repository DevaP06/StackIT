const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion
} = require('../controllers/questionController');

const { isAuthenticated } = require('../middleware/auth');

// Public routes
router.get('/', getQuestions);
router.get('/:id', getQuestionById);

// Protected routes
router.post('/', isAuthenticated, createQuestion);
router.put('/:id', isAuthenticated, updateQuestion);
router.delete('/:id', isAuthenticated, deleteQuestion);
router.post('/:id/vote', isAuthenticated, voteQuestion);

module.exports = router; 