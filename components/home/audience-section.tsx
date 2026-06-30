import { Building2, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function AudienceSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection y={32}>
          <GlassCard className="flex h-full flex-col gap-6 p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/15 text-lime">
              <GraduationCap size={22} />
            </div>
            <h3 className="font-display text-2xl font-bold text-offwhite sm:text-3xl">
              Para estudantes
            </h3>
            <p className="text-offwhite/65">
              Monte seu perfil uma vez, explore todas as oportunidades de
              summer internship reunidas em um só lugar e candidate-se com um
              clique.
            </p>
            <Button href="/cadastro/aluno" className="mt-auto w-fit">
              Criar perfil de estudante
            </Button>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection y={32} delay={0.1}>
          <GlassCard className="flex h-full flex-col gap-6 p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/20 text-purple-soft">
              <Building2 size={22} />
            </div>
            <h3 className="font-display text-2xl font-bold text-offwhite sm:text-3xl">
              Para empresas
            </h3>
            <p className="text-offwhite/65">
              Publique seu programa de summer internship e receba
              candidaturas qualificadas de universitários de todo o Brasil.
            </p>
            <Button
              href="/cadastro/empresa"
              variant="outline"
              className="mt-auto w-fit"
            >
              Cadastrar empresa
            </Button>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
