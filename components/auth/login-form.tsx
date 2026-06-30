"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  Building2,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import AnimatedSection from "@/components/ui/animated-section";

type Tab = "aluno" | "empresa";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [supabase] = useState(() => createClient());

  const [tab, setTab] = useState<Tab>("aluno");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setError("Credenciais inválidas.");
      setLoading(false);
      return;
    }

    const userType = data.user.user_metadata?.user_type;
    setLoading(false);

    router.push(
      redirect || (userType === "empresa" ? "/perfil/empresa" : "/perfil/aluno")
    );
    router.refresh();
  }

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <AnimatedSection>
        <h1 className="text-center font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
          Entrar na <span className="text-gradient-lime">Pratka</span>
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setTab("aluno")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              tab === "aluno"
                ? "bg-lime text-navy-deep"
                : "text-offwhite/60 hover:text-offwhite"
            }`}
          >
            <GraduationCap size={16} /> Aluno
          </button>
          <button
            type="button"
            onClick={() => setTab("empresa")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              tab === "empresa"
                ? "bg-lime text-navy-deep"
                : "text-offwhite/60 hover:text-offwhite"
            }`}
          >
            <Building2 size={16} /> Empresa
          </button>
        </div>

        <GlassCard className="mt-6 p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="E-mail" required>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/30"
                />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                  placeholder="voce@email.com"
                />
              </div>
            </Field>
            <Field label="Senha" required>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/30"
                />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11"
                  placeholder="••••••••"
                />
              </div>
            </Field>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </GlassCard>

        <p className="mt-6 text-center text-sm text-offwhite/55">
          Não tem conta?{" "}
          <Link
            href={tab === "aluno" ? "/cadastro/aluno" : "/cadastro/empresa"}
            className="font-medium text-lime hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </AnimatedSection>
    </section>
  );
}
