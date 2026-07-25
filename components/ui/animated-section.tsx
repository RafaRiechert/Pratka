"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  y = 40,
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
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 70, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
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
      viewport={scrollTrigger ? { once: true, margin: "-80px" } : undefined}
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
