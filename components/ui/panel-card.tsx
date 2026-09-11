"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function PanelCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    // Dossiê: o cartão é uma folha, não um objeto flutuante. O hover levanta
    // um fio (–2px, sem escala) em vez de tirar o papel da mesa.
    <motion.div
      className={cn("panel panel-glow rounded-panel", className)}
      whileHover={interactive ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
