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

  // Always derived straight from the full company list — never from a
  // previously filtered array — so switching seasons or filters can only
  // narrow things down from the complete set, never compound on stale data.
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

  // A filter selection from a previous season (or from the quiz's ?sector=
  // deep link) might not apply to the season currently on screen. Rather
  // than reset it via a separate effect — which can race with the query
  // param being applied — just ignore it wherever it's stale. This keeps
  // filtering a pure, single-pass derivation over the full season list.
  const activeFilters: FilterState = useMemo(
    () => ({
      sector: filters.sector && seasonSectors.includes(filters.sector) ? filters.sector : "",
      city: filters.city && seasonCities.includes(filters.city) ? filters.city : "",
      audience:
        filters.audience && seasonAudiences.includes(filters.audience)
          ? filters.audience
          : "",
    }),
    [filters, seasonSectors, seasonCities, seasonAudiences]
  );

  const filtered = useMemo(() => {
    return seasonCompanies.filter((c) => {
      if (activeFilters.sector && c.sector !== activeFilters.sector) return false;
      if (activeFilters.city && !c.cities.includes(activeFilters.city)) return false;
      if (activeFilters.audience && c.audience !== activeFilters.audience) return false;
      return true;
    });
  }, [seasonCompanies, activeFilters]);

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
          value={activeFilters}
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
        <Stagger
          scrollTrigger={false}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
