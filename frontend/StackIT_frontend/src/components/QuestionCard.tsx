import React from "react";
import { Link } from 'react-router-dom';
import { Question } from '../services/api';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <Link to={`/question/${question._id}`} className="block hover:bg-gray-800 transition rounded-lg">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-4 flex">
        {/* Profile Placeholder */}
        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{question.votes} votes</div>
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
