"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { uploadCv } from "@/lib/supabase/storage";
import { Input, Select } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";

const EDUCATION_LEVELS = [
  "Ensino Médio",
  "Graduação",
  "Pós-graduação",
  "Mestrado",
  "Doutorado",
];

export default function AlunoDados() {
  const { user, studentProfile, refreshProfile } = useAuth();
  const [supabase] = useState(() => createClient());
  const [form, setForm] = useState(() => ({
    name: studentProfile?.name ?? "",
    surname: studentProfile?.surname ?? "",
    country: studentProfile?.country ?? "",
    phone: studentProfile?.phone ?? "",
    city: studentProfile?.city ?? "",
    cpf: studentProfile?.cpf ?? "",
    linkedin_url: studentProfile?.linkedin_url ?? "",
    degree: studentProfile?.degree ?? "",
    school: studentProfile?.school ?? "",
    education_level: studentProfile?.education_level ?? "",
    university: studentProfile?.university ?? "",
    course: studentProfile?.course ?? "",
    graduation_year: studentProfile?.graduation_year?.toString() ?? "",
  }));
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);
    try {
      let cv_url = studentProfile?.cv_url ?? null;
      if (cvFile) cv_url = await uploadCv(user.id, cvFile);

      const { error } = await supabase
        .from("student_profiles")
        .update({
          ...form,
          graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
          cv_url,
        })
        .eq("id", user.id);

      if (error) throw error;
      await refreshProfile();
      setMessage({ type: "success", text: "Perfil atualizado com sucesso." });
    } catch {
      setMessage({ type: "error", text: "Não foi possível salvar suas alterações." });
    } finally {
      setSaving(false);
    }
  }

  if (!studentProfile?.profile_complete) {
    return (
      <GlassCard className="flex flex-col items-center gap-4 p-12 text-center">
        <p className="text-offwhite/65">Você ainda não completou seu perfil.</p>
        <Button href="/completar-perfil">Completar perfil</Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-7 sm:p-9">
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nome">
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
          </Field>
          <Field label="Sobrenome">
            <Input value={form.surname} onChange={(e) => update("surname", e.target.value)} />
          </Field>
        </div>
        <Field label="E-mail">
          <Input value={user?.email ?? ""} disabled />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="País">
            <Input value={form.country} onChange={(e) => update("country", e.target.value)} />
          </Field>
          <Field label="Telefone">
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cidade">
            <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
          </Field>
          <Field label="CPF">
            <Input value={form.cpf} onChange={(e) => update("cpf", e.target.value)} />
          </Field>
        </div>
        <Field label="LinkedIn">
          <Input
            value={form.linkedin_url}
            onChange={(e) => update("linkedin_url", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Nível de ensino">
            <Select
              value={form.education_level}
              onChange={(e) => update("education_level", e.target.value)}
            >
              <option value="">Selecione</option>
              {EDUCATION_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Ano de formatura">
            <Input
              type="number"
              value={form.graduation_year}
              onChange={(e) => update("graduation_year", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Universidade">
            <Input
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
            />
          </Field>
          <Field label="Curso">
            <Input value={form.course} onChange={(e) => update("course", e.target.value)} />
          </Field>
        </div>
        <Field label="Instituição de ensino">
          <Input value={form.school} onChange={(e) => update("school", e.target.value)} />
        </Field>
        <Field label="Grau">
          <Input value={form.degree} onChange={(e) => update("degree", e.target.value)} />
        </Field>

        <Field label="Currículo (PDF)">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-navy-card/60 px-4 py-4 text-sm text-offwhite/60 transition-colors hover:border-lime/50">
            <Upload size={18} className="shrink-0 text-offwhite/40" />
            <span className="truncate">
              {cvFile?.name || "Currículo enviado — clique para substituir"}
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            />
          </label>
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
