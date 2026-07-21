"use client";

import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import { audiences, companies as allCompanies, sectors, cities } from "@/lib/companies";
import AnimatedSection, { Stagger, StaggerItem } from "@/components/ui/animated-section";
import CompanyCard from "@/components/empresas/company-card";
import CompanyDetailModal from "@/components/empresas/company-detail-modal";
import CompanyFilters, {
  EMPTY_FILTERS,
  type FilterState,
} from "@/components/empresas/company-filters";
import type { Company } from "@/lib/types";

export default function CompanyListing() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [detailCompany, setDetailCompany] = useState<Company | null>(null);

  const filtered = useMemo(() => {
    return allCompanies.filter((c) => {
      if (filters.sector && c.sector !== filters.sector) return false;
      if (filters.city && !c.cities.includes(filters.city)) return false;
      if (filters.audience && c.audience !== filters.audience) return false;
      return true;
    });
  }, [filters]);

  return (
    <section id="empresas" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Programas de Summer Internship no Brasil
        </h2>
        <p className="mt-5 text-lg text-ink/65">
          Todas as empresas que oferecem oportunidades de verão para
          universitários, atualizadas e com link direto.
        </p>
      </AnimatedSection>

      <div className="mt-12 mb-10">
        <CompanyFilters
          sectors={sectors}
          cities={cities}
          audiences={audiences}
          value={filters}
          onChange={setFilters}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="panel flex flex-col items-center gap-3 rounded-[28px] px-8 py-20 text-center shadow-brutal">
          <Building2 size={28} className="text-ink/30" />
          <p className="text-ink/60">
            Nenhuma empresa encontrada com esses filtros.
          </p>
        </div>
      ) : (
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <StaggerItem key={company.id}>
              <CompanyCard
                company={company}
                onDetails={() => setDetailCompany(company)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <CompanyDetailModal
        company={detailCompany}
        onClose={() => setDetailCompany(null)}
      />
    </section>
  );
}
