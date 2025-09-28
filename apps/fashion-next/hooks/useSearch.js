import { useState } from 'react';

// Custom hook for search functionality with manual trigger
export function useSearch(searchFunction) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manual search function that can be called on demand
  const performSearch = async (searchQuery) => {
    const queryToSearch = searchQuery || query;
    
    if (!queryToSearch.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setQuery(queryToSearch); // Update the query state
      const data = await searchFunction(queryToSearch);
      // Handle both direct array and response object with results array
      const searchResults = Array.isArray(data) ? data : (data.results || data);
      setResults(searchResults);
    } catch (err) {
      setError(err.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setLoading(false);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
    performSearch,
  };
}