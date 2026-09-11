"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Building2 } from "lucide-react";
import { audiences, cities, companies as allCompanies, sectors } from "@/lib/companies";
import AnimatedSection, { Stagger, StaggerItem } from "@/components/ui/animated-section";
import CompanyCard from "@/components/empresas/company-card";
import CompanyDetailModal from "@/components/empresas/company-detail-modal";
import CompanyFilters, {
  EMPTY_FILTERS,
  type FilterState,
} from "@/components/empresas/company-filters";
import type { Company, CompanyStatus, Sector } from "@/lib/types";
import { useSectorFilter } from "@/components/home/sector-filter-context";

function SectorFromQuery({ onSector }: { onSector: (sector: Sector) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sector = searchParams.get("sector");
    if (sector && (sectors as string[]).includes(sector)) {
      onSector(sector as Sector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function CompanyListing() {
  // Sector lives in shared state because "Descubra por área" drives the same
  // filter from further down the page; city and audience stay local.
  const { sector, setSector } = useSectorFilter();
  const [localFilters, setLocalFilters] = useState<FilterState>(EMPTY_FILTERS);

  const filters: FilterState = useMemo(
    () => ({ ...localFilters, sector }),
    [localFilters, sector]
  );

  const handleFilterChange = (next: FilterState) => {
    setSector(next.sector);
    setLocalFilters(next);
  };

  const [detailCompany, setDetailCompany] = useState<Company | null>(null);
  const [status, setStatus] = useState<CompanyStatus | "">("");

  const filtered = useMemo(() => {
    return allCompanies
      .filter((c) => {
        if (filters.sector && c.sector !== filters.sector) return false;
        if (filters.city && !c.cities.includes(filters.city)) return false;
        if (filters.audience && c.audience !== filters.audience) return false;
        if (status && c.status !== status) return false;
        return true;
      })
      // Quem pode receber uma inscrição hoje vem primeiro; dentro de cada
      // grupo a ordem da fonte é preservada.
      .sort((a, b) => Number(a.status === "em-breve") - Number(b.status === "em-breve"));
  }, [filters, status]);

  const counts = useMemo(
    () => ({
      todas: allCompanies.length,
      aberta: allCompanies.filter((c) => c.status === "aberta").length,
      "em-breve": allCompanies.filter((c) => c.status === "em-breve").length,
    }),
    []
  );

  const statusChips: { value: CompanyStatus | ""; label: string; count: number }[] = [
    { value: "", label: "Todas", count: counts.todas },
    { value: "aberta", label: "Abertas", count: counts.aberta },
    { value: "em-breve", label: "Em breve", count: counts["em-breve"] },
  ];

  return (
    <section id="empresas" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <Suspense fallback={null}>
        <SectorFromQuery onSector={(next) => setSector(next)} />
      </Suspense>

      <AnimatedSection>
        <h2 className="rule-section max-w-4xl pt-6 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
          Programas de Summer Internship no Brasil
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Todas as empresas que oferecem oportunidades de verão para
          universitários, atualizadas e com link direto.
        </p>
      </AnimatedSection>

      {/* Aba de arquivo: retângulo de fio, rótulo em caixa alta, contagem em
          mono. A selecionada é a única chapada de tinta. */}
      <div
        role="group"
        aria-label="Filtrar por status das inscrições"
        className="mt-10 flex flex-wrap gap-2 border-t border-line pt-8"
      >
        {statusChips.map((chip) => {
          const selected = status === chip.value;
          return (
            <button
              key={chip.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setStatus(chip.value)}
              className={`pop focus-ring label-meta inline-flex items-center gap-2 rounded-tag border px-3.5 py-2.5 ${
                selected
                  ? "border-ink bg-inverse text-on-inverse"
                  : "border-line-strong text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {chip.label}
              <span
                className={`font-mono tabular-nums ${
                  selected ? "text-on-inverse/75" : "text-ink-soft"
                }`}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 mb-12">
        <CompanyFilters
          sectors={sectors}
          cities={cities}
          audiences={audiences}
          value={filters}
          onChange={handleFilterChange}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-line-strong px-8 py-20 text-center">
          <Building2 size={26} className="text-ink-soft" aria-hidden="true" />
          <p className="text-ink-soft">
            Nenhuma empresa encontrada com esses filtros.
          </p>
        </div>
      ) : (
        <Stagger
          scrollTrigger={false}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
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
