import React from 'react';

interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  votes: number;
  author: string;
  timestamp: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, description, votes, author, timestamp }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-4 flex">
      {/* Profile Placeholder */}
      <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex-shrink-0" />
      <div className="flex-1">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{votes} votes</div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{description}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{author}, {timestamp}</div>
      </div>
    </div>
  );
};

export default QuestionCard;
