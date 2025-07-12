// components/AnswerList.tsx
import React, { useEffect, useState } from 'react';

interface Answer {
  id: number;
  content: string;
  author: string;
  date: string;
}

interface AnswerListProps {
  questionId: number;
}

const AnswerList: React.FC<AnswerListProps> = ({ questionId }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch — replace with actual API call
    const fetchAnswers = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000)); // simulate delay

      setAnswers([
        {
          id: 1,
          content: 'You can use a binary search algorithm if the array is sorted.',
          author: 'Alice',
          date: '2025-07-10',
        },
        {
          id: 2,
          content: 'Linear search is simpler but slower on large data sets.',
          author: 'Bob',
          date: '2025-07-11',
        },
      ]);

      setLoading(false);
    };

    fetchAnswers();
  }, [questionId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading answers...</p>;
  }

  if (answers.length === 0) {
    return <p className="text-center text-gray-500">No answers yet. Be the first one!</p>;
  }

  return (
    <div className="space-y-4">
      {answers.map((answer) => (
        <div
          key={answer.id}
          className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
        >
          <p className="text-gray-800 text-lg">{answer.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            — {answer.author} on {new Date(answer.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;