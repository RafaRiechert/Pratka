"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letters = ["P", "r", "a", "t", "k", "a"];
const letterColors = ["text-mint", "text-pink", "text-lavender", "text-mint", "text-pink", "text-lavender"];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute h-3 w-3 rounded-full border-2 border-paper bg-pink"
            initial={{ x: "-40vw", opacity: 0 }}
            animate={{ x: "40vw", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
          <div className="flex">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className={`font-display text-5xl font-extrabold sm:text-7xl ${letterColors[i]}`}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -12 : 12, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 14,
                  delay: 0.15 + i * 0.08,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
