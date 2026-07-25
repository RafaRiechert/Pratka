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
import SeasonTabs from "@/components/empresas/season-tabs";
import type { Company, Sector, Season } from "@/lib/types";

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
  const [season, setSeason] = useState<Season>("verao-brasil");
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [detailCompany, setDetailCompany] = useState<Company | null>(null);

  const seasonCompanies = useMemo(
    () => allCompanies.filter((c) => c.seasons.includes(season)),
    [season]
  );

  const seasonSectors = useMemo(
    () => sectors.filter((s) => seasonCompanies.some((c) => c.sector === s)),
    [seasonCompanies]
  );
  const seasonCities = useMemo(
    () => cities.filter((city) => seasonCompanies.some((c) => c.cities.includes(city))),
    [seasonCompanies]
  );
  const seasonAudiences = useMemo(
    () => audiences.filter((a) => seasonCompanies.some((c) => c.audience === a)),
    [seasonCompanies]
  );

  // Drop any filter selection that no longer applies to the current season
  // (e.g. after switching tabs, or landing with a ?sector= that only exists
  // in the other season) instead of silently showing stale, empty results.
  useEffect(() => {
    setFilters((f) => ({
      sector: f.sector && seasonSectors.includes(f.sector) ? f.sector : "",
      city: f.city && seasonCities.includes(f.city) ? f.city : "",
      audience: f.audience && seasonAudiences.includes(f.audience) ? f.audience : "",
    }));
  }, [seasonSectors, seasonCities, seasonAudiences]);

  const filtered = useMemo(() => {
    return seasonCompanies.filter((c) => {
      if (filters.sector && c.sector !== filters.sector) return false;
      if (filters.city && !c.cities.includes(filters.city)) return false;
      if (filters.audience && c.audience !== filters.audience) return false;
      return true;
    });
  }, [seasonCompanies, filters]);

  return (
    <section id="empresas" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <Suspense fallback={null}>
        <SectorFromQuery
          onSector={(sector) => setFilters((f) => ({ ...f, sector }))}
        />
      </Suspense>

      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Programas de Summer Internship no Brasil
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          Todas as empresas que oferecem oportunidades de verão para
          universitários, atualizadas e com link direto.
        </p>
      </AnimatedSection>

      <div className="mt-10 flex justify-center">
        <SeasonTabs value={season} onChange={setSeason} />
      </div>

      <div className="mt-8 mb-10">
        <CompanyFilters
          sectors={seasonSectors}
          cities={seasonCities}
          audiences={seasonAudiences}
          value={filters}
          onChange={setFilters}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl px-8 py-20 text-center">
          <Building2 size={28} className="text-ink/30" />
          <p className="text-ink-soft">
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
