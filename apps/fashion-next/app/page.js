"use client";

import { ParallaxLanding } from "@/components/ParallaxLanding";
import { useSearch } from "@/hooks/useSearch";
import { searchService } from "@/lib/searchService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasLoadedFromUrl = useRef(false);
  
  // Use the real search API
  const { query, setQuery, results, loading, error, performSearch } = useSearch(
    searchService.searchProducts
  );

  // Load search query from URL on mount - prevent infinite loop
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery.trim() && !hasLoadedFromUrl.current) {
      hasLoadedFromUrl.current = true;
      performSearch(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Only when searchParams object changes

  const handleSearch = (searchQuery) => {
    const currentQuery = searchParams.get('q');
    
    if (searchQuery.trim()) {
      // Only update URL if query is different
      if (currentQuery !== searchQuery) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('q', searchQuery);
        router.push(`?${params.toString()}`, { shallow: true });
      }
      
      // Only perform search if query is different from current
      if (query !== searchQuery) {
        performSearch(searchQuery);
      }
    } else {
      // Clear results and remove query from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      const newUrl = params.toString() ? `?${params.toString()}` : '/';
      router.push(newUrl, { shallow: true });
      
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
      query={query}
      setQuery={setQuery}
    />
  );
}
