"use client";

import { Banknote, Calendar, MapPin, Users2 } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CompanyListItem } from "@/lib/types";

export default function CompanyCard({
  company,
  applied,
  applying,
  onApply,
  onDetails,
}: {
  company: CompanyListItem;
  applied: boolean;
  applying: boolean;
  onApply: () => void;
  onDetails: () => void;
}) {
  const areas = (company.program_areas ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  return (
    <GlassCard interactive className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-purple/20 text-lg font-bold text-purple-soft">
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
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-bold text-offwhite">
            {company.company_name}
          </h3>
          <p className="text-sm text-offwhite/55">{company.sector}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {company.is_paid && <Tag variant="lime">Remunerado</Tag>}
        {(company.num_openings ?? 0) > 0 && (
          <Tag variant="purple">Vagas abertas</Tag>
        )}
        {company.isNew && <Tag variant="lime">Novo</Tag>}
      </div>

      <div className="space-y-2 text-sm text-offwhite/65">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="shrink-0 text-offwhite/40" />
          <span className="truncate">
            {company.program_city}
            {company.program_state ? `, ${company.program_state}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={15} className="shrink-0 text-offwhite/40" />
          <span className="truncate">{company.summer_period}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users2 size={15} className="shrink-0 text-offwhite/40" />
          <span className="truncate">
            {company.num_openings ?? 0} vaga
            {(company.num_openings ?? 0) === 1 ? "" : "s"}
          </span>
        </div>
        {company.is_paid && company.stipend_amount && (
          <div className="flex items-center gap-2">
            <Banknote size={15} className="shrink-0 text-offwhite/40" />
            <span className="truncate">{company.stipend_amount}</span>
          </div>
        )}
      </div>

      {areas.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {areas.slice(0, 3).map((area) => (
            <span
              key={area}
              className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-offwhite/60"
            >
              {area}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onDetails}>
          Mais informações
        </Button>
        <Button
          variant={applied ? "ghost" : "primary"}
          size="sm"
          className="flex-1"
          disabled={applied || applying}
          onClick={onApply}
        >
          {applied ? "Candidatura enviada ✓" : applying ? "Enviando..." : "Quero aplicar"}
        </Button>
      </div>
    </GlassCard>
  );
}
