// src/pages/AskQuestion.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitQuestion from '../components/SubmitQuestion';
import { questionsAPI } from '../services/api';
import toast from 'react-hot-toast';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newQuestion = {
        title,
        description,
        tags,
      };

      const response = await questionsAPI.create(newQuestion);
      toast.success('Question created successfully!');
      navigate(`/question/${response.data._id}`);
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error('Failed to create question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <SubmitQuestion
        title={title}
        description={description}
        tags={tags.join(', ')}
        loading={loading}
        onTitleChange={e => setTitle(e.target.value)}
        onDescriptionChange={e => setDescription(e.target.value)}
        onTagsChange={e => setTags(e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AskQuestion;
