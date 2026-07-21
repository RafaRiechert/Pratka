"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "panel rounded-lg shadow-card transition-colors duration-150",
        interactive && "hover:border-signal",
        className
      )}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
