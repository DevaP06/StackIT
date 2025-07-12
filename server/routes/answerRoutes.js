const express = require('express');
const router = express.Router();
const {
  getAnswers,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  voteAnswer,
  acceptAnswer
} = require('../controllers/answerController');

const { isAuthenticated } = require('../middleware/auth');

// All answer routes are protected
router.use(isAuthenticated);

// Get answers for a question
router.get('/questions/:questionId/answers', getAnswers);

// Create answer for a question
router.post('/questions/:questionId/answers', createAnswer);

// Update answer
router.put('/:id', updateAnswer);

// Delete answer
router.delete('/:id', deleteAnswer);

// Vote on answer
router.post('/:id/vote', voteAnswer);

// Accept answer (only question author)
router.post('/:id/accept', acceptAnswer);

module.exports = router; 