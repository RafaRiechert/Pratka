"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letters = ["P", "r", "a", "t", "k", "a"];

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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute h-2 w-2 rounded-full bg-purple"
            style={{ boxShadow: "0 0 30px 10px rgba(123,111,224,0.7)" }}
            initial={{ x: "-40vw", opacity: 0 }}
            animate={{ x: "40vw", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
          <div className="flex">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className="font-display text-5xl font-extrabold text-offwhite sm:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
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
