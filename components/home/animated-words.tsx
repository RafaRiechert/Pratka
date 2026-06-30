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
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: baseDelay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
