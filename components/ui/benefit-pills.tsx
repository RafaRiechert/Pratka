"use client";

import { motion } from "framer-motion";
import { springSoft, stagger, viewportOnce } from "@/lib/motion";

/**
 * Três selos, racionados. Eram cápsulas coloridas e inclinadas; no dossiê
 * viraram etiquetas retangulares de fio — a marcação de margem de um
 * documento, não adesivos.
 *
 * A cor sobrou no fio e na tinta da letra, e cada uma continua demonstrando
 * um papel diferente da paleta (ink, accent-deep, support) em vez de
 * escolher um hex avulso. Sem rotação: papel impresso não fica torto de
 * propósito.
 */
const pills = [
  { label: "Vagas reais", className: "border-ink text-ink" },
  { label: "Feito no Brasil", className: "border-accent-deep text-accent-deep" },
  { label: "Grátis para estudantes", className: "border-support text-support" },
];

export default function BenefitPills({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {pills.map((pill, i) => (
        <motion.li
          key={pill.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...springSoft, delay: i * stagger.base }}
          className={`label-meta rounded-tag border px-3 py-2 ${pill.className}`}
        >
          {pill.label}
        </motion.li>
      ))}
    </ul>
  );
}
