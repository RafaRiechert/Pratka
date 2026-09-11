"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Users2, X } from "lucide-react";
import { Tag } from "@/components/ui/tag";
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
            className="absolute inset-0 bg-ink/80"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="panel relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card border-t-2 border-t-ink p-8"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="focus-ring absolute right-6 top-6 rounded-control border border-line-strong p-1.5 text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <h3 className="pr-12 font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
              {company.name}
            </h3>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Tag variant="accent">{company.sector}</Tag>
              <Tag variant="ink">{company.type}</Tag>
              {company.paid && <Tag variant="accent">Remunerado</Tag>}
            </div>

            {company.fullDescription && (
              <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-ink-2">
                {company.fullDescription}
              </p>
            )}

            <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-ink-soft" aria-hidden="true" />
                {company.cities.join(", ")}
              </div>
              <div className="flex items-center gap-2">
                <Users2 size={14} className="shrink-0 text-ink-soft" aria-hidden="true" />
                {company.target}
              </div>
              {company.duration && (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0 text-ink-soft" aria-hidden="true" />
                  {company.duration}
                </div>
              )}
            </div>

            {company.areas ? (
              <div className="mt-6 space-y-4">
                {company.areas.map((area) => (
                  <div
                    key={area.area}
                    className="border-t-2 border-t-ink bg-surface-3 p-5"
                  >
                    <h4 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                      {area.area}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {area.description}
                    </p>
                    <Button
                      href={area.link}
                      external
                      variant="primary"
                      size="sm"
                      className="mt-3 w-full"
                    >
                      Aplicar
                      <ArrowUpRight size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : company.status === "em-breve" ? (
              <p className="label-meta mt-8 w-full border border-dashed border-line-strong px-4 py-3.5 text-center text-ink-soft">
                {company.opensWhen ?? "Inscrições abrem em breve"}
              </p>
            ) : (
              company.link && (
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
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
