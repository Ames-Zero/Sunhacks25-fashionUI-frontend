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
          Discover the latest fashion trends and find your perfect style
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <SearchBar
          placeholder="Search for fashion items (e.g., white shirt, blue jeans, red dress)"
          onSearch={handleSearch}
          loading={loading}
          className="max-w-2xl mx-auto"
        />
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
              <CardTitle>🔍 Smart Search</CardTitle>
              <CardDescription>AI-powered fashion search</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Search using natural language like "white cotton shirt" or "blue
                denim jeans" and find exactly what you're looking for.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ Real-time Results</CardTitle>
              <CardDescription>Instant search with debouncing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get instant results as you type with smart debouncing that
                reduces API calls while providing fast search experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Beautiful Cards</CardTitle>
              <CardDescription>Rich product information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each product is displayed in a beautiful card with images,
                prices, ratings, and detailed information to help you make the
                right choice.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Popular Searches */}
      {!query && (
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "white shirt",
              "blue jeans",
              "black dress",
              "red hoodie",
              "summer dress",
              "winter coat",
              "formal shirt",
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
