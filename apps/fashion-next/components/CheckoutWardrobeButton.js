"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWardrobe } from "@/contexts/WardrobeContext";

export default function CheckoutWardrobeButton() {
  const router = useRouter();
  const { wardrobeItems } = useWardrobe();
  const itemCount = wardrobeItems.length;

  const handleCheckoutWardrobe = () => {
    router.push('/wardrobe');
  };

  if (itemCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          onClick={handleCheckoutWardrobe}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 text-lg font-semibold"
          size="lg"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Checkout Wardrobe ({itemCount})
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
        >
          {itemCount}
        </motion.div>
        
        {/* Pulse Effect */}
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
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full -z-10"
        />
      </motion.div>
    </motion.div>
  );
}