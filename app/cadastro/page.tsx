import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Cadastrar — Pratka",
};

export default function CadastroPage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center px-6 py-16">
      <AnimatedSection className="text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
          Criar conta na <span className="text-gradient-lime">Pratka</span>
        </h1>
        <p className="mt-4 text-offwhite/65">
          Escolha como você quer se cadastrar.
        </p>
      </AnimatedSection>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <AnimatedSection delay={0.05}>
          <Link href="/cadastro/aluno" className="block h-full">
            <GlassCard interactive className="flex h-full flex-col items-center gap-4 p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/15 text-lime">
                <GraduationCap size={26} />
              </div>
              <h2 className="font-display text-xl font-bold text-offwhite">
                Sou estudante
              </h2>
              <p className="text-sm text-offwhite/60">
                Crie seu perfil e candidate-se a programas de summer internship.
              </p>
            </GlassCard>
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Link href="/cadastro/empresa" className="block h-full">
            <GlassCard interactive className="flex h-full flex-col items-center gap-4 p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/20 text-purple-soft">
                <Building2 size={26} />
              </div>
              <h2 className="font-display text-xl font-bold text-offwhite">
                Sou empresa
              </h2>
              <p className="text-sm text-offwhite/60">
                Publique seu programa e receba candidaturas qualificadas.
              </p>
            </GlassCard>
          </Link>
        </AnimatedSection>
      </div>

      <p className="mt-8 text-center text-sm text-offwhite/55">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-lime hover:underline">
          Entrar
        </Link>
      </p>
    </section>
  );
}
