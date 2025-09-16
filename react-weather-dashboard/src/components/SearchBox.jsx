import React, { useState } from 'react';

const SearchBox = ({ onSearch, loading, searchHistory, onHistoryItemClick, onClearHistory }) => {
  const [city, setCity] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity('');
    setShowHistory(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleHistoryClick = (historyCity) => {
    onHistoryItemClick(historyCity);
    setShowHistory(false);
  };

  return (
    <div className="search-box-container mb-4">
      <form onSubmit={handleSubmit} className="position-relative">
        <div className="input-group search-input-group">
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowHistory(true)}
            placeholder="Enter city name..."
            className="form-control search-input"
            aria-label="City name"
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary search-btn"
            disabled={loading || !city.trim()}
            aria-label="Search weather"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {showHistory && searchHistory.length > 0 && (
          <div className="search-history-dropdown">
            <div className="dropdown-header">
              <span>Recent Searches</span>
              <button 
                type="button" 
                className="btn btn-sm btn-link text-danger p-0"
                onClick={onClearHistory}
              >
                Clear
              </button>
            </div>
            {searchHistory.map((historyCity, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => handleHistoryClick(historyCity)}
              >
                <i className="fas fa-history me-2"></i>
                {historyCity}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBox;