import React, { useState } from 'react';


interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Call onSearch with the current value
  };

  return (
    <input
      type="text"
      placeholder="Enter to search"
      value={query}
      onChange={handleSearch}
      className="w-full p-2 border border-gray-300 rounded-lg mb-4"
    />
  );
};

export default SearchBar;