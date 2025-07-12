import React from 'react';
// import Navbar from '../components/Navbar';
import ScrollTracker from '../components/ScrollTracker';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import QuestionList from '../components/QuestionList';

const HomePage: React.FC = () => {
  const [filter, setFilter] = React.useState<'newest' | 'suggested'>('newest');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollTracker />
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Top Questions</h1>
        <FilterBar onFilterChange={setFilter} />
        <SearchBar onSearch={setSearchQuery} />
        <QuestionList filter={filter} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default HomePage;