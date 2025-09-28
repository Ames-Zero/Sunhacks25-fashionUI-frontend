"use client";

import { ParallaxLanding } from "@/components/ParallaxLanding";
import { useSearch } from "@/hooks/useSearch";
import { searchService } from "@/lib/searchService";

export default function Home() {
  // Use the mock search function for now - replace with searchService.searchProducts for real API
  const { query, setQuery, results, loading, error } = useSearch(
    searchService.mockSearchProducts,
    300 // 300ms debounce delay
  );

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const hasSearched = Boolean(query && query.trim());

  return (
    <ParallaxLanding
      onSearch={handleSearch}
      searchResults={results}
      loading={loading}
      error={error}
      hasSearched={hasSearched}
    />
  );
}
