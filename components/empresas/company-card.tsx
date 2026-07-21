import { ArrowUpRight, MapPin, Users2 } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";

export default function CompanyCard({
  company,
  onDetails,
}: {
  company: Company;
  onDetails: () => void;
}) {
  return (
    <GlassCard interactive className="flex h-full flex-col gap-5 p-6">
      <div>
        <h3 className="font-display text-lg font-bold text-ink">
          {company.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Tag variant="lavender">{company.sector}</Tag>
          <Tag variant="pink">{company.type}</Tag>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink/65">
        {company.shortDescription}
      </p>

      <div className="space-y-2 text-sm text-ink/60">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="shrink-0 text-ink/40" />
          <span className="truncate">{company.cities.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users2 size={15} className="shrink-0 text-ink/40" />
          <span className="truncate">{company.target}</span>
        </div>
      </div>

      <div className="mt-auto flex gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onDetails}>
          Mais informações
        </Button>
        <Button
          href={company.link}
          external
          variant="primary"
          size="sm"
          className="flex-1"
        >
          Aplicar
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </GlassCard>
  );
}
