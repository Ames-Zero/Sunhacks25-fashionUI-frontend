'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function WardrobePage() {
  const { wardrobeItems, removeFromWardrobe, isLoading } = useWardrobe();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState('all');

  // Build back link with search params intact
  const getBackToHomeLink = () => {
    const urlQuery = searchParams.get('q');
    return urlQuery ? `/?q=${encodeURIComponent(urlQuery)}` : '/';
  };

  const getFilteredItems = () => {
    if (filter === 'all') return wardrobeItems;
    return wardrobeItems.filter(item => item.category === filter || item.subcategory === filter);
  };

  const categories = [...new Set(wardrobeItems.map(item => item.category || item.subcategory).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        className="pt-8 pb-4 bg-gradient-to-r from-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link href={getBackToHomeLink()}>
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
        className="py-6 bg-white shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Stats */}
            <div className="flex gap-4">
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-700">{wardrobeItems.length}</div>
                  <div className="text-sm text-gray-600">Items</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-700">{categories.length}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </CardContent>
              </Card>
              
              {/* Total Value field removed as requested */}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Wardrobe Items */}
      <motion.section 
        className="py-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen"
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
            {isLoading ? (
              <ProductGrid 
                products={[]} 
                loading={true}
                error={null}
              />
            ) : wardrobeItems.length === 0 ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-lg border border-indigo-200"
                >
                  <Heart className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Wardrobe is Empty</h3>
                  <p className="text-gray-600 mb-6">Start building your perfect collection by adding items from our fashion universe!</p>
                  <Link href={getBackToHomeLink()}>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Explore Fashion
                    </Button>
                  </Link>
                </motion.div>
              </div>
            ) : (
              <ProductGrid 
                products={getFilteredItems()} 
                loading={false}
                error={null}
              />
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}