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
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="panel relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-card"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-6 top-6 text-mist transition-colors duration-150 hover:text-signal"
            >
              <X size={22} />
            </button>

            <h3 className="pr-8 font-display text-2xl font-bold text-ink">
              {company.name}
            </h3>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Tag variant="neutral">{company.sector}</Tag>
              <Tag variant="outline">{company.type}</Tag>
              {company.paid && <Tag variant="signal">Remunerado</Tag>}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink/75">
              {company.fullDescription}
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-mist">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="shrink-0 text-mist-2" />
                {company.cities.join(", ")}
              </div>
              <div className="flex items-center gap-2">
                <Users2 size={15} className="shrink-0 text-mist-2" />
                {company.target}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-mist-2" />
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
