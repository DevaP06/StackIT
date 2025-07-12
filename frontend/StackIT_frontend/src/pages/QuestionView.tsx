// src/pages/QuestionView.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Answer {
  id: string;
  content: string;
  author: string;
}

interface Question {
  id: string;
  title: string;
  description: string;
  answers: Answer[];
}

const QuestionView = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    // TODO: Replace with API call
    setQuestion({
      id: id || '1',
      title: 'Sample Question Title',
      description: 'This is a sample question description.',
      answers: [
        { id: 'a1', content: 'Sample answer 1', author: 'User A' },
        { id: 'a2', content: 'Sample answer 2', author: 'User B' },
      ],
    });
  }, [id]);

  const handleAnswerSubmit = () => {
    if (!newAnswer.trim()) return;
    console.log('Submitting answer:', newAnswer);
    setNewAnswer('');
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <p className="mb-6">{question.description}</p>

      <h2 className="text-xl font-semibold mb-2">Answers</h2>
      {question.answers.map((ans) => (
        <div key={ans.id} className="border p-3 rounded mb-3">
          <p>{ans.content}</p>
          <small className="text-gray-500">– {ans.author}</small>
        </div>
      ))}

      <div className="mt-6">
        <textarea
          className="w-full border p-2 rounded h-32"
          placeholder="Write your answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button
          onClick={handleAnswerSubmit}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionView;
