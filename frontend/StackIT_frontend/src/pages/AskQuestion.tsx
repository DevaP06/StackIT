// src/pages/AskQuestion.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitQuestion from '../components/SubmitQuestion';
import { questionsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to create a question');
      return;
    }
    
    setLoading(true);

    try {
      const newQuestion = {
        title,
        description,
        tags,
      };

      console.log('Creating question:', newQuestion);
      const response = await questionsAPI.create(newQuestion);
      console.log('Question created:', response);
      
      toast.success('Question created successfully!');
      navigate(`/question/${response.data._id}`);
    } catch (error: any) {
      console.error('Error creating question:', error);
      const message = error.response?.data?.message || error.message || 'Failed to create question. Please try again.';
      toast.error(message);
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
