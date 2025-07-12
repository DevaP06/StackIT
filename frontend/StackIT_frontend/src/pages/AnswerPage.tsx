import React from 'react';
// import Navbar from '../components/Navbar';
import QuestionHeader from '../components/QuestionHeader';
import AnswerList from '../components/AnswerList';
import AnswerForm from '../components/AnswerForm';

const AnswerPage: React.FC = () => {
  const question = {
    id: 1,
    title: "How to implement a responsive navigation bar?",
    description: "I'm working on a web project and need to create a navigation bar that adapts to different screen sizes. What are the best practices for implementing a responsive navigation bar using HTML, CSS, and JavaScript? I'm particularly interested in handling the transition between desktop and mobile views, including the use of a hamburger menu for smaller screens. Any code examples or resources would be greatly appreciated.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    author: "Alex Carter",
    timestamp: "2 hours ago",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <QuestionHeader {...question} />
        <AnswerList questionId={question.id} />
        <AnswerForm questionId={question.id} />
      </div>
    </div>
  );
};

export default AnswerPage;
