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
    <motion.div
      className={cn("panel panel-glow rounded-card", className)}
      // O realce de hover desta identidade é a BORDA (.panel-glow), não um
      // salto: 1px de deslocamento é o bastante para dizer "selecionado".
      whileHover={interactive ? { y: -1 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
