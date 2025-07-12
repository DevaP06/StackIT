// src/pages/AskQuestion.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h2 className="text-2xl font-bold mb-4">Ask a New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter question title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter question description (you can format it in markdown)"
          className="w-full border p-2 rounded h-40"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
          value={tags.join(',')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
