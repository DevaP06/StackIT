import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionHeader from '../components/QuestionHeader';
import AnswerList from '../components/AnswerList';
import AnswerForm from '../components/AnswerForm';
import { questionsAPI, Question } from '../services/api';

const AnswerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshAnswers, setRefreshAnswers] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const response = await questionsAPI.getById(id!);
        setQuestion(response.data.data);
      } catch (error) {
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuestion();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!question) return <div className="text-center py-8 text-red-400">Question not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4">
        <QuestionHeader {...question} />
        <AnswerList questionId={question._id} key={refreshAnswers} />
        <AnswerForm questionId={question._id} onAnswerSubmitted={() => setRefreshAnswers(r => r + 1)} />
      </div>
    </div>
  );
};

export default AnswerPage;
