'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

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