"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Wand2, Send, Heart, Star, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useFashionRecommendations } from "@/hooks/useFashionRecommendations";

export default function FashionAdvisor() {
  const [prompt, setPrompt] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const { 
    recommendations, 
    isLoading, 
    error, 
    getRecommendations, 
    clearRecommendations 
  } = useFashionRecommendations();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const question = prompt.trim();
    setCurrentQuestion(question);
    
    try {
      await getRecommendations(question);
      // Clear the input after successful submission
      setPrompt("");
    } catch (err) {
      // Error is already handled by the hook
      console.error("Fashion recommendations error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        className="pt-4 pb-4 bg-gradient-to-r from-pink-500 to-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white"
                style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Friends With Wardrobe
                <motion.span 
                  className="ml-3"
                  animate={{ 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Wand2 className="inline h-8 w-8 text-yellow-400" />
                </motion.span>
              </motion.h1>
            </div>
            
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8 pb-40">
        {/* Welcome Section - Only show when no recommendations */}
        {!recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            {/* AI Icon and Instructions */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 mx-auto">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 shadow-2xl flex items-center justify-center relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                      "0 0 40px rgba(236, 72, 153, 0.6)",
                      "0 0 20px rgba(168, 85, 247, 0.4)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <Sparkles className="w-12 h-12 text-white z-10" />
                </motion.div>
                
                {/* Floating particles */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full blur-sm"
                />
                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    x: [5, -5, 5],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full blur-sm"
                />
                <motion.div
                  animate={{
                    y: [-5, 15, -5],
                    x: [10, -10, 10],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-4 -right-4 w-2 h-2 bg-indigo-400 rounded-full blur-sm"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "linear-gradient(90deg, #1f2937, #7c3aed, #ec4899, #1f2937)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Describe Your Fashion Need
              </motion.h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
                Tell me about the occasion, your style preferences, weather, or any specific requirements. 
                I&apos;ll create the perfect outfit combinations just for you!
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="inline-flex items-center gap-2 text-purple-600 font-semibold text-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Wand2 className="h-5 w-5" />
                </motion.div>
                Start typing your fashion question below
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Recommendations Results - Show above input */}
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-8"
          >
            {/* Question Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-6 border border-purple-200"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Your Question</span>
                </div>
                <p className="text-gray-800 text-lg font-medium italic">
                  &quot;{currentQuestion}&quot;
                </p>
              </motion.div>
              
              {recommendations.style && (
                <p className="text-purple-600 font-medium">Style: {recommendations.style}</p>
              )}
              {recommendations.weather && (
                <p className="text-blue-600 font-medium">Weather: {recommendations.weather}</p>
              )}
            </div>

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {(() => {
                // Handle both string and array formats
                let suggestions = recommendations.outfit_suggestion;
                
                // If it's a string, check if it looks like JSON first
                if (typeof suggestions === 'string') {
                  // Only try to parse if it looks like JSON (starts with [ or {)
                  const trimmed = suggestions.trim();
                  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                    try {
                      suggestions = JSON.parse(suggestions);
                    } catch (e) {
                      console.error('Failed to parse JSON suggestions:', e);
                      // Even if JSON parsing fails, treat as plain text
                    }
                  }
                  
                  // If it's still a string (plain text), display it nicely
                  if (typeof suggestions === 'string') {
                    return (
                      <div className="col-span-full">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-purple-200 shadow-lg"
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                              <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Fashion Recommendations</h3>
                          </div>
                          <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                            {suggestions}
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                }
                
                // If it's not an array, wrap it in an array
                if (!Array.isArray(suggestions)) {
                  suggestions = [suggestions];
                }
                
                return suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={suggestion.image}
                        alt={suggestion.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-gray-700">
                        {suggestion.confidence}% Match
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-500" />
                        {suggestion.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                      <p className="text-sm font-medium text-green-600">{suggestion.priceRange}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-700">Outfit Components:</h4>
                        <ul className="space-y-1">
                          {suggestion.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                              <Star className="h-3 w-3 mr-2 text-yellow-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                ));
              })()}
            </div>

            {/* Suggested Items Section */}
            {recommendations.suggested_items && recommendations.suggested_items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Suggested Items</h3>
                  <p className="text-gray-600">Shop these recommended pieces to complete your look</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.suggested_items.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm group">
                        <div className="relative h-48 bg-gray-100">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.product_name}
                              fill
                              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className={`absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-medium ${item.image_url ? 'hidden' : 'flex'}`}
                            style={{ display: item.image_url ? 'none' : 'flex' }}
                          >
                            <div className="text-center">
                              <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                              <p>Image not available</p>
                            </div>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold text-gray-800 line-clamp-2">
                            {item.product_name}
                          </CardTitle>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">{item.brand}</span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {item.subcategory}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xl font-bold text-green-600">
                              ₹{item.price.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">4.2</span>
                            </div>
                          </div>
                          
                          {item.product_url && (
                            <motion.a
                              href={item.product_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm">
                                <Heart className="h-4 w-4 mr-2" />
                                Shop Now
                              </Button>
                            </motion.a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Always Visible Search Input at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-6 shadow-lg"
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="What can I wear to my best friend's wedding? I want to look elegant but not outshine the bride..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none text-base bg-gray-50 border-2 border-gray-200 focus:border-purple-400 focus:bg-white transition-all duration-200 pr-16 text-black"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <motion.button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  onClick={handleSubmit}
                  className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Wand2 className="h-5 w-5 text-white" />
                    </motion.div>
                  ) : (
                    <Send className="h-5 w-5 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}