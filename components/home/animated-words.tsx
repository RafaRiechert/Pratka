"use client";

import { motion } from "framer-motion";

export default function AnimatedWords({
  text,
  className,
  wordClassName,
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  baseDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={`inline-block ${wordClassName ?? ""}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: baseDelay + i * 0.05,
            ease: [0.2, 0, 0, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
