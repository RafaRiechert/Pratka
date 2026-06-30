"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export function StepperProgress({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between text-xs font-medium text-offwhite/50">
        <span>
          Etapa {step + 1} de {total}
        </span>
        <span>{Math.round(((step + 1) / total) * 100)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-lime"
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

export function StepperSlide({
  stepKey,
  direction,
  children,
}: {
  stepKey: string | number;
  direction: 1 | -1;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        initial={{ opacity: 0, x: direction * 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -40 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
