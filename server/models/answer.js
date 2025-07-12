const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  votes: {
    upvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  isAccepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Virtual for vote count
answerSchema.virtual('voteCount').get(function() {
  return this.votes.upvotes.length - this.votes.downvotes.length;
});

module.exports = mongoose.model('Answer', answerSchema); 