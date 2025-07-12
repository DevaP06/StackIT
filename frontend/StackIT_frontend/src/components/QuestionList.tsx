import React from 'react';
import QuestionCard from './QuestionCard';
import { questionsAPI, Question } from '../services/api';

interface QuestionListProps {
  filter: 'newest' | 'suggested';
  searchQuery: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ filter, searchQuery }) => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleVote = (questionId: string, voteType: 'up' | 'down') => {
    setQuestions(questions.map(q => {
      if (q._id === questionId) {
        return { ...q, votes: q.votes + (voteType === 'up' ? 1 : -1) };
      }
      return q;
    }));
  };

  React.useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await questionsAPI.getAll(filter, searchQuery);
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setError("Failed to load questions. Please try again.");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filter, searchQuery]);

  if (loading) return <div className="text-center py-4 text-white">Loading...</div>;

  if (error) return <div className="text-center py-4 text-red-400">{error}</div>;

  if (questions.length === 0) {
    return <div className="text-center py-4 text-gray-400">No questions found.</div>;
  }

  return (
    <div>
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} onVote={handleVote} />
      ))}
    </div>
  );
};

export default QuestionList;
