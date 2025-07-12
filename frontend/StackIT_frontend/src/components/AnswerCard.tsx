import React from "react";
import { Answer } from '../services/api';

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  return (
    <div className="bg-gray-100 p-4 rounded mb-4 shadow">
      <p className="mb-2">{answer.content}</p>
      <div className="text-sm text-gray-600">By {answer.author?.username || 'Unknown'} • {new Date(answer.createdAt).toLocaleString()}</div>
      <div className="text-sm text-gray-500 mt-1">Votes: {answer.votes ?? 0}</div>
    </div>
  );
};

export default AnswerCard;
