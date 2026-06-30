"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";

export default function EmpresaVagas() {
  const { user, companyProfile, refreshProfile } = useAuth();
  const [supabase] = useState(() => createClient());
  const [openings, setOpenings] = useState(
    companyProfile?.num_openings?.toString() ?? "0"
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from("company_profiles")
      .update({ num_openings: Number(openings) || 0 })
      .eq("id", user.id);
    setSaving(false);
    if (!error) {
      await refreshProfile();
      setSaved(true);
    }
  }

  return (
    <GlassCard className="max-w-sm p-7">
      <form onSubmit={handleSave} className="space-y-4">
        <Field label="Número de vagas abertas">
          <Input
            type="number"
            min={0}
            value={openings}
            onChange={(e) => {
              setOpenings(e.target.value);
              setSaved(false);
            }}
          />
        </Field>
        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-lime/10 px-3 py-2.5 text-sm text-lime">
            <CheckCircle2 size={16} /> Atualizado com sucesso.
          </div>
        )}
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </GlassCard>
  );
}
