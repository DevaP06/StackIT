import React from "react";
interface AnswerFormProps {
  questionId: number;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ questionId }) => {
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with actual backend API call: await fetch(`/api/questions/${questionId}/answers`, {
      //   method: 'POST',
      //   body: JSON.stringify({ content }),
      //   headers: { 'Content-Type': 'application/json' },
      // })
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setContent(''); // Clear form on success
    } catch (error) {
      console.error("Failed to submit answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Answer</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full p-2 border border-gray-700 rounded-lg bg-gray-900 text-white mb-2"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-500"
        >
          {loading ? 'Submitting...' : 'Submit Answer'}
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;