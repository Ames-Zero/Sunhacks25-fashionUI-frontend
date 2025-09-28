import { useState } from 'react';
import { searchService } from '@/lib/searchService';

export const useFashionRecommendations = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendations = async (prompt) => {
    if (!prompt?.trim()) {
      setError('Please provide a fashion prompt');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await searchService.getFashionRecommendations(prompt);
      setRecommendations(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Failed to get fashion recommendations';
      setError(errorMessage);
      console.error('Fashion recommendations error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations,
    clearRecommendations,
    clearError,
    hasRecommendations: !!recommendations,
  };
};