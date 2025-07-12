import React from 'react';
import QuestionCard from './QuestionCard';

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
        // Simulated API call
        const data = await new Promise<QuestionCardProps[]>(resolve =>
          setTimeout(() => resolve([
            { id: 1, title: "How to manage state in React?", description: "I'm working on a large React application and struggling with managing state across multiple components. What are the best practices and tools available to handle complex state management effectively?", votes: 100, author: "Sophia Clark", timestamp: "2 hours ago" },
            { id: 2, title: "Understanding async programming in JS", description: "I'm new to JavaScript and having trouble grasping asynchronous programming concepts like promises and async/await. Can someone explain these concepts with examples?", votes: 75, author: "Ethan Carter", timestamp: "5 hours ago" },
            { id: 3, title: "Best practices for securing a Node.js API", description: "I'm building a Node.js API and want to ensure it's secure. What are the essential security measures I should implement to protect against common vulnerabilities?", votes: 50, author: "Olivia Bennett", timestamp: "1 day ago" },
            { id: 4, title: "Optimizing database queries", description: "I'm working on an application that handles a large number of database queries. What are the best strategies for optimizing these queries to improve performance and reduce latency?", votes: 25, author: "Liam Harper", timestamp: "2 days ago" },
          ]), 1000)
        );

        // Filter by search query
        const filtered = data.filter(q =>
          q.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setQuestions(filtered);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      // Optional cleanup
    };
  }, [filter, searchQuery]);

  if (loading) return <div className="text-center py-4 text-white">Loading...</div>;

  return (
    <div>
      {questions.map((question) => (
        <QuestionCard key={question.id} {...question} />
      ))}
    </div>
  );
};

export default QuestionList;
