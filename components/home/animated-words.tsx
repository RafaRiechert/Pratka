"use client";

import { motion } from "framer-motion";
import { duration, ease, stagger } from "@/lib/motion";

/**
 * Word-by-word reveal for display headlines.
 *
 * Deliberately a *mask* reveal and not a fade: the hero headline is our LCP
 * element, and an element painted at opacity 0 doesn't count as painted, so
 * fading it in hands LCP to whenever hydration finishes. Each word is
 * painted at full opacity from the first frame and simply slides up out of
 * a clipping box — same effect to the eye, no LCP cost.
 *
 * Under reduced motion, MotionConfig strips the transform and the words are
 * already in place.
 */
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
        <span
          key={`${word}-${i}`}
          // Bottom padding + negative margin so descenders aren't clipped.
          className="inline-block overflow-hidden pb-[0.12em] mb-[-0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: duration.slow,
              delay: baseDelay + i * stagger.tight,
              ease: ease.soft,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
