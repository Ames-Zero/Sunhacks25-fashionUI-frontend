"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, Palette, Shirt } from "lucide-react";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function SearchBar({ onSearch, loading = false, className = "" }) {
  const [color, setColor] = useState("");
  const [item, setItem] = useState("");
  
  // Debounce the search values
  const debouncedColor = useDebounce(color, 300);
  const debouncedItem = useDebounce(item, 300);

  // Trigger search when debounced values change
  useEffect(() => {
    if (debouncedColor.trim() || debouncedItem.trim()) {
      const searchQuery = buildSearchQuery(debouncedColor, debouncedItem);
      if (searchQuery && onSearch) {
        onSearch(searchQuery);
      }
    }
  }, [debouncedColor, debouncedItem, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = buildSearchQuery(color, item);
    if (searchQuery && onSearch) {
      onSearch(searchQuery);
    }
  };

  const buildSearchQuery = (colorValue, itemValue) => {
    const parts = [];
    if (colorValue.trim()) parts.push(colorValue.trim());
    if (itemValue.trim()) parts.push(itemValue.trim());
    return parts.join(" ");
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
    // Removed real-time search for better performance
  };

  const handleItemChange = (e) => {
    const value = e.target.value;
    setItem(value);
    // Removed real-time search for better performance
  };

  const hasQuery = color.trim() || item.trim();

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        {/* Color Input */}
        <div className="flex-1">
          <label
            htmlFor="color-input"
            className="block text-sm font-semibold mb-2 text-left"
          >
            Color
          </label>
          <div className="relative">
            <Palette className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="color-input"
              type="text"
              placeholder="e.g., blue, red, white"
              value={color}
              onChange={handleColorChange}
              className="pl-10 bg-gray-100 border-gray-200 focus:bg-gray-50 focus:border-gray-300 text-black transition-all duration-200"
            />
          </div>
        </div>

        {/* Item Input */}
        <div className="flex-1">
          <label
            htmlFor="item-input"
            className="block text-sm font-semibold mb-2 text-left"
          >
            Item Type
          </label>
          <div className="relative">
            <Shirt className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="item-input"
              type="text"
              placeholder="e.g., shirt, jeans, trousers"
              value={item}
              onChange={handleItemChange}
              className="pl-10 bg-gray-100 border-gray-200 focus:bg-gray-50 focus:border-gray-300 text-black transition-all duration-200"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={!hasQuery || loading || !(color.trim() && item.trim())}
            className="w-[138px]"
          >
            {loading && color.trim() && item.trim() ? (
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
