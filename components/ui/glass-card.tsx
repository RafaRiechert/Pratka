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
      className={cn("panel rounded-[28px] shadow-brutal", className)}
      whileHover={
        interactive
          ? { x: -3, y: -3, rotate: -0.5, boxShadow: "9px 9px 0 0 var(--color-ink)" }
          : undefined
      }
      whileTap={interactive ? { x: 3, y: 3, boxShadow: "0 0 0 0 var(--color-ink)" } : undefined}
      transition={{ type: "spring", stiffness: 350, damping: 16 }}
    >
      {children}
    </motion.div>
  );
}
