import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; size: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random hearts for the floating background effect
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random horizontal position 0-100%
      delay: Math.random() * 8, // random start delay
      size: Math.random() * 20 + 15, // random size between 15 and 35
      duration: Math.random() * 10 + 15, // random animation duration
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-300 opacity-30"
          initial={{ y: "110vh", x: 0, rotate: 0 }}
          animate={{
            y: "-10vh", // move completely off top of screen
            x: Math.sin(heart.id) * 60, // gentle sway side to side
            rotate: 360
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: `${heart.left}%` }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
