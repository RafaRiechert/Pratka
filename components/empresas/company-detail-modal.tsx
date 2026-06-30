"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Calendar,
  ExternalLink,
  MapPin,
  Users2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/badge";
import type { CompanyProfile } from "@/lib/types";

export default function CompanyDetailModal({
  company,
  onClose,
  applied,
  applying,
  onApply,
}: {
  company: CompanyProfile | null;
  onClose: () => void;
  applied: boolean;
  applying: boolean;
  onApply: () => void;
}) {
  return (
    <AnimatePresence>
      {company && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/80 px-4 py-10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8 shadow-card"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-purple/20 text-xl font-bold text-purple-soft">
                  {company.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={company.logo_url}
                      alt={company.company_name ?? "Logo"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (company.company_name ?? "?").charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-offwhite">
                    {company.company_name}
                  </h2>
                  <p className="text-sm text-offwhite/55">{company.sector}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="text-offwhite/50 hover:text-offwhite"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {company.is_paid && <Tag variant="lime">Remunerado</Tag>}
              {(company.num_openings ?? 0) > 0 && (
                <Tag variant="purple">Vagas abertas</Tag>
              )}
            </div>

            {company.description && (
              <p className="mt-6 leading-relaxed text-offwhite/75">
                {company.description}
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-offwhite/70">
                <MapPin size={16} className="text-offwhite/40" />
                {company.program_city}
                {company.program_state ? `, ${company.program_state}` : ""}
              </div>
              <div className="flex items-center gap-2 text-sm text-offwhite/70">
                <Calendar size={16} className="text-offwhite/40" />
                {company.summer_period}
              </div>
              <div className="flex items-center gap-2 text-sm text-offwhite/70">
                <Users2 size={16} className="text-offwhite/40" />
                {company.num_openings ?? 0} vagas
              </div>
              {company.is_paid && company.stipend_amount && (
                <div className="flex items-center gap-2 text-sm text-offwhite/70">
                  <Banknote size={16} className="text-offwhite/40" />
                  {company.stipend_amount}
                </div>
              )}
            </div>

            {company.program_areas && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-offwhite/45">
                  Áreas
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {company.program_areas
                    .split(",")
                    .map((a) => a.trim())
                    .filter(Boolean)
                    .map((area) => (
                      <span
                        key={area}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-offwhite/65"
                      >
                        {area}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {company.requirements && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-offwhite/45">
                  Requisitos
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-offwhite/70">
                  {company.requirements}
                </p>
              </div>
            )}

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-purple-soft hover:text-lime"
              >
                Visitar site <ExternalLink size={14} />
              </a>
            )}

            <div className="mt-8 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Fechar
              </Button>
              <Button
                className="flex-1"
                disabled={applied || applying}
                variant={applied ? "ghost" : "primary"}
                onClick={onApply}
              >
                {applied
                  ? "Candidatura enviada ✓"
                  : applying
                  ? "Enviando..."
                  : "Quero aplicar"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
