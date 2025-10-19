"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check, Heart, Sparkles } from "lucide-react";
import { useState, memo } from "react";
import { useWardrobe } from "@/contexts/WardrobeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { searchService } from "@/lib/searchService";

export const ProductCard = memo(function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const { addToWardrobe, isInWardrobe } = useWardrobe();

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleAddToWardrobe = async () => {
    if (isInWardrobeAlready || isAdding) return;

    setIsAdding(true);

    try {
      // Add item to wardrobe
      addToWardrobe({
        id: product.id,
        name: productName,
        title: productName,
        price: productPrice,
        originalPrice: productOriginalPrice,
        discount: productDiscount,
        image: productImage,
        category: productCategory,
        rating: productRating,
        reviews: productReviews,
        brand: productBrand,
        availability: productAvailability,
        colors: productColors,
        sizes: productSizes,
        description: productDescription,
      });

      const apiResponse = await searchService.addToCloset(product.id);
      console.log("API response for adding to closet:", apiResponse);

      // Wait a moment for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.error("Error adding to wardrobe:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const isInWardrobeAlready = isInWardrobe(product.id);

  // Handle both old and new data structures
  const productName = product.name || product.title || product.product_name;
  const productImage = product.image || product.image_url;
  const productBrand = product.brand;
  const productPrice = product.price;
  const productOriginalPrice = product.originalPrice;
  const productDiscount = product.discount;
  const productRating = product.rating;
  const productReviews = product.reviews;
  const productColors = product.colors; // Now an array of strings
  const productSizes = product.sizes; // Array of sizes
  const productCategory = product.category;
  const productSubcategory = product.subcategory;
  const productAttributes = product.attributes;
  const productDescription = product.description;
  const productAvailability = product.availability;
  const productTags = product.tags;

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/95 via-indigo-50/80 to-purple-100/70 backdrop-blur-sm border-indigo-200/30 shadow-lg hover:shadow-indigo-200/25 will-change-transform">
      {/* Product Image */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100"
        style={{ maxHeight: "530px", width: "100%", aspectRatio: "3/4" }}
      >
        {!imageError && productImage ? (
          <Image
            src={productImage}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
            onError={handleImageError}
            style={{
              objectFit: "contain",
              mixBlendMode: "multiply",
              backgroundColor: "transparent",
            }}
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <div className="text-center text-indigo-400">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm font-medium">Image not available</p>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6 bg-gradient-to-r from-white/98 via-indigo-50/40 to-purple-50/60 space-y-4">
        {/* Brand */}
        {productBrand && (
          <div className="flex justify-between items-start">
            <span className="truncate text-xs text-indigo-600 font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1.5 rounded-full border border-indigo-200/50 shadow-sm flex-1 min-w-0">
              {productBrand}
            </span>

            {productAvailability && (
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${
                  productAvailability === "In Stock"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
              >
                {productAvailability}
              </span>
            )}
          </div>
        )}

        {/* Product Name */}
        <div className="space-y-2">
          <h3
            className="font-bold text-xl leading-tight text-gray-900 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-all",
            }}
          >
            {productName}
          </h3>

          {/* Category & Subcategory */}
          {(productCategory || productSubcategory) && (
            <div className="flex flex-wrap gap-2">
              {productCategory && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 transition-colors"
                >
                  {productCategory}
                </Badge>
              )}
              {productSubcategory && (
                <Badge
                  variant="outline"
                  className="text-xs font-medium border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition-colors"
                >
                  {productSubcategory}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Rating & Reviews */}
        {productRating && (
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg border border-yellow-200/50 shadow-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-500 mr-1.5" />
              <span className="text-sm font-bold text-gray-800">
                {productRating}
              </span>
              {productReviews && (
                <span className="text-xs text-gray-600 ml-1.5 font-medium">
                  ({productReviews.toLocaleString()} reviews)
                </span>
              )}
            </div>
          </div>
        )}

        {/* ...existing code... */}

        {/* Colors and Sizes */}
        <div className="grid grid-cols-1 gap-4">
          {productColors && productColors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-800 flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                Available Colors
              </h4>
              <div className="flex gap-2 flex-wrap">
                {productColors.slice(0, 4).map((color, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 px-3 py-1.5 rounded-full border border-indigo-300/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {color}
                  </span>
                ))}
                {productColors.length > 4 && (
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200">
                    +{productColors.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {productSizes && productSizes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-800 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Available Sizes
              </h4>
              <div className="flex gap-2 flex-wrap">
                {productSizes.slice(0, 4).map((size, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1.5 rounded-full border border-purple-300/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {size}
                  </span>
                ))}
                {productSizes.length > 4 && (
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200">
                    +{productSizes.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Attributes */}
        {productAttributes && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {productAttributes.material && (
                <div className="bg-indigo-50 px-2 py-1 rounded text-center">
                  <p className="text-xs text-indigo-600 font-semibold">
                    Material
                  </p>
                  <p className="text-xs text-gray-700 capitalize">
                    {productAttributes.material}
                  </p>
                </div>
              )}
              {productAttributes.fit_type && (
                <div className="bg-purple-50 px-2 py-1 rounded text-center">
                  <p className="text-xs text-purple-600 font-semibold">Fit</p>
                  <p className="text-xs text-gray-700 capitalize">
                    {productAttributes.fit_type}
                  </p>
                </div>
              )}
              {productAttributes.pattern_type && (
                <div className="bg-indigo-50 px-2 py-1 rounded text-center col-span-2">
                  <p className="text-xs text-indigo-600 font-semibold">
                    Pattern
                  </p>
                  <p className="text-xs text-gray-700 capitalize">
                    {productAttributes.pattern_type}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 bg-gradient-to-r from-white/98 via-indigo-50/40 to-purple-50/60">
        <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
          <Button
            className={`w-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              isInWardrobeAlready
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            } text-white`}
            size="sm"
            onClick={handleAddToWardrobe}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                </motion.div>
                Adding...
              </>
            ) : isInWardrobeAlready ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                In Wardrobe
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Add to Wardrobe
              </>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
});

// Grid container for products
export const ProductGrid = memo(function ProductGrid({
  products,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="animate-pulse bg-purple-100/80 backdrop-blur-sm border-purple-300 shadow-purple-200/50"
          >
            <div
              className="bg-muted rounded-sm"
              style={{ maxHeight: "530px", width: "100%", aspectRatio: "3/4" }}
            />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  // No products found
  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-12 max-w-2xl mx-auto border border-indigo-200 shadow-lg">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <ShoppingCart className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              We couldn&apos;t find any products matching your search. Try
              adjusting your search terms or browse with different keywords.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                onClick={() => {
                  const searchInput =
                    document.querySelector('input[type="text"]');
                  if (searchInput) {
                    searchInput.value = "";
                    searchInput.focus();
                    searchInput.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start New Search
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const searchInput =
                    document.querySelector('input[type="text"]');
                  if (searchInput) {
                    searchInput.focus();
                    searchInput.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              >
                Try Different Search
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
