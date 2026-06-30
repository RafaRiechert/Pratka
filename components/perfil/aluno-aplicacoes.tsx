"use client";

import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { ApplicationWithCompany } from "@/lib/types";
import GlassCard from "@/components/ui/glass-card";
import Skeleton from "@/components/ui/skeleton";
import StatusBadge from "@/components/perfil/status-badge";
import { Button } from "@/components/ui/button";

export default function AlunoAplicacoes() {
  const { user } = useAuth();
  const [supabase] = useState(() => createClient());
  const [applications, setApplications] = useState<ApplicationWithCompany[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("applications")
      .select("*, company_profiles(*)")
      .eq("student_id", user.id)
      .order("applied_at", { ascending: false })
      .then(({ data }) =>
        setApplications((data ?? []) as unknown as ApplicationWithCompany[])
      );
  }, [user, supabase]);

  if (applications === null) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <GlassCard className="flex flex-col items-center gap-4 p-12 text-center">
        <Inbox size={26} className="text-offwhite/30" />
        <p className="text-offwhite/60">
          Você ainda não se candidatou a nenhum programa.
        </p>
        <Button href="/empresas" size="sm">
          Ver oportunidades
        </Button>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <GlassCard
          key={app.id}
          className="flex flex-wrap items-center justify-between gap-4 p-5"
        >
          <div>
            <h3 className="font-display text-base font-bold text-offwhite">
              {app.company_profiles?.company_name}
            </h3>
            <p className="text-sm text-offwhite/55">
              Candidatura enviada em{" "}
              {new Date(app.applied_at).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <StatusBadge status={app.status} />
        </GlassCard>
      ))}
    </div>
  );
}
