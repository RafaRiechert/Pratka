"use client";

import { useEffect, useState } from "react";
import { Download, Inbox } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { ApplicationStatus, ApplicationWithStudent } from "@/lib/types";
import GlassCard from "@/components/ui/glass-card";
import { Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "enviada", label: "Enviada" },
  { value: "em_analise", label: "Em análise" },
  { value: "nao_selecionado", label: "Não selecionado" },
];

export default function EmpresaAplicacoes() {
  const { user } = useAuth();
  const [supabase] = useState(() => createClient());
  const [applications, setApplications] = useState<ApplicationWithStudent[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("applications")
      .select("*, student_profiles(*)")
      .eq("company_id", user.id)
      .order("applied_at", { ascending: false })
      .then(({ data }) =>
        setApplications((data ?? []) as unknown as ApplicationWithStudent[])
      );
  }, [user, supabase]);

  async function handleStatusChange(appId: string, status: ApplicationStatus) {
    await supabase.from("applications").update({ status }).eq("id", appId);
    setApplications(
      (prev) => prev?.map((a) => (a.id === appId ? { ...a, status } : a)) ?? null
    );
  }

  async function handleDownloadCv(path: string | null | undefined) {
    if (!path) return;
    const { data } = await supabase.storage.from("cvs").createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  if (applications === null) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <GlassCard className="flex flex-col items-center gap-3 p-12 text-center">
        <Inbox size={26} className="text-offwhite/30" />
        <p className="text-offwhite/60">Nenhuma candidatura recebida ainda.</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => {
        const s = app.student_profiles;
        return (
          <GlassCard
            key={app.id}
            className="flex flex-wrap items-center justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-offwhite">
                {s?.name} {s?.surname}
              </h3>
              <p className="text-sm text-offwhite/55">
                {s?.email} {s?.phone ? `· ${s.phone}` : ""}
              </p>
              <p className="text-sm text-offwhite/55">
                {s?.university} {s?.course ? `· ${s.course}` : ""}{" "}
                {s?.graduation_year ? `· ${s.graduation_year}` : ""}
              </p>
              {s?.linkedin_url && (
                <a
                  href={s.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-purple-soft hover:text-lime"
                >
                  LinkedIn
                </a>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={app.status}
                disabled={app.status === "programa_encerrado"}
                onChange={(e) =>
                  handleStatusChange(app.id, e.target.value as ApplicationStatus)
                }
                className="w-auto"
              >
                {app.status === "programa_encerrado" && (
                  <option value="programa_encerrado">Programa encerrado</option>
                )}
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadCv(s?.cv_url)}
              >
                <Download size={15} /> CV
              </Button>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
