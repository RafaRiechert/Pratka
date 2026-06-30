import type { Metadata } from "next";
import { CircleAlert, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/page-hero";
import AnimatedSection from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Problema & Solução — Pratka",
};

const problemParagraphs = [
  `A cada verão, poucas empresas brasileiras oferecem programas de summer internship — e mesmo aquelas que oferecem raramente conseguem alcançar os estudantes que mais se beneficiariam dessa oportunidade. Para a grande maioria dos universitários, esse tipo de programa simplesmente não faz parte do horizonte, não por falta de interesse, mas por falta de informação.`,
  `O motivo é simples: não existe um lugar centralizado para isso. Cada empresa gerencia suas aplicações de forma independente, em plataformas próprias, com processos e prazos que o estudante só descobre se souber exatamente onde procurar. Não há um espaço único onde o universitário possa visualizar, de forma clara, todas as empresas que oferecem programas de summer internship e se candidatar a elas de maneira simples e direta.`,
  `Para quem não tem uma rede de contatos consolidada ou não frequenta os círculos certos, as chances de ficar de fora são ainda maiores. O acesso à informação, que deveria ser igual para todos, acaba sendo um privilégio de poucos.`,
  `O resultado é um desperdício enorme de potencial — de ambos os lados. Empresas que não encontram os candidatos ideais. Estudantes que não encontram as oportunidades que mereciam.`,
];

const solutionParagraphs = [
  `A Pratka centraliza o que sempre esteve disperso. O estudante cria seu perfil uma única vez e passa a ter acesso a todas as oportunidades de summer em um só lugar — com transparência sobre o processo e controle real sobre sua candidatura. As empresas, por sua vez, encontram candidatos qualificados de forma ágil, sem depender de divulgações fragmentadas ou processos onerosos.`,
  `Não reinventamos o processo seletivo. Nós simplesmente colocamos os dois lados certos no mesmo lugar, na hora certa.`,
];

export default function ProblemaSolucaoPage() {
  return (
    <>
      <PageHero eyebrow="Por que existimos" title="Problema & Solução" />

      <section className="border-b border-white/5 bg-navy-deep/60 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-offwhite/50">
              <CircleAlert size={20} />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-offwhite/90 sm:text-4xl">
              O Problema
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {problemParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-offwhite/60">{p}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(200,255,0,0.08),transparent_70%)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/15 text-lime">
              <Sparkles size={20} />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
              A <span className="text-gradient-lime">Solução</span>
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {solutionParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-offwhite/80">{p}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
