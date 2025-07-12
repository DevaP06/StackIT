import React from "react";
import AnswerCard from "./AnswerCard";
import { answersAPI, Answer } from '../services/api';

interface AnswerListProps {
  questionId: string;
}

const AnswerList: React.FC<AnswerListProps> = ({ questionId }) => {
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const response = await answersAPI.getByQuestionId(questionId);
      setAnswers(response.data.data || []);
    } catch (error) {
      setAnswers([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAnswers();
    // eslint-disable-next-line
  }, [questionId]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Answers</h2>
      {answers.length === 0 && <div className="text-gray-400">No answers yet.</div>}
      {answers.map((answer) => (
        <AnswerCard key={answer._id} answer={answer} />
      ))}
    </div>
  );
};

export default AnswerList;
