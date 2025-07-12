const Question = require('../models/question');
const Answer = require('../models/answer');

// Get all questions with filtering and search
exports.getQuestions = async (req, res) => {
  try {
    const { filter = 'newest', search = '' } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Sorting based on filter
    let sortOptions = {};
    if (filter === 'newest') {
      sortOptions = { createdAt: -1 };
    } else if (filter === 'suggested') {
      sortOptions = { voteCount: -1, createdAt: -1 };
    }

    const questions = await Question.find(query)
      .populate('author', 'username')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    // Add vote count to each question
    const questionsWithVotes = questions.map(q => {
      const upvotes = q.votes && Array.isArray(q.votes.upvotes) ? q.votes.upvotes.length : 0;
      const downvotes = q.votes && Array.isArray(q.votes.downvotes) ? q.votes.downvotes.length : 0;
      return {
        ...q,
        votes: upvotes - downvotes
      };
    });

    const total = await Question.countDocuments(query);

    res.json({
      success: true,
      data: questionsWithVotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username')
      .populate('acceptedAnswer')
      .lean();

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Increment views
    await Question.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    // Add vote count
    question.votes = question.votes.upvotes.length - question.votes.downvotes.length;

    res.json({ success: true, data: question });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new question
exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      console.error('Missing title or description');
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const question = new Question({
      title,
      description,
      tags: tags || [],
      author: req.user.id,
      votes: { upvotes: [], downvotes: [] }
    });

    await question.save();
    console.log('Question created:', question._id);

    const populatedQuestion = await Question.findById(question._id)
      .populate('author', 'username')
      .lean();

    res.status(201).json({ success: true, data: populatedQuestion });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Check if user is the author or admin
    if (question.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { title, description, tags },
      { new: true }
    ).populate('author', 'username');

    res.json({ success: true, data: updatedQuestion });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Check if user is the author or admin
    if (question.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Delete associated answers
    await Answer.deleteMany({ question: req.params.id });

    await Question.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Vote on question
exports.voteQuestion = async (req, res) => {
  try {
    const { voteType } = req.body;
    const questionId = req.params.id;
    const userId = req.user.id;

    if (!['up', 'down'].includes(voteType)) {
      return res.status(400).json({ success: false, message: 'Invalid vote type' });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    const upvotes = question.votes.upvotes;
    const downvotes = question.votes.downvotes;

    // Remove existing votes by this user
    question.votes.upvotes = upvotes.filter(id => id.toString() !== userId);
    question.votes.downvotes = downvotes.filter(id => id.toString() !== userId);

    // Add new vote
    if (voteType === 'up') {
      question.votes.upvotes.push(userId);
    } else {
      question.votes.downvotes.push(userId);
    }

    await question.save();

    const updatedQuestion = await Question.findById(questionId)
      .populate('author', 'username')
      .lean();

    updatedQuestion.votes = updatedQuestion.votes.upvotes.length - updatedQuestion.votes.downvotes.length;

    res.json({ success: true, data: updatedQuestion });
  } catch (error) {
    console.error('Error voting on question:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 