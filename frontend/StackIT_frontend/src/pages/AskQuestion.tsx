// src/pages/AskQuestion.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitQuestion from '../components/SubmitQuestion';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      title,
      description,
      tags,
    };

    // TODO: Replace with API call
    console.log('Submitting question:', newQuestion);

    // Redirect to home or newly created question
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
    <SubmitQuestion></SubmitQuestion>
    </div>
  );
};

export default AskQuestion;
