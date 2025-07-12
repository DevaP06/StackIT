const Answer = require('../models/answer');
const Question = require('../models/question');

// Get answers for a question
exports.getAnswers = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const answers = await Answer.find({ question: questionId })
      .populate('author', 'username')
      .sort({ isAccepted: -1, voteCount: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Add vote count to each answer
    const answersWithVotes = answers.map(a => ({
      ...a,
      votes: a.votes.upvotes.length - a.votes.downvotes.length
    }));

    const total = await Answer.countDocuments({ question: questionId });

    res.json({
      success: true,
      data: answersWithVotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new answer
exports.createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const questionId = req.params.questionId;

    if (!content) {
      console.error('Missing answer content');
      return res.status(400).json({ success: false, message: 'Content is required' });
    }

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      console.error('Question not found for answer');
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    const answer = new Answer({
      content,
      author: req.user.id,
      question: questionId,
      votes: { upvotes: [], downvotes: [] }
    });

    await answer.save();
    console.log('Answer created:', answer._id);

    const populatedAnswer = await Answer.findById(answer._id)
      .populate('author', 'username')
      .lean();

    res.status(201).json({ success: true, data: populatedAnswer });
  } catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update answer
exports.updateAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const answerId = req.params.id;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Content is required' });
    }

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }

    // Check if user is the author or admin
    if (answer.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      { content },
      { new: true }
    ).populate('author', 'username');

    res.json({ success: true, data: updatedAnswer });
  } catch (error) {
    console.error('Error updating answer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete answer
exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }

    // Check if user is the author or admin
    if (answer.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Answer.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Answer deleted successfully' });
  } catch (error) {
    console.error('Error deleting answer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Vote on answer
exports.voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body;
    const answerId = req.params.id;
    const userId = req.user.id;

    if (!['up', 'down'].includes(voteType)) {
      return res.status(400).json({ success: false, message: 'Invalid vote type' });
    }

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }

    const upvotes = answer.votes.upvotes;
    const downvotes = answer.votes.downvotes;

    // Remove existing votes by this user
    answer.votes.upvotes = upvotes.filter(id => id.toString() !== userId);
    answer.votes.downvotes = downvotes.filter(id => id.toString() !== userId);

    // Add new vote
    if (voteType === 'up') {
      answer.votes.upvotes.push(userId);
    } else {
      answer.votes.downvotes.push(userId);
    }

    await answer.save();

    const updatedAnswer = await Answer.findById(answerId)
      .populate('author', 'username')
      .lean();

    updatedAnswer.votes = updatedAnswer.votes.upvotes.length - updatedAnswer.votes.downvotes.length;

    res.json({ success: true, data: updatedAnswer });
  } catch (error) {
    console.error('Error voting on answer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Accept answer (only question author can do this)
exports.acceptAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ success: false, message: 'Answer not found' });
    }

    const question = await Question.findById(answer.question);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Check if user is the question author
    if (question.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the question author can accept answers' });
    }

    // Unaccept any previously accepted answer for this question
    await Answer.updateMany(
      { question: answer.question },
      { isAccepted: false }
    );

    // Accept this answer
    answer.isAccepted = true;
    await answer.save();

    // Update question to mark as answered
    await Question.findByIdAndUpdate(answer.question, {
      isAnswered: true,
      acceptedAnswer: answerId
    });

    const updatedAnswer = await Answer.findById(answerId)
      .populate('author', 'username')
      .lean();

    res.json({ success: true, data: updatedAnswer });
  } catch (error) {
    console.error('Error accepting answer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 