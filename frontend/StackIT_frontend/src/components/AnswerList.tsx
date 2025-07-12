import React from "react";
import AnswerCard, { AnswerCardProps } from "./AnswerCard"; // Adjust path

interface AnswerListProps {
  questionId: number;
}

const AnswerList: React.FC<AnswerListProps> = ({ questionId }) => {
  const [answers, setAnswers] = React.useState<AnswerCardProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      try {
        const data = await new Promise<AnswerCardProps[]>(resolve =>
          setTimeout(() => resolve([
            {
              id: 1,
              content: "You can use CSS media queries...",
              upvotes: 12,
              downvotes: 2,
              author: "Sophia Bennett",
              timestamp: "1 hour ago"
            },
            {
              id: 2,
              content: "Here's a basic example using CSS Grid...",
              upvotes: 25,
              downvotes: 5,
              author: "Ethan Walker",
              timestamp: "20 minutes ago"
            },
          ]), 1000)
        );
        setAnswers(data);
      } catch (error) {
        console.error("Failed to fetch answers:", error);
        setAnswers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Answers</h2>
      {answers.map((answer) => (
        <AnswerCard key={answer.id} {...answer} />
      ))}
    </div>
  );
};

export default AnswerList;
