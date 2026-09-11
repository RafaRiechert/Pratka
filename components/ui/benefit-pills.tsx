"use client";

import { motion } from "framer-motion";
import { springPop, stagger, viewportOnce } from "@/lib/motion";

/**
 * Rótulos racionados em três. A inclinação saiu: nesta identidade nada é
 * torto de propósito — um terminal alinha. Cada um demonstra a regra da
 * paleta em vez de escolher uma cor avulsa: nenhum par de texto/superfície
 * aqui é literal — todos saem dos tokens, e cada par abaixo é um contrato
 * de contraste que globals.css garante (inverse/on-inverse,
 * accent/on-accent, support/on-support).
 */
const pills = [
  { label: "Vagas reais", className: "bg-inverse text-on-inverse", rotate: 0 },
  { label: "Feito no Brasil", className: "bg-accent text-on-accent", rotate: 0 },
  {
    label: "Grátis para estudantes",
    className: "bg-support text-on-support",
    rotate: 0,
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
          className={`pop rounded-pill px-4 py-2 text-sm font-semibold ${pill.className}`}
        >
          {pill.label}
        </motion.li>
      ))}
    </ul>
  );
}
