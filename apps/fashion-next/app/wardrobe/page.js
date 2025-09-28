'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThreeBackground } from '@/components/ThreeBackground';
import { WardrobeGrid } from '@/components/WardrobeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Heart, Trash2, Filter } from 'lucide-react';
import Link from 'next/link';

export default function WardrobePage() {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load wardrobe items from localStorage
    const savedItems = localStorage.getItem('wardrobe');
    if (savedItems) {
      setWardrobeItems(JSON.parse(savedItems));
    }
  }, []);

  const removeFromWardrobe = (productId) => {
    const updatedItems = wardrobeItems.filter(item => item.id !== productId);
    setWardrobeItems(updatedItems);
    localStorage.setItem('wardrobe', JSON.stringify(updatedItems));
  };

  const getFilteredItems = () => {
    if (filter === 'all') return wardrobeItems;
    return wardrobeItems.filter(item => item.category === filter || item.subcategory === filter);
  };

  const categories = [...new Set(wardrobeItems.map(item => item.category || item.subcategory).filter(Boolean))];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <ThreeBackground />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 pt-8 pb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-2"
                style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                My Wardrobe
                <motion.span 
                  className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text ml-3"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="inline h-8 w-8 text-yellow-400" />
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white/90 bg-black/20 backdrop-blur-sm rounded-xl px-6 py-2 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Curate your perfect style collection
              </motion.p>
            </div>
            
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      {/* Stats and Filters */}
      <motion.section 
        className="relative z-10 py-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Stats */}
            <div className="flex gap-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{wardrobeItems.length}</div>
                  <div className="text-sm opacity-80">Items</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <div className="text-sm opacity-80">Categories</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">
                    ${wardrobeItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(0)}
                  </div>
                  <div className="text-sm opacity-80">Total Value</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30'
                }
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filter === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className={filter === category 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Wardrobe Items */}
      <motion.section 
        className="relative z-10 py-8 bg-gradient-to-b from-purple-100/20 to-indigo-200/30 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {wardrobeItems.length === 0 ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto"
                >
                  <Heart className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Wardrobe is Empty</h3>
                  <p className="text-gray-600 mb-6">Start building your perfect collection by adding items from our fashion universe!</p>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Explore Fashion
                    </Button>
                  </Link>
                </motion.div>
              </div>
            ) : (
              <WardrobeGrid 
                items={getFilteredItems()} 
                onRemove={removeFromWardrobe}
              />
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}