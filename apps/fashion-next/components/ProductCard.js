"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Handle both old and new data structures
  const productName = product.product_name || product.title;
  const productImage = product.image_url || product.image;
  const productBrand = product.brand;
  const productPrice = product.price;
  const productRating = product.rating;
  const productColors = product.colors;
  const productCategory = product.category;
  const productSubcategory = product.subcategory;
  const productAttributes = product.attributes;

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/95 via-indigo-50/80 to-purple-100/70 backdrop-blur-sm border-indigo-200/30 shadow-lg hover:shadow-indigo-200/25">
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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
            style={{ objectFit: "cover" }}
            priority={false}
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

      <CardContent className="p-5 bg-gradient-to-br from-white/98 via-indigo-25/60 to-purple-50/80">
        {/* Brand */}
        {productBrand && (
          <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-2 bg-indigo-100/50 px-2 py-1 rounded-full inline-block">
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
              <Badge variant="outline" className="text-xs border-indigo-200 text-indigo-600">
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
          <span className="font-bold text-2xl text-indigo-700">${productPrice}</span>
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
                <div className="bg-indigo-50 px-2 py-1 rounded text-center">
                  <p className="text-xs text-indigo-600 font-semibold">Material</p>
                  <p className="text-xs text-gray-700 capitalize">{productAttributes.material}</p>
                </div>
              )}
              {productAttributes.fit_type && (
                <div className="bg-purple-50 px-2 py-1 rounded text-center">
                  <p className="text-xs text-purple-600 font-semibold">Fit</p>
                  <p className="text-xs text-gray-700 capitalize">{productAttributes.fit_type}</p>
                </div>
              )}
              {productAttributes.pattern_type && (
                <div className="bg-indigo-50 px-2 py-1 rounded text-center col-span-2">
                  <p className="text-xs text-indigo-600 font-semibold">Pattern</p>
                  <p className="text-xs text-gray-700 capitalize">{productAttributes.pattern_type}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 bg-gradient-to-r from-white/98 via-indigo-25/40 to-purple-50/60">
        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Wardrobe
        </Button>
      </CardFooter>
    </Card>
  );

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
}

// Grid container for products
export function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse bg-purple-100/80 backdrop-blur-sm border-purple-300 shadow-purple-200/50">
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
