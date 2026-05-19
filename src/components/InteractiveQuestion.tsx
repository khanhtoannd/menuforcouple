import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, SearchX } from 'lucide-react';

export default function InteractiveQuestion({ onYes }: { onYes: () => void }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    setIsMoved(true);
    // Randomize movement within a safe bounded distance
    const maxX = 120;
    const maxY = 120;
    let newX = Math.random() * maxX * 2 - maxX;
    let newY = Math.random() * maxY * 2 - maxY;

    // Ensure it jumps a minimum distance away so it's impossible to click
    if (Math.abs(newX) < 50) newX = newX > 0 ? newX + 60 : newX - 60;
    if (Math.abs(newY) < 50) newY = newY > 0 ? newY + 60 : newY - 60;

    setNoPosition({ x: newX, y: newY });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 z-10 relative px-4" ref={containerRef}>
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-rose-600 text-center drop-shadow-sm font-sans"
      >
        So... do you love me? 🥺
      </motion.h2>

      <div className="flex items-center justify-center space-x-6 sm:space-x-12 h-32 w-full relative">
        <motion.button
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xl font-bold rounded-full shadow-xl shadow-rose-300 transition-all flex items-center space-x-3 z-20"
        >
          <span>YES OF COURSE!</span>
          <Heart className="w-6 h-6 fill-current animate-pulse" />
        </motion.button>

        {/* 
          This button runs away when the user's mouse gets near it.
          We use x/y translation for smooth hardware accelerated dodging. 
        */}
        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={handleHover}
          onFocus={handleHover} // For keyboard navigation trickery
          onTouchStart={handleHover} // For mobile trickery
          className={`px-8 py-4 bg-gray-200 text-gray-600 text-lg font-bold rounded-full shadow-md z-10 absolute pointer-events-auto ${isMoved ? '' : 'sm:relative'}`}
          style={isMoved ? { position: 'absolute' } : {}}
        >
          No, ew
        </motion.button>
      </div>
    </div>
  );
}
