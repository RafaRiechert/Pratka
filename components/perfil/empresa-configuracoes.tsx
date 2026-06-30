"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PauseCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";

export default function EmpresaConfiguracoes() {
  const router = useRouter();
  const { user, companyProfile, refreshProfile, signOut } = useAuth();
  const [supabase] = useState(() => createClient());
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEndProgram() {
    if (!user) return;
    setLoading(true);
    await supabase.from("company_profiles").update({ is_active: false }).eq("id", user.id);
    await supabase
      .from("applications")
      .update({ status: "programa_encerrado" })
      .eq("company_id", user.id);
    setLoading(false);
    setConfirmEnd(false);
    await refreshProfile();
  }

  async function handleDeleteAccount() {
    setLoading(true);
    const res = await fetch("/api/account/delete-company", { method: "POST" });
    setLoading(false);
    setConfirmDelete(false);
    if (res.ok) {
      await signOut();
      router.push("/");
    }
  }

  return (
    <div className="space-y-4">
      <GlassCard className="flex flex-wrap items-center justify-between gap-4 p-7">
        <div>
          <h3 className="font-display text-base font-bold text-offwhite">
            Encerrar programa
          </h3>
          <p className="mt-1 text-sm text-offwhite/60">
            {companyProfile?.is_active
              ? "Remove sua vaga da página de Empresas. Candidatos verão o status “Programa encerrado”."
              : "Seu programa já está encerrado."}
          </p>
        </div>
        <Button
          variant="outline"
          disabled={!companyProfile?.is_active}
          onClick={() => setConfirmEnd(true)}
        >
          <PauseCircle size={16} /> Encerrar
        </Button>
      </GlassCard>

      <GlassCard className="flex flex-wrap items-center justify-between gap-4 p-7">
        <div>
          <h3 className="font-display text-base font-bold text-offwhite">
            Excluir minha conta
          </h3>
          <p className="mt-1 text-sm text-offwhite/60">
            Remove permanentemente sua empresa da Pratka.
          </p>
        </div>
        <Button variant="danger" onClick={() => setConfirmDelete(true)}>
          <Trash2 size={16} /> Excluir conta
        </Button>
      </GlassCard>

      <ConfirmModal
        open={confirmEnd}
        title="Encerrar programa?"
        description="Sua vaga deixará de aparecer para os estudantes. Candidatos que já se aplicaram verão o status “Programa encerrado”."
        confirmLabel="Encerrar"
        loading={loading}
        onConfirm={handleEndProgram}
        onCancel={() => setConfirmEnd(false)}
      />
      <ConfirmModal
        open={confirmDelete}
        title="Excluir minha conta?"
        description="Tem certeza? Todos os dados e candidaturas serão permanentemente removidos."
        confirmLabel="Excluir conta"
        loading={loading}
        onConfirm={handleDeleteAccount}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
