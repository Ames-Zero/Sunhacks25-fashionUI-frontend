"use client";

import { SearchBar } from "@/components/SearchBar";
import { ProductGrid } from "@/components/ProductCard";
import { useSearch } from "@/hooks/useSearch";
import { searchService } from "@/lib/searchService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  // Use the mock search function for now - replace with searchService.searchProducts for real API
  const { query, setQuery, results, loading, error, clearSearch } = useSearch(
    searchService.mockSearchProducts,
    300 // 300ms debounce delay
  );

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  console.log("Search results:", results);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Fashion Search</h1>
        <p className="text-muted-foreground text-lg">
          Discover amazing fashion items and build your personal wardrobe collection
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          className="max-w-4xl mx-auto"
        />
        
        {query && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
              {query && !loading && (
                <button 
                  onClick={() => handleSearch('')}
                  className="ml-2 text-primary hover:underline"
                >
                  Clear search
                </button>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {query ? (
        <div className="mb-8">
          <ProductGrid
            products={results}
            loading={
              loading || (query && query.length > 0 && results.length === 0)
            }
            error={error}
          />
        </div>
      ) : (
        /* Welcome Section - shown when no search */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>🔍 Easy Search</CardTitle>
              <CardDescription>Find what you want quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {`Simply type what you're looking for like "white shirt" or "blue
                jeans" and discover amazing fashion items.`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ Instant Results</CardTitle>
              <CardDescription>See products as you search</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get results instantly as you type and browse through our
                collection effortlessly to find your perfect match.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👕 Build Your Wardrobe</CardTitle>
              <CardDescription>Save items you love</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse products with detailed info and add your favorites to your
                personal wardrobe collection for easy access anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Popular Searches */}
      {!query && (
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Popular Combinations</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "white shirt",
              "blue jeans",
              "black dress",
              "red hoodie",
              "navy trousers",
              "gray sweater",
              "green jacket",
              "pink blouse",
            ].map((searchTerm) => (
              <button
                key={searchTerm}
                onClick={() => handleSearch(searchTerm)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                {searchTerm}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
