"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import AnimatedSection from "@/components/ui/animated-section";
import { StepperProgress, StepperSlide } from "@/components/auth/stepper";

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

interface FormData {
  company_name: string;
  cnpj: string;
  corporate_email: string;
  password: string;
  confirmPassword: string;
  contact_name: string;
  contact_role: string;
  contact_info: string;
  logo_url: string;
  description: string;
  sector: string;
  website: string;
  program_city: string;
  program_state: string;
  summer_period: string;
  num_openings: string;
  program_areas: string;
  is_paid: boolean;
  stipend_amount: string;
  requirements: string;
}

const INITIAL: FormData = {
  company_name: "",
  cnpj: "",
  corporate_email: "",
  password: "",
  confirmPassword: "",
  contact_name: "",
  contact_role: "",
  contact_info: "",
  logo_url: "",
  description: "",
  sector: "",
  website: "",
  program_city: "",
  program_state: "",
  summer_period: "",
  num_openings: "",
  program_areas: "",
  is_paid: false,
  stipend_amount: "",
  requirements: "",
};

const TOTAL_STEPS = 4;

export default function CadastroEmpresaPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(): string | null {
    if (step === 0) {
      if (!form.company_name || !form.cnpj || !form.corporate_email || !form.password)
        return "Preencha todos os campos obrigatórios.";
      if (form.password !== form.confirmPassword) return "As senhas não coincidem.";
      if (form.password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    }
    if (step === 1) {
      if (!form.contact_name || !form.contact_role || !form.contact_info)
        return "Preencha todos os campos obrigatórios.";
    }
    if (step === 2) {
      if (!form.description || !form.sector) return "Preencha todos os campos obrigatórios.";
    }
    if (step === 3) {
      if (!form.program_city || !form.program_state || !form.summer_period || !form.num_openings)
        return "Preencha todos os campos obrigatórios.";
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

    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.corporate_email,
      password: form.password,
      options: { data: { user_type: "empresa" } },
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Não foi possível criar sua conta.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("company_profiles").insert({
      id: data.user.id,
      company_name: form.company_name,
      cnpj: form.cnpj,
      corporate_email: form.corporate_email,
      contact_name: form.contact_name,
      contact_role: form.contact_role,
      contact_info: form.contact_info,
      logo_url: form.logo_url || null,
      description: form.description,
      sector: form.sector,
      website: form.website || null,
      program_city: form.program_city,
      program_state: form.program_state,
      summer_period: form.summer_period,
      num_openings: Number(form.num_openings) || 0,
      program_areas: form.program_areas,
      is_paid: form.is_paid,
      stipend_amount: form.is_paid ? form.stipend_amount : null,
      requirements: form.requirements || null,
      is_active: true,
    });

    setLoading(false);

    if (profileError) {
      setError("Conta criada, mas houve um erro ao salvar o perfil da empresa.");
      return;
    }

    router.push("/perfil/empresa");
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <AnimatedSection className="text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
          Cadastre sua <span className="text-gradient-lime">empresa</span>
        </h1>
        <p className="mt-3 text-offwhite/60">
          Publique seu programa de summer internship em poucos minutos.
        </p>
      </AnimatedSection>

      <GlassCard className="mt-8 p-7 sm:p-9">
        <StepperProgress step={step} total={TOTAL_STEPS} />

        <form onSubmit={handleSubmit}>
          <StepperSlide stepKey={step} direction={direction}>
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Informações da empresa
                </h2>
                <Field label="Razão social" required>
                  <Input
                    required
                    value={form.company_name}
                    onChange={(e) => update("company_name", e.target.value)}
                  />
                </Field>
                <Field label="CNPJ" required>
                  <Input
                    required
                    value={form.cnpj}
                    onChange={(e) => update("cnpj", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </Field>
                <Field label="E-mail corporativo" required>
                  <Input
                    type="email"
                    required
                    value={form.corporate_email}
                    onChange={(e) => update("corporate_email", e.target.value)}
                  />
                </Field>
                <Field label="Senha" required>
                  <Input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                  />
                </Field>
                <Field label="Confirmar senha" required>
                  <Input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Pessoa de contato
                </h2>
                <Field label="Nome" required>
                  <Input
                    required
                    value={form.contact_name}
                    onChange={(e) => update("contact_name", e.target.value)}
                  />
                </Field>
                <Field label="Cargo" required>
                  <Input
                    required
                    value={form.contact_role}
                    onChange={(e) => update("contact_role", e.target.value)}
                    placeholder="Ex: Analista de RH"
                  />
                </Field>
                <Field label="Contato (e-mail ou telefone)" required>
                  <Input
                    required
                    value={form.contact_info}
                    onChange={(e) => update("contact_info", e.target.value)}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Perfil da empresa
                </h2>
                <Field label="URL do logo" hint="Opcional">
                  <Input
                    value={form.logo_url}
                    onChange={(e) => update("logo_url", e.target.value)}
                    placeholder="https://..."
                  />
                </Field>
                <Field label="Descrição" required>
                  <Textarea
                    required
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Conte sobre a cultura, valores e o que torna o programa especial."
                  />
                </Field>
                <Field label="Setor" required>
                  <Input
                    required
                    value={form.sector}
                    onChange={(e) => update("sector", e.target.value)}
                    placeholder="Ex: Tecnologia, Financeiro, Consultoria"
                  />
                </Field>
                <Field label="Site" hint="Opcional">
                  <Input
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    placeholder="https://..."
                  />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-offwhite">
                  Informações do programa
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Cidade" required>
                    <Input
                      required
                      value={form.program_city}
                      onChange={(e) => update("program_city", e.target.value)}
                    />
                  </Field>
                  <Field label="Estado" required>
                    <Select
                      required
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
                <Field label="Período do summer" required>
                  <Input
                    required
                    value={form.summer_period}
                    onChange={(e) => update("summer_period", e.target.value)}
                    placeholder="Ex: Janeiro a Março de 2027"
                  />
                </Field>
                <Field label="Número de vagas" required>
                  <Input
                    type="number"
                    min={0}
                    required
                    value={form.num_openings}
                    onChange={(e) => update("num_openings", e.target.value)}
                  />
                </Field>
                <Field label="Áreas do programa" hint="Separe por vírgula">
                  <Input
                    value={form.program_areas}
                    onChange={(e) => update("program_areas", e.target.value)}
                    placeholder="Ex: Engenharia, Produto, Dados"
                  />
                </Field>
                <label className="flex items-center gap-2.5 text-sm text-offwhite/75">
                  <input
                    type="checkbox"
                    checked={form.is_paid}
                    onChange={(e) => update("is_paid", e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-navy-card text-lime accent-lime"
                  />
                  Programa remunerado
                </label>
                {form.is_paid && (
                  <Field label="Valor da bolsa/remuneração">
                    <Input
                      value={form.stipend_amount}
                      onChange={(e) => update("stipend_amount", e.target.value)}
                      placeholder="Ex: R$ 3.000/mês"
                    />
                  </Field>
                )}
                <Field label="Requisitos gerais" hint="Opcional">
                  <Textarea
                    value={form.requirements}
                    onChange={(e) => update("requirements", e.target.value)}
                  />
                </Field>
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
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "Finalizar cadastro"
                )}
              </Button>
            )}
          </div>
        </form>
      </GlassCard>

      <p className="mt-6 text-center text-sm text-offwhite/55">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-lime hover:underline">
          Entrar
        </Link>
      </p>
    </section>
  );
}
