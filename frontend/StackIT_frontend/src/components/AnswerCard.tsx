import React from "react";

export interface AnswerCardProps {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  author: string;
  timestamp: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ content, upvotes, downvotes, author, timestamp }) => {
  return (
    <div className="bg-gray-100 p-4 rounded mb-4 shadow">
      <p className="mb-2">{content}</p>
      <div className="text-sm text-gray-600">By {author} • {timestamp}</div>
      <div className="text-sm text-gray-500 mt-1">⬆️ {upvotes} ⬇️ {downvotes}</div>
    </div>
  );
};

export default AnswerCard;
