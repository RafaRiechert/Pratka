import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { CompanyListItem, CompanyProfile } from "@/lib/types";
import PageHero from "@/components/ui/page-hero";
import EmpresasClient from "@/components/empresas/empresas-client";

export const metadata: Metadata = {
  title: "Empresas — Pratka",
};

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

// Runs once per request in this Server Component — not subject to React
// Compiler re-render memoization, so wall-clock reads here are safe.
function withIsNew(companies: CompanyProfile[]): CompanyListItem[] {
  const now = Date.now();
  return companies.map((c) => ({
    ...c,
    isNew: !!c.created_at && now - new Date(c.created_at).getTime() < FOURTEEN_DAYS_MS,
  }));
}

export default async function EmpresasPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("company_profiles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const companies = withIsNew((data ?? []) as CompanyProfile[]);

  return (
    <>
      <PageHero
        eyebrow="Oportunidades"
        title="Empresas"
        description="Explore os programas de summer internship disponíveis e candidate-se em poucos cliques."
      />
      <EmpresasClient companies={companies} />
    </>
  );
}
