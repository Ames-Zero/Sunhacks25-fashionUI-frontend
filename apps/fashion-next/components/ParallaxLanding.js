"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductCard";
import { ThreeBackground } from "./ThreeBackground";
import CheckoutWardrobeButton from "./CheckoutWardrobeButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, Sparkles, Star, Zap } from "lucide-react";

export function ParallaxLanding({
  onSearch,
  searchResults,
  loading,
  error,
  hasSearched,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 800], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const searchY = useTransform(scrollY, [0, 400], [0, -100]);
  const searchScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  // Removed backgroundY transform to keep background static

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 300);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToProducts = () => {
    const productSection = document.getElementById("products-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Three.js Background */}
      <div>
        <ThreeBackground />
      </div>

      {/* Fixed Search Bar - appears when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-purple-200/90 backdrop-blur-md border-b border-purple-300 shadow-lg text-indigo-900"
          >
            <div className="container mx-auto p-4">
              <SearchBar
                onSearch={onSearch}
                loading={loading}
                className="max-w-4xl mx-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center text-center px-6 will-change-transform"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl md:text-[120px] font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
              }}
            >
              Fashion
              <motion.span
                className="text-6xl md:text-[120px] font-bold text-white mb-6"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                }}
              >
                {" "}
                Universe
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white font-bold mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Discover extraordinary fashion pieces and create your dream
              wardrobe in our immersive 3D universe
            </motion.p>

            {/* Floating Search Bar */}
            <motion.div
              style={{ y: searchY, scale: searchScale }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="mb-12 will-change-transform"
            >
              <div className="bg-blue-900/20 backdrop-blur-md rounded-2xl p-8 border border-blue-300/30">
                <SearchBar
                  onSearch={onSearch}
                  loading={loading}
                  className="max-w-2xl mx-auto"
                />
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="cursor-pointer"
              onClick={scrollToProducts}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
              >
                <span className="text-sm mb-2">Discover Products</span>
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section with Parallax */}
      <motion.section
        className="relative py-20 bg-gradient-to-b from-transparent to-black/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Fashion Universe?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Easy Search",
                description:
                  "Find your perfect style with our intuitive color and item search",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Instant Results",
                description:
                  "Get real-time results as you explore our vast fashion collection",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Build Your Wardrobe",
                description:
                  "Save your favorite pieces and create your personal fashion universe",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="text-center"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4 text-blue-400">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/80 text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        id="products-section"
        className="relative py-20 bg-gradient-to-b from-purple-100 to-indigo-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900">
              {hasSearched ? "Search Results" : "Featured Products"}
            </h2>
            <p className="text-xl text-purple-800 max-w-2xl mx-auto">
              {hasSearched
                ? "Discover items that match your style preferences"
                : "Explore our curated collection of trending fashion items"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ProductGrid
              products={hasSearched ? searchResults : []}
              loading={loading}
              error={error}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Checkout Wardrobe Button */}
      <CheckoutWardrobeButton />
    </div>
  );
}
