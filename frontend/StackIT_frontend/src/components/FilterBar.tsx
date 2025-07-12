interface FilterBarProps {
  onFilterChange: (filter: 'newest' | 'suggested') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div className="mb-4 flex space-x-4">
      <button onClick={() => onFilterChange('newest')} className="text-blue-500 hover:underline">
        Newest
      </button>
      <button onClick={() => onFilterChange('suggested')} className="text-blue-500 hover:underline">
        Suggested
      </button>
    </div>
  );
};

export default FilterBar;