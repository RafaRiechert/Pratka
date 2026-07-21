"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Users2, X } from "lucide-react";
import { Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";

export default function CompanyDetailModal({
  company,
  onClose,
}: {
  company: Company | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {company && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/70"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="panel relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[28px] p-8 shadow-brutal-lg"
            initial={{ opacity: 0, y: 24, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.9, rotate: -2 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform duration-150 hover:-rotate-12 hover:bg-pink"
            >
              <X size={18} />
            </button>

            <h3 className="pr-8 font-display text-2xl font-bold text-ink">
              {company.name}
            </h3>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Tag variant="lavender">{company.sector}</Tag>
              <Tag variant="pink">{company.type}</Tag>
              {company.paid && <Tag variant="mint">Remunerado</Tag>}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink/70">
              {company.fullDescription}
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-ink/65">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="shrink-0 text-ink/40" />
                {company.cities.join(", ")}
              </div>
              <div className="flex items-center gap-2">
                <Users2 size={15} className="shrink-0 text-ink/40" />
                {company.target}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-ink/40" />
                {company.duration}
              </div>
            </div>

            <Button
              href={company.link}
              external
              variant="primary"
              size="md"
              className="mt-8 w-full"
            >
              Aplicar
              <ArrowUpRight size={16} />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
