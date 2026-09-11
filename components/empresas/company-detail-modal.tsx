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
            className="absolute inset-0 bg-surface/85"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="panel relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card p-7"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="focus-ring absolute right-5 top-5 rounded-control text-ink-soft transition-colors hover:text-accent-deep"
            >
              <X size={22} />
            </button>

            <h3 className="pr-8 font-display text-xl font-bold text-ink sm:text-2xl">
              {company.name}
            </h3>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Tag variant="accent">{company.sector}</Tag>
              <Tag variant="ink">{company.type}</Tag>
              {company.paid && <Tag variant="accent">Remunerado</Tag>}
            </div>

            {company.fullDescription && (
              <p className="measure mt-6 text-sm leading-relaxed text-ink-2">
                {company.fullDescription}
              </p>
            )}

            <div className="mt-6 space-y-2 border-y border-line py-4 font-mono text-xs text-ink-soft">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="shrink-0" aria-hidden="true" />
                {company.cities.join(", ")}
              </div>
              <div className="flex items-center gap-2">
                <Users2 size={13} className="shrink-0" aria-hidden="true" />
                {company.target}
              </div>
              {company.duration && (
                <div className="flex items-center gap-2">
                  <Clock size={13} className="shrink-0" aria-hidden="true" />
                  {company.duration}
                </div>
              )}
            </div>

            {company.areas ? (
              <div className="mt-6 space-y-4">
                {company.areas.map((area) => (
                  <div
                    key={area.area}
                    className="rounded-panel border border-line bg-surface-inset p-4"
                  >
                    <h4 className="font-display text-base font-bold text-ink">
                      {area.area}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
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
                      <ArrowUpRight size={15} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : company.status === "em-breve" ? (
              <p className="mt-7 w-full rounded-panel border border-dashed border-signal/40 bg-signal/8 px-4 py-3 text-center font-mono text-xs text-signal">
                {company.opensWhen ?? "Inscrições abrem em breve"}
              </p>
            ) : (
              company.link && (
                <Button
                  href={company.link}
                  external
                  variant="primary"
                  size="md"
                  className="mt-7 w-full"
                >
                  Aplicar
                  <ArrowUpRight size={15} />
                </Button>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
