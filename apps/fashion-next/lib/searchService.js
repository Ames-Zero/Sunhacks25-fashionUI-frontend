import { api } from './axios';

// Search API service
export const searchService = {
  // Search for products with query
  searchProducts: async (query) => {
    try {
      // Encode the query for URL
      const encodedQuery = encodeURIComponent(query);
      const response = await api.get(`/api/v1/search?q=${encodedQuery}`);
      return response.data;
    } catch (error) {
      console.error('Search API error:', error);
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  },

  // Search with filters (optional enhancement)
  searchWithFilters: async (query, filters = {}) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const params = new URLSearchParams({
        q: encodedQuery,
        ...filters
      });
      
      const response = await api.get(`/api/v1/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Search with filters API error:', error);
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  },

  // Mock search function for development/testing
  mockSearchProducts: async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response data
    const mockResults = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `${query} - Product ${index + 1}`,
      description: `High-quality ${query.toLowerCase()} with premium materials and modern design.`,
      price: Math.floor(Math.random() * 200) + 20,
      originalPrice: Math.floor(Math.random() * 300) + 100,
      image: `https://picsum.photos/300/400?random=${index + 1}`,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      reviews: Math.floor(Math.random() * 500) + 10,
      brand: ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo'][Math.floor(Math.random() * 5)],
      category: query.includes('shirt') ? 'Shirts' : query.includes('jeans') ? 'Jeans' : 'Fashion',
      availability: Math.random() > 0.2 ? 'In Stock' : 'Limited Stock',
      colors: ['Black', 'White', 'Blue', 'Red', 'Gray'].slice(0, Math.floor(Math.random() * 3) + 1),
      sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 4) + 1),
    }));

    return mockResults;
  }
};