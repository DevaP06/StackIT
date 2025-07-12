interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  votes: number;
  author: string;
  timestamp: string;
  imageUrl?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  description,
  votes,
  author,
  timestamp,
  imageUrl,
}) => {
  return (
    <div className="mb-4 p-4 border rounded-lg flex items-start">
      <div className="mr-4">
        <p className="text-gray-500">{votes} votes</p>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <p className="text-sm text-gray-500 mt-2">{author}, {timestamp}</p>
      </div>
      {imageUrl && <img src={imageUrl} alt="Question" className="w-32 h-32 object-cover ml-4" />}
    </div>
  );
};

export default QuestionCard;