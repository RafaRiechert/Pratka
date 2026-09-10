"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  revealDistance,
  springReveal,
  stagger,
  viewportOnce,
} from "@/lib/motion";

/**
 * Scroll-reveal primitives. Every major block on the site enters through one
 * of these so the rhythm is identical everywhere — the numbers all come from
 * lib/motion.ts rather than being tuned per section.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in app/layout.tsx: Framer drops the transforms and keeps the opacity, so
 * content still appears, it just doesn't travel.
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  y = revealDistance.lg,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: stagger.base },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: revealDistance.md },
  show: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
};

export function Stagger({
  children,
  className,
  scrollTrigger = true,
}: {
  children: ReactNode;
  className?: string;
  /**
   * When false, animates in on mount instead of on scroll-into-view. Use
   * this for grids whose contents change after the initial reveal already
   * fired (filters, tabs) — `whileInView` + `once: true` won't reliably
   * re-trigger for items that mount later, leaving them stuck invisible.
   */
  scrollTrigger?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={scrollTrigger ? undefined : "show"}
      whileInView={scrollTrigger ? "show" : undefined}
      viewport={scrollTrigger ? viewportOnce : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
