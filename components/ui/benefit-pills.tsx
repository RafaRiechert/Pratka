"use client";

import { motion } from "framer-motion";
import { springPop, stagger, viewportOnce } from "@/lib/motion";

/**
 * Rotated badge labels, borrowed from the reference and rationed to three.
 * Each one demonstrates the palette rule rather than picking a colour at
 * random: warm surfaces carry ink text, petroleo carries cream.
 */
/*
 * Surfaces chosen to read on cream *and* on the sol block they currently
 * sit on — a sol pill on the sol field was invisible. Text/surface pairs
 * all clear AA: cream on ink 15.9, ink on tangerine 5.5, cream on
 * petroleo 9.1.
 */
const pills = [
  { label: "Vagas reais", className: "bg-ink text-cream", rotate: -3 },
  { label: "Feito no Brasil", className: "bg-tangerine text-ink", rotate: 2 },
  {
    label: "Grátis para estudantes",
    className: "bg-petroleo text-cream",
    rotate: -1.5,
  },
];

export default function BenefitPills({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-4 ${className ?? ""}`}>
      {pills.map((pill, i) => (
        <motion.li
          key={pill.label}
          initial={{ opacity: 0, y: 14, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: pill.rotate }}
          viewport={viewportOnce}
          transition={{ ...springPop, delay: i * stagger.base }}
          className={`pop rounded-full px-4 py-2 text-sm font-semibold shadow-card ${pill.className}`}
        >
          {pill.label}
        </motion.li>
      ))}
    </ul>
  );
}
