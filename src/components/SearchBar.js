import React from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city or zip code"
        aria-label="City search"
      />
      <button type="submit" aria-label="Search weather">🔍</button>
    </form>
  );
};

export default SearchBar;