"use client";

import { ParallaxLanding } from "@/components/ParallaxLanding";
import { useSearch } from "@/hooks/useSearch";
import { searchService } from "@/lib/searchService";

export default function Home() {
  // Use the real search API
  const { query, setQuery, results, loading, error, performSearch } = useSearch(
    searchService.searchProducts
  );

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      // Clear results when search is empty
      setQuery("");
    }
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
