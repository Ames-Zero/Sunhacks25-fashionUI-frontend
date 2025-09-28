'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchService } from '@/lib/searchService';

const WardrobeContext = createContext();

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};

export const WardrobeProvider = ({ children }) => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Load wardrobe items from localStorage on mount
  useEffect(() => {
    console.log('Inside useEffect to load wardrobe items');
    try {
      const savedItems = localStorage.getItem('wardrobeItems');
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setWardrobeItems(parsedItems);
      }
    } catch (error) {
      console.error('Error loading wardrobe items from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pathname]);

  // Save wardrobe items to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('wardrobeItems', JSON.stringify(wardrobeItems));
      } catch (error) {
        console.error('Error saving wardrobe items to localStorage:', error);
      }
    }
  }, [wardrobeItems, isLoading]);

  const addToWardrobe = (product) => {
    setWardrobeItems(prev => {
      // Check if item already exists
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev; // Don't add duplicates
      }
      
      // Add timestamp for when item was added
      const itemWithTimestamp = {
        ...product,
        addedAt: new Date().toISOString()
      };
      
      return [itemWithTimestamp, ...prev];
    });
  };

  const removeFromWardrobe = (productId) => {
    setWardrobeItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWardrobe = (productId) => {
    return wardrobeItems.some(item => item.id === productId);
  };

  const clearWardrobe = () => {
    setWardrobeItems([]);
    try {
      localStorage.removeItem('wardrobeItems');
    } catch (error) {
      console.error('Error clearing wardrobe items from localStorage:', error);
    }
  };

  const getWardrobeStats = () => {
    const totalItems = wardrobeItems.length;
    const totalValue = wardrobeItems.reduce((sum, item) => sum + (item.price || 0), 0);
    const categories = [...new Set(wardrobeItems.map(item => item.category || item.subcategory).filter(Boolean))];
    
    return {
      totalItems,
      totalValue,
      categoriesCount: categories.length,
      categories
    };
  };

  const value = {
    wardrobeItems,
    isLoading,
    addToWardrobe,
    removeFromWardrobe,
    isInWardrobe,
    clearWardrobe,
    getWardrobeStats
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};