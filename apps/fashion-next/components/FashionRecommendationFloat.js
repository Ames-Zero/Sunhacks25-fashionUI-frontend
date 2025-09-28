"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FashionRecommendationFloat() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/fashion-advisor');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          onClick={handleClick}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 h-auto"
          size="lg"
        >
          <div className="flex flex-col items-center gap-1">
            <Wand2 className="h-6 w-6" />
            <span className="text-xs font-medium">Fashion AI</span>
          </div>
        </Button>
        
        {/* Animated sparkles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full -z-10"
        />
        
        {/* Floating sparkle effect */}
        <motion.div
          animate={{
            y: [-2, -8, -2],
            x: [0, 2, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="h-4 w-4 text-yellow-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}