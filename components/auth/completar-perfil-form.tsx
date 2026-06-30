"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { uploadCv } from "@/lib/supabase/storage";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import AnimatedSection from "@/components/ui/animated-section";
import { StepperProgress, StepperSlide } from "@/components/auth/stepper";

const EDUCATION_LEVELS = [
  "Ensino Médio",
  "Graduação",
  "Pós-graduação",
  "Mestrado",
  "Doutorado",
];

const HOW_FOUND_OPTIONS = [
  "Instagram",
  "LinkedIn",
  "Indicação de um amigo",
  "Universidade",
  "Google",
  "Outro",
];

interface FormData {
  name: string;
  surname: string;
  country: string;
  phone: string;
  city: string;
  cpf: string;
  sexual_orientation: string;
  race_ethnicity: string;
  disability: string;
  linkedin_url: string;
  degree: string;
  school: string;
  education_level: string;
  university: string;
  course: string;
  graduation_year: string;
  how_found_pratka: string;
}

const INITIAL: FormData = {
  name: "",
  surname: "",
  country: "Brasil",
  phone: "",
  city: "",
  cpf: "",
  sexual_orientation: "",
  race_ethnicity: "",
  disability: "",
  linkedin_url: "",
  degree: "",
  school: "",
  education_level: "",
  university: "",
  course: "",
  graduation_year: "",
  how_found_pratka: "",
};

const TOTAL_STEPS = 4;

export default function CompletarPerfilForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applyCompanyId = searchParams.get("apply");
  const { user, studentProfile, loading: authLoading, refreshProfile } = useAuth();
  const [supabase] = useState(() => createClient());

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/completar-perfil");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (studentProfile) {
      setForm((prev) => ({
        ...prev,
        name: studentProfile.name ?? prev.name,
        surname: studentProfile.surname ?? prev.surname,
      }));
    }
  }, [studentProfile]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(): string | null {
    if (step === 0) {
      if (!form.name || !form.surname || !form.phone || !form.city || !form.cpf)
        return "Preencha todos os campos obrigatórios.";
    }
    if (step === 1) {
      if (!cvFile && !studentProfile?.cv_url) return "Faça o upload do seu currículo.";
    }
    if (step === 2) {
      if (!form.education_level || !form.university || !form.course)
        return "Preencha todos os campos obrigatórios.";
    }
    if (step === 3) {
      if (!form.how_found_pratka) return "Selecione uma opção.";
    }
    return null;
  }

  function goNext() {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setError(null);
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let cvUrl = studentProfile?.cv_url ?? null;
      if (cvFile) {
        cvUrl = await uploadCv(user.id, cvFile);
      }

      const { error: updateError } = await supabase
        .from("student_profiles")
        .update({
          name: form.name,
          surname: form.surname,
          email: user.email,
          country: form.country,
          phone: form.phone,
          city: form.city,
          cpf: form.cpf,
          sexual_orientation: form.sexual_orientation || null,
          race_ethnicity: form.race_ethnicity || null,
          disability: form.disability || null,
          cv_url: cvUrl,
          linkedin_url: form.linkedin_url || null,
          degree: form.degree || null,
          school: form.school || null,
          education_level: form.education_level,
          university: form.university,
          course: form.course,
          graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
          how_found_pratka: form.how_found_pratka,
          profile_complete: true,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      if (applyCompanyId) {
        await supabase
          .from("applications")
          .insert({ student_id: user.id, company_id: applyCompanyId });
      }

      await refreshProfile();
      setDone(true);
    } catch {
      setError("Não foi possível salvar seu perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
        <AnimatedSection>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime/15 text-lime">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-offwhite">
            Perfil completo!
          </h1>
          <p className="mt-3 text-offwhite/65">
            {applyCompanyId
              ? "Sua candidatura foi enviada com sucesso! Acompanhe em Perfil > Suas aplicações."
              : "Seu perfil foi atualizado com sucesso."}
          </p>
          <Button href="/perfil/aluno" className="mt-8">
            Ir para o meu perfil
          </Button>
        </AnimatedSection>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <AnimatedSection className="text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
          Complete seu <span className="text-gradient-lime">perfil</span>
        </h1>
        <p className="mt-3 text-offwhite/60">
          {applyCompanyId
            ? "Falta pouco! Finalize seu perfil para enviar sua candidatura."
            : "Essas informações são enviadas para as empresas quando você se candidata."}
        </p>
      </AnimatedSection>

      <GlassCard className="mt-8 p-7 sm:p-9">
        <StepperProgress step={step} total={TOTAL_STEPS} />

        <form onSubmit={handleSubmit}>
          <StepperSlide stepKey={step} direction={direction}>
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Dados pessoais
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nome" required>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Sobrenome" required>
                    <Input
                      required
                      value={form.surname}
                      onChange={(e) => update("surname", e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="E-mail">
                  <Input value={user?.email ?? ""} disabled />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="País" required>
                    <Input
                      required
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                    />
                  </Field>
                  <Field label="Telefone" required>
                    <Input
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Cidade" required>
                    <Input
                      required
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </Field>
                  <Field label="CPF" required>
                    <Input
                      required
                      value={form.cpf}
                      onChange={(e) => update("cpf", e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </Field>
                </div>

                <p className="pt-2 text-xs font-medium uppercase tracking-wide text-offwhite/40">
                  Perguntas opcionais de diversidade
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Orientação sexual">
                    <Input
                      value={form.sexual_orientation}
                      onChange={(e) => update("sexual_orientation", e.target.value)}
                    />
                  </Field>
                  <Field label="Raça/etnia">
                    <Input
                      value={form.race_ethnicity}
                      onChange={(e) => update("race_ethnicity", e.target.value)}
                    />
                  </Field>
                  <Field label="Pessoa com deficiência">
                    <Input
                      value={form.disability}
                      onChange={(e) => update("disability", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Perfil profissional
                </h2>
                <Field label="Currículo (PDF)" required>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-navy-card/60 px-4 py-5 text-sm text-offwhite/60 transition-colors hover:border-lime/50">
                    <Upload size={18} className="shrink-0 text-offwhite/40" />
                    <span className="truncate">
                      {cvFile?.name ||
                        (studentProfile?.cv_url
                          ? "Currículo já enviado — clique para substituir"
                          : "Clique para selecionar um arquivo")}
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  {(cvFile || studentProfile?.cv_url) && (
                    <span className="mt-2 flex items-center gap-1.5 text-xs text-lime">
                      <FileText size={13} /> Arquivo pronto para envio
                    </span>
                  )}
                </Field>
                <Field label="LinkedIn" hint="Opcional">
                  <Input
                    value={form.linkedin_url}
                    onChange={(e) => update("linkedin_url", e.target.value)}
                    placeholder="https://linkedin.com/in/seu-perfil"
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Formação acadêmica
                </h2>
                <Field label="Nível de ensino" required>
                  <Select
                    required
                    value={form.education_level}
                    onChange={(e) => update("education_level", e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {EDUCATION_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Universidade" required>
                  <Input
                    required
                    value={form.university}
                    onChange={(e) => update("university", e.target.value)}
                  />
                </Field>
                <Field label="Instituição de ensino" hint="Opcional, se diferente">
                  <Input
                    value={form.school}
                    onChange={(e) => update("school", e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Curso" required>
                    <Input
                      required
                      value={form.course}
                      onChange={(e) => update("course", e.target.value)}
                      placeholder="Ex: Engenharia de Software"
                    />
                  </Field>
                  <Field label="Ano de formatura">
                    <Input
                      type="number"
                      value={form.graduation_year}
                      onChange={(e) => update("graduation_year", e.target.value)}
                      placeholder="2027"
                    />
                  </Field>
                </div>
                <Field label="Grau" hint="Opcional">
                  <Input
                    value={form.degree}
                    onChange={(e) => update("degree", e.target.value)}
                    placeholder="Ex: Bacharelado"
                  />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Como você conheceu a Pratka?
                </h2>
                <Field label="Selecione uma opção" required>
                  <Select
                    required
                    value={form.how_found_pratka}
                    onChange={(e) => update("how_found_pratka", e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {HOW_FOUND_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                </Field>
                {form.how_found_pratka === "Outro" && (
                  <Field label="Conte mais">
                    <Textarea
                      onChange={(e) => update("how_found_pratka", e.target.value)}
                    />
                  </Field>
                )}
              </div>
            )}
          </StepperSlide>

          {error && (
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="mt-7 flex gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={goBack}>
                <ArrowLeft size={16} /> Voltar
              </Button>
            )}
            {step < TOTAL_STEPS - 1 ? (
              <Button type="button" onClick={goNext} className="ml-auto">
                Continuar <ArrowRight size={16} />
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="ml-auto">
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Concluir"}
              </Button>
            )}
          </div>
        </form>
      </GlassCard>
    </section>
  );
}
