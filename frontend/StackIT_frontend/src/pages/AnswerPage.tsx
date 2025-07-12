import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// TypeScript interfaces
interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  authorId: string;
  timestamp: number;
}

interface Answer {
  id: number;
  content: string;
  author: string;
  authorId: string;
  timestamp: number;
  isAccepted: boolean;
}

interface User {
  id: string;
  name: string;
}

const AnswerPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [user] = useState<User | null>({ id: 'user123', name: 'YashGhule' }); // Mock user

  useEffect(() => {
    // Mock data
    setQuestion({
      id: questionId ?? '1',
      title: 'How does binary search work?',
      description: '<p>Can someone explain binary search with an example?</p>',
      tags: ['algorithms', 'binary-search', 'c-programming'],
      author: 'YashGhule',
      authorId: 'user123',
      timestamp: Date.now(),
    });

    setAnswers([
      {
        id: 1,
        content: '<p>Binary search works by dividing the array in halves...</p>',
        author: 'Tanvi',
        authorId: 'user789',
        timestamp: Date.now(),
        isAccepted: true,
      },
      {
        id: 2,
        content: '<p>You start at the middle of the array and move left or right...</p>',
        author: 'Ravi',
        authorId: 'user456',
        timestamp: Date.now(),
        isAccepted: false,
      },
    ]);
  }, [questionId]);

  const handleSubmit = () => {
    if (!user) return navigate('/login');
    if (!newAnswer.trim() || newAnswer.length < 10) {
      alert('Answer must be at least 10 characters long.');
      return;
    }

    const newAns: Answer = {
      id: Date.now(),
      content: `<p>${newAnswer}</p>`, // Wrap plain text in <p> for consistency
      author: user.name,
      authorId: user.id,
      timestamp: Date.now(),
      isAccepted: false,
    };
    setAnswers([newAns, ...answers]);
      setNewAnswer('');
  };

  const handleAcceptAnswer = (answerId: number) => {
      setAnswers(answers.map(ans =>
      ans.id === answerId ? { ...ans, isAccepted: true } : { ...ans, isAccepted: false }
      ));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navbar /> */}

      <div className="max-w-5xl mx-auto p-6">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-300 mb-4">
          <Link to="/" className="text-blue-400 hover:underline">Home</Link> {'>'} {question?.title ?? 'Question'}
        </div>

        {/* Question Section */}
        {question && (
        <div className="bg-gray-900 p-6 rounded-lg shadow mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{question.title}</h1>
          <div className="prose prose-invert max-w-none mb-3" dangerouslySetInnerHTML={{ __html: question.description }} />
          <div className="flex flex-wrap gap-2 mb-2">
            {question.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-200">{tag}</span>
            ))}
          </div>
          <div className="text-sm text-gray-400">
              Asked by {question.author} • {new Date(question.timestamp).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Answers Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Answers</h2>
          {answers.map((ans) => (
            <div
              key={ans.id}
              className={`border p-4 rounded-lg mb-4 shadow-sm ${ans.isAccepted ? 'border-green-500 bg-green-900' : 'bg-gray-900 border-gray-700'}`}
            >
              <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: ans.content }} />
              <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
                <span>— {ans.author} • {new Date(ans.timestamp).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button
                    className="text-gray-300 hover:text-blue-400"
                    aria-label="Upvote answer"
                  >
                    Upvote
                  </button>
                  <button
                    className="text-gray-300 hover:text-red-400"
                    aria-label="Downvote answer"
                  >
                    Downvote
                  </button>
                  {user?.id === question?.authorId && !ans.isAccepted && (
                    <button
                      className="text-green-400 ml-2 hover:underline"
                      onClick={() => handleAcceptAnswer(ans.id)}
                      aria-label="Accept this answer"
                    >
                      Accept Answer
                    </button>
                  )}
                  {user?.id === ans.authorId && (
                    <>
                      <button
                        className="text-yellow-400 ml-2 hover:underline"
                        aria-label="Edit answer"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-400 ml-2 hover:underline"
                        aria-label="Delete answer"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Answer */}
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-white mb-2">Your Answer</h2>
          {user ? (
            <>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg min-h-[150px] bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your answer here..."
                aria-label="Write your answer"
              />
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
                aria-label="Submit your answer"
              >
                Submit Answer
              </button>
            </>
          ) : (
            <div className="text-center text-gray-400">
              <p>You must be logged in to submit an answer.</p>
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate('/login')}
                aria-label="Go to login page"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerPage;