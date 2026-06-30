"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

export default function EmpresaDados() {
  const { user, companyProfile, refreshProfile } = useAuth();
  const [supabase] = useState(() => createClient());
  const [form, setForm] = useState(() => ({
    company_name: companyProfile?.company_name ?? "",
    cnpj: companyProfile?.cnpj ?? "",
    contact_name: companyProfile?.contact_name ?? "",
    contact_role: companyProfile?.contact_role ?? "",
    contact_info: companyProfile?.contact_info ?? "",
    logo_url: companyProfile?.logo_url ?? "",
    description: companyProfile?.description ?? "",
    sector: companyProfile?.sector ?? "",
    website: companyProfile?.website ?? "",
    program_city: companyProfile?.program_city ?? "",
    program_state: companyProfile?.program_state ?? "",
    summer_period: companyProfile?.summer_period ?? "",
    program_areas: companyProfile?.program_areas ?? "",
    is_paid: companyProfile?.is_paid ?? false,
    stipend_amount: companyProfile?.stipend_amount ?? "",
    requirements: companyProfile?.requirements ?? "",
  }));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("company_profiles")
      .update({
        ...form,
        stipend_amount: form.is_paid ? form.stipend_amount : null,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      setMessage({ type: "error", text: "Não foi possível salvar as alterações." });
    } else {
      await refreshProfile();
      setMessage({ type: "success", text: "Dados atualizados com sucesso." });
    }
  }

  return (
    <GlassCard className="p-7 sm:p-9">
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Razão social">
            <Input
              value={form.company_name}
              onChange={(e) => update("company_name", e.target.value)}
            />
          </Field>
          <Field label="CNPJ">
            <Input value={form.cnpj} onChange={(e) => update("cnpj", e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nome do contato">
            <Input
              value={form.contact_name}
              onChange={(e) => update("contact_name", e.target.value)}
            />
          </Field>
          <Field label="Cargo do contato">
            <Input
              value={form.contact_role}
              onChange={(e) => update("contact_role", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Contato">
          <Input
            value={form.contact_info}
            onChange={(e) => update("contact_info", e.target.value)}
          />
        </Field>
        <Field label="URL do logo">
          <Input value={form.logo_url} onChange={(e) => update("logo_url", e.target.value)} />
        </Field>
        <Field label="Descrição">
          <Textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Setor">
            <Input value={form.sector} onChange={(e) => update("sector", e.target.value)} />
          </Field>
          <Field label="Site">
            <Input value={form.website} onChange={(e) => update("website", e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cidade">
            <Input
              value={form.program_city}
              onChange={(e) => update("program_city", e.target.value)}
            />
          </Field>
          <Field label="Estado">
            <Select
              value={form.program_state}
              onChange={(e) => update("program_state", e.target.value)}
            >
              <option value="">UF</option>
              {STATES.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Período do summer">
          <Input
            value={form.summer_period}
            onChange={(e) => update("summer_period", e.target.value)}
          />
        </Field>
        <Field label="Áreas do programa">
          <Input
            value={form.program_areas}
            onChange={(e) => update("program_areas", e.target.value)}
          />
        </Field>
        <label className="flex items-center gap-2.5 text-sm text-offwhite/75">
          <input
            type="checkbox"
            checked={form.is_paid}
            onChange={(e) => update("is_paid", e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-navy-card accent-lime"
          />
          Programa remunerado
        </label>
        {form.is_paid && (
          <Field label="Valor da bolsa">
            <Input
              value={form.stipend_amount}
              onChange={(e) => update("stipend_amount", e.target.value)}
            />
          </Field>
        )}
        <Field label="Requisitos gerais">
          <Textarea
            value={form.requirements}
            onChange={(e) => update("requirements", e.target.value)}
          />
        </Field>

        {message && (
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
              message.type === "success"
                ? "bg-lime/10 text-lime"
                : "bg-danger/10 text-danger"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {message.text}
          </div>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </GlassCard>
  );
}
