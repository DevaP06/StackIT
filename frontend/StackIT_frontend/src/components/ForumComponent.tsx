import React, { useState } from 'react';

const ForumComponent: React.FC = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([
    {
      id: 1,
      author: 'Sophia Bennett',
      time: '1 hour ago',
      content: 'You can use CSS media queries to adjust the layout based on screen size. For a hamburger menu, you\'ll need some JavaScript to toggle the menu\'s visibility.',
      votes: { up: 12, down: 2 },
      accepted: false,
    },
    {
      id: 2,
      author: 'Ethan Walker',
      time: '30 minutes ago',
      content: 'Here\'s a basic example using CSS Grid and a bit of JavaScript for the menu toggle: [HTML code example]. This example uses a simple hamburger icon [link] and toggles the active class on the navigation links to show/hide them on smaller screens. You can expand on this with more styling and transitions.',
      votes: { up: 25, down: 5 },
      accepted: false,
    },
  ]);

  const handleAcceptAnswer = (id: number) => {
    setAnswers(answers.map(answer =>
      answer.id === id ? { ...answer, accepted: true } : { ...answer, accepted: false }
    ));
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      setAnswers([...answers, {
        id: Date.now(),
        author: 'You',
        time: 'just now',
        content: userAnswer,
        votes: { up: 0, down: 0 },
        accepted: false,
      }]);
      setUserAnswer('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">How to implement a responsive navigation bar?</h2>
        <p className="text-gray-600 mb-4">
          I’m working on a web project and need to create a navigation bar that adapts to different screen sizes. What are the best practices for implementing a responsive navigation bar using HTML, CSS, and JavaScript? I’m particularly interested in handling the transition between desktop and mobile views, including the use of a hamburger menu for smaller screens. Any code examples or resources would be greatly appreciated.
        </p>
        <p className="text-sm text-gray-500">Asked by Alex Carter - 2 hours ago</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Answers</h3>
        {answers.map(answer => (
          <div key={answer.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={`https://i.pravatar.cc/40?img=${answer.id}`}
                  alt={answer.author}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium">{answer.author}</span>
                <span className="text-gray-500 text-sm ml-2">{answer.time}</span>
              </div>
              <button
                onClick={() => handleAcceptAnswer(answer.id)}
                className={`px-3 py-1 rounded ${answer.accepted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-colors duration-200`}
                disabled={answer.accepted}
              >
                {answer.accepted ? 'Accepted' : 'Accept Answer'}
              </button>
            </div>
            <p className="text-gray-700">{answer.content}</p>
            <div className="flex space-x-4 mt-2">
              <button className="text-green-500 hover:text-green-700">👍 {answer.votes.up}</button>
              <button className="text-red-500 hover:text-red-700">👎 {answer.votes.down}</button>
            </div>
          </div>
        ))}

        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Write your answer here..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            >
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForumComponent;