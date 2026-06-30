"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import AnimatedSection from "@/components/ui/animated-section";

export default function CadastroAlunoPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { user_type: "aluno" } },
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Não foi possível criar sua conta.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("student_profiles").insert({
      id: data.user.id,
      name,
      email,
      profile_complete: false,
    });

    setLoading(false);

    if (profileError) {
      setError("Conta criada, mas houve um erro ao salvar seu perfil.");
      return;
    }

    router.push("/empresas");
    router.refresh();
  }

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <AnimatedSection>
        <h1 className="text-center font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
          Crie sua conta de <span className="text-gradient-lime">estudante</span>
        </h1>
        <p className="mt-3 text-center text-sm text-offwhite/60">
          Leva menos de um minuto. Você completa o resto do perfil quando for
          se candidatar.
        </p>

        <GlassCard className="mt-8 p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nome completo" required>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </Field>
            <Field label="E-mail" required>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
              />
            </Field>
            <Field label="Senha" required>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>
            <Field label="Confirmar senha" required>
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Criar conta"}
            </Button>
          </form>
        </GlassCard>

        <p className="mt-6 text-center text-sm text-offwhite/55">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-lime hover:underline">
            Entrar
          </Link>
        </p>
      </AnimatedSection>
    </section>
  );
}
