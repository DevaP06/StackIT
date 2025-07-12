import React from 'react';

interface SubmitQuestionProps {
  title: string;
  description: string;
  tags: string;
  loading: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SubmitQuestion: React.FC<SubmitQuestionProps> = ({
  title,
  description,
  tags,
  loading,
  onTitleChange,
  onDescriptionChange,
  onTagsChange,
  onSubmit,
}) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Ask a public question</h1>
      <p className="text-gray-500 mb-6">Steps to write a good question</p>

      <form onSubmit={onSubmit}>
        {/* Title */}
        <label className="font-semibold">Summarize your problem</label>
        <p className="text-sm text-gray-500 mb-1">Summarize your problem in a one-line title.</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-sm"
          placeholder="e.g. Is there an R function for finding the index of a..."
          value={title}
          onChange={onTitleChange}
          required
        />

        {/* Description */}
        <label className="font-semibold">Describe what you've tried</label>
        <p className="text-sm text-gray-500 mb-1">Describe your problem in more detail.</p>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 h-28 text-sm"
          placeholder="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
          value={description}
          onChange={onDescriptionChange}
          required
        />

        {/* Tags */}
        <label className="font-semibold">Add tags</label>
        <p className="text-sm text-gray-500 mb-1">Add up to 5 tags to describe what your question is about.</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-sm"
          placeholder="e.g. (python, pandas, dataframe)"
          value={tags}
          onChange={onTagsChange}
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Your Question'}
        </button>
      </form>
    </div>
  );
};

export default SubmitQuestion;
