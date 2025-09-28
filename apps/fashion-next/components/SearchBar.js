'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2 } from 'lucide-react';

export function SearchBar({ 
  placeholder = "Search for fashion items (e.g., white shirt, blue jeans)", 
  onSearch, 
  loading = false,
  className = "" 
}) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            className="pl-10 pr-10 bg-gray-100 border-gray-200 focus:bg-gray-50 focus:border-gray-300 text-black"
            disabled={loading}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <Button 
          type="submit" 
          className="ml-2"
          disabled={!query.trim() || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// Search suggestions component (optional enhancement)
export function SearchSuggestions({ suggestions, onSelect, loading }) {
  if (loading || !suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg">
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground text-sm"
            onClick={() => onSelect(suggestion)}
          >
            <Search className="inline mr-2 h-3 w-3" />
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}