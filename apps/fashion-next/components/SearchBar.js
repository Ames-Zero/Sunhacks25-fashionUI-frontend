"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function SearchBar({
  onSearch,
  loading = false,
  className = "",
  value = "",
  onChange = () => {},
}) {
  const searchParams = useSearchParams();
  
  // Initialize value from URL query on mount only
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== value && urlQuery.trim()) {
      onChange(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Only run when searchParams changes
  
  const handleSubmit = (e) => {
    console.log("SearchBar handleSubmit called", value, onSearch);
    e.preventDefault();
    if (value.trim() && onSearch) {
      onSearch(value.trim());
    }
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  const clearSearch = () => {
    onChange("");
    // Optionally clear search results when clearing the input
    if (onSearch) {
      onSearch("");
    }
  };

  const hasValue = value.trim();

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex gap-2 items-center">
        {/* Single Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for fashion items... (e.g., blue shirt, red dress)"
            value={value}
            onChange={handleValueChange}
            className="pl-10 pr-10 bg-gray-100 border-gray-200 focus:bg-gray-50 focus:border-gray-300 text-black transition-all duration-200"
          />
          {hasValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          disabled={!hasValue || loading}
          className="shrink-0"
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
