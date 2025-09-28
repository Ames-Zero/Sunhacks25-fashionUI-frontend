"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Trash2, ExternalLink } from "lucide-react";
import { useState, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const WardrobeCard = memo(function WardrobeCard({ item, onRemove }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Handle both old and new data structures
  const productName = item.product_name || item.title;
  const productImage = item.image;
  const productBrand = item.brand;
  const productPrice = item.price;
  const productRating = item.rating;
  const productColors = item.colors;
  const productCategory = item.category;
  const productSubcategory = item.subcategory;
  const productAttributes = item.attributes;
  const productUrl = item.product_url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/95 via-purple-50/80 to-indigo-100/70 backdrop-blur-sm border-purple-200/30 shadow-lg hover:shadow-purple-200/25 will-change-transform">
        {/* Remove Button */}
        <motion.button
          className="absolute top-3 right-3 z-10 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={() => onRemove(item.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>

        {/* Favorite Badge */}
        <div className="absolute top-3 left-3 z-10">
          <motion.div
            className="bg-pink-500/80 text-white p-2 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            <Heart className="h-4 w-4 fill-current" />
          </motion.div>
        </div>

        {/* Product Image */}
        <div
          className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100"
          style={{ maxHeight: "400px", width: "100%", aspectRatio: "3/4" }}
        >
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 animate-pulse" />
          )}
          {!imageError && productImage ? (
            <Image
              src={productImage}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 will-change-transform ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ objectFit: "cover" }}
              priority={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
              <div className="text-center text-purple-400">
                <Heart className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-medium">Image not available</p>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-5 bg-gradient-to-br from-white/98 via-purple-25/60 to-indigo-50/80">
          {/* Brand */}
          {productBrand && (
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-2 bg-purple-100/50 px-2 py-1 rounded-full inline-block">
              {productBrand}
            </p>
          )}

          {/* Product Name */}
          <h3
            className="font-bold text-lg mb-3 leading-tight text-gray-800 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {productName}
          </h3>

          {/* Category & Subcategory */}
          {(productCategory || productSubcategory) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {productCategory && (
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                  {productCategory}
                </Badge>
              )}
              {productSubcategory && (
                <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                  {productSubcategory}
                </Badge>
              )}
            </div>
          )}

          {/* Rating */}
          {productRating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold ml-1 text-gray-700">{productRating}</span>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-2xl text-purple-700">${productPrice}</span>
          </div>

          {/* Colors */}
          {productColors && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700 mb-2">Colors:</p>
              <div className="flex gap-2 items-center">
                {productColors.primary && (
                  <div className="flex items-center gap-1">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                      style={{
                        backgroundColor: getColorValue(productColors.primary)
                      }}
                      title={productColors.primary}
                    />
                    <span className="text-xs font-medium text-gray-600">{productColors.primary}</span>
                  </div>
                )}
                {productColors.secondary && (
                  <div className="flex items-center gap-1">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                      style={{
                        backgroundColor: getColorValue(productColors.secondary)
                      }}
                      title={productColors.secondary}
                    />
                    <span className="text-xs font-medium text-gray-600">{productColors.secondary}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attributes */}
          {productAttributes && (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                {productAttributes.material && (
                  <div className="bg-purple-50 px-2 py-1 rounded text-center">
                    <p className="text-xs text-purple-600 font-semibold">Material</p>
                    <p className="text-xs text-gray-700 capitalize">{productAttributes.material}</p>
                  </div>
                )}
                {productAttributes.fit_type && (
                  <div className="bg-indigo-50 px-2 py-1 rounded text-center">
                    <p className="text-xs text-indigo-600 font-semibold">Fit</p>
                    <p className="text-xs text-gray-700 capitalize">{productAttributes.fit_type}</p>
                  </div>
                )}
                {productAttributes.pattern_type && (
                  <div className="bg-purple-50 px-2 py-1 rounded text-center col-span-2">
                    <p className="text-xs text-purple-600 font-semibold">Pattern</p>
                    <p className="text-xs text-gray-700 capitalize">{productAttributes.pattern_type}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 bg-gradient-to-r from-white/98 via-purple-25/40 to-indigo-50/60">
          <div className="flex gap-2 w-full">
            {productUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={() => window.open(productUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Item
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

// Helper function to get color values
function getColorValue(colorName) {
  const colorMap = {
    white: "#ffffff",
    black: "#000000",
    blue: "#3b82f6",
    red: "#ef4444",
    gray: "#6b7280",
    grey: "#6b7280",
    green: "#22c55e",
    yellow: "#eab308",
    purple: "#a855f7",
    pink: "#ec4899",
    orange: "#f97316",
    brown: "#a3a3a3",
  };
  return colorMap[colorName?.toLowerCase()] || "#9ca3af";
}

// Grid container for wardrobe items
export const WardrobeGrid = memo(function WardrobeGrid({ items, onRemove }) {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      layout
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <WardrobeCard item={item} onRemove={onRemove} />
        </motion.div>
      ))}
    </motion.div>
  );
});