interface FilterBarProps {
  onFilterChange: (filter: 'newest' | 'suggested') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value as 'newest' | 'suggested');
  };

  return (
    <div className="mb-4">
      <select
        onChange={handleChange}
        defaultValue="suggested"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="suggested">Top by Votes</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default FilterBar;
