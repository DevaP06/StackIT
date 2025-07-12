import React from 'react';

interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  votes: number;
  author: string;
  timestamp: string;
}

interface QuestionListProps {
  filter: 'newest' | 'suggested';
  searchQuery: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ filter, searchQuery }) => {
  const [questions, setQuestions] = React.useState<QuestionCardProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Replace with actual backend API call: await fetch(`/api/questions?sort=${filter}&q=${searchQuery}`)
        const data = await new Promise<QuestionCardProps[]>(resolve =>
          setTimeout(() => resolve([
            { id: 1, title: "How to manage state in React?", description: "I'm working on...", votes: 100, author: "Sophia Clark", timestamp: "2 hours ago" },
            { id: 2, title: "Understanding async programming in JS", description: "I'm new to...", votes: 75, author: "Ethan Carter", timestamp: "5 hours ago" },
            { id: 3, title: "Best practices for securing a Node.js API", description: "I'm building...", votes: 50, author: "Olivia Bennett", timestamp: "1 day ago" },
            { id: 4, title: "Optimizing database queries", description: "I'm working on...", votes: 25, author: "Liam Harper", timestamp: "2 days ago" },
          ]), 1000)
        );
        setQuestions(data.filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase())));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setQuestions([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    // Cleanup function (e.g., for aborting fetch if component unmounts)
    return () => {
      // Add cleanup logic if needed (e.g., AbortController)
    };
  }, [filter, searchQuery]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.title} - {question.votes} votes</p>
          {/* Add more rendering logic as needed, e.g., integrate with QuestionCard */}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;