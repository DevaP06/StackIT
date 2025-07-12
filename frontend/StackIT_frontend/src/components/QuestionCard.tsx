import React from "react";
import { Link } from 'react-router-dom';
import { Question, questionsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface QuestionCardProps {
  question: Question;
  onVote?: (questionId: string, voteType: 'up' | 'down') => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onVote }) => {
  const { isAuthenticated } = useAuth();

  const handleVote = async (e: React.MouseEvent, voteType: 'up' | 'down') => {
    e.preventDefault(); // Prevent navigation when clicking vote buttons
    
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      return;
    }

    try {
      await questionsAPI.vote(question._id, voteType);
      if (onVote) {
        onVote(question._id, voteType);
      }
      toast.success(`Question ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully!`);
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to vote. Please try again.');
    }
  };
  return (
    <Link to={`/question/${question._id}`} className="block hover:bg-gray-800 transition rounded-lg">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-4 flex">
        {/* Profile Placeholder */}
        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">{question.votes} votes</div>
            <div className="flex gap-1">
              <button
                onClick={(e) => handleVote(e, 'up')}
                className="text-gray-400 hover:text-green-500 text-xs px-1 py-0.5 rounded"
                title="Upvote"
              >
                ▲
              </button>
              <button
                onClick={(e) => handleVote(e, 'down')}
                className="text-gray-400 hover:text-red-500 text-xs px-1 py-0.5 rounded"
                title="Downvote"
              >
                ▼
              </button>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{question.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{question.description}</p>
          <div className="flex flex-wrap gap-1 mt-2 mb-2">
            {question.tags && question.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {question.author.username}, {new Date(question.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
