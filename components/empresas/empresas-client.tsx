"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { CompanyListItem } from "@/lib/types";
import { Stagger, StaggerItem } from "@/components/ui/animated-section";
import CompanyCard from "@/components/empresas/company-card";
import CompanyDetailModal from "@/components/empresas/company-detail-modal";
import CompanyFilters, {
  EMPTY_FILTERS,
  type FilterState,
} from "@/components/empresas/company-filters";
import Toast, { type ToastState } from "@/components/ui/toast";

export default function EmpresasClient({
  companies,
}: {
  companies: CompanyListItem[];
}) {
  const router = useRouter();
  const { user, userType, studentProfile } = useAuth();
  const [supabase] = useState(() => createClient());
  const toastIdRef = useRef(0);

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [detailCompany, setDetailCompany] = useState<CompanyListItem | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!user || userType !== "aluno") {
      setAppliedIds(new Set());
      return;
    }
    supabase
      .from("applications")
      .select("company_id")
      .eq("student_id", user.id)
      .then(({ data }) => {
        setAppliedIds(new Set((data ?? []).map((r: { company_id: string }) => r.company_id)));
      });
  }, [user, userType, supabase]);

  const options = useMemo(() => {
    const areas = new Set<string>();
    const cities = new Set<string>();
    const periods = new Set<string>();
    const sectors = new Set<string>();
    companies.forEach((c) => {
      (c.program_areas ?? "")
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
        .forEach((a) => areas.add(a));
      if (c.program_city) cities.add(c.program_city);
      if (c.summer_period) periods.add(c.summer_period);
      if (c.sector) sectors.add(c.sector);
    });
    return {
      areas: [...areas].sort(),
      cities: [...cities].sort(),
      periods: [...periods].sort(),
      sectors: [...sectors].sort(),
    };
  }, [companies]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (filters.area && !(c.program_areas ?? "").includes(filters.area))
        return false;
      if (filters.city && c.program_city !== filters.city) return false;
      if (filters.period && c.summer_period !== filters.period) return false;
      if (filters.sector && c.sector !== filters.sector) return false;
      return true;
    });
  }, [companies, filters]);

  function showToast(message: string) {
    toastIdRef.current += 1;
    setToast({ id: toastIdRef.current, message });
  }

  async function handleApply(company: CompanyListItem) {
    // Scenario 1 — not logged in.
    if (!user) {
      router.push("/login?redirect=/empresas");
      return;
    }

    if (userType === "empresa") {
      showToast("Apenas estudantes podem se candidatar a programas.");
      return;
    }

    // Scenario 2 — logged in but profile incomplete (no CV uploaded yet).
    if (!studentProfile?.profile_complete) {
      router.push(`/completar-perfil?apply=${company.id}`);
      return;
    }

    // Scenario 3 — logged in with complete profile: one-click apply.
    setApplyingId(company.id);
    const { error } = await supabase.from("applications").insert({
      student_id: user.id,
      company_id: company.id,
    });
    setApplyingId(null);

    if (!error) {
      setAppliedIds((prev) => new Set(prev).add(company.id));
      showToast(
        "Sua candidatura foi enviada com sucesso! Acompanhe em Perfil > Suas aplicações."
      );
    } else {
      showToast("Não foi possível enviar sua candidatura. Tente novamente.");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <div className="mb-10">
        <CompanyFilters options={options} value={filters} onChange={setFilters} />
      </div>

      {filtered.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl px-8 py-20 text-center">
          <Building2 size={28} className="text-offwhite/30" />
          <p className="text-offwhite/60">
            {companies.length === 0
              ? "Nenhuma oportunidade disponível no momento. Volte em breve!"
              : "Nenhuma empresa encontrada com esses filtros."}
          </p>
        </div>
      ) : (
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <StaggerItem key={company.id}>
              <CompanyCard
                company={company}
                applied={appliedIds.has(company.id)}
                applying={applyingId === company.id}
                onApply={() => handleApply(company)}
                onDetails={() => setDetailCompany(company)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <CompanyDetailModal
        company={detailCompany}
        onClose={() => setDetailCompany(null)}
        applied={detailCompany ? appliedIds.has(detailCompany.id) : false}
        applying={detailCompany ? applyingId === detailCompany.id : false}
        onApply={() => detailCompany && handleApply(detailCompany)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}
