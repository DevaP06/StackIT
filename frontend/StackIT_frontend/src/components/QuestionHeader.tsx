interface QuestionHeaderProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  timestamp: string;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ title, description, tags, author, timestamp }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="flex space-x-2 mb-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-blue-400 text-sm">{tag}</span>
        ))}
      </div>
      <p className="text-gray-300 mb-2">{description}</p>
      <p className="text-sm text-gray-500">Asked by {author} - {timestamp}</p>
    </div>
  );
};

export default QuestionHeader;