import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import AnimatedSection from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Sobre — Pratka",
};

const sobreParagraphs = [
  `O mercado de trabalho começa antes da formatura. Cada verão é uma janela de oportunidade — e a Pratka existe para garantir que nenhum universitário brasileiro perca essa janela por falta de acesso à informação. Reunimos em um só lugar o que antes estava disperso: todas as empresas que oferecem programas de summer internship no Brasil, com link direto para inscrição.`,
];

const quemSomosParagraphs = [
  `A Pratka nasceu de uma observação atenta. Seu fundador, ainda no ensino médio, acompanhou de perto a frustração de colegas universitários que tentavam, a cada verão, encontrar um programa de summer internship — e esbarravam sempre nas mesmas barreiras: cada empresa conduzia suas aplicações de forma isolada, em plataformas diferentes, com prazos diferentes, e não havia nenhum lugar onde o estudante pudesse ver todas as opções de uma só vez.`,
  `A solução era simples: criar esse lugar. Uma página só, com todas as oportunidades de summer do Brasil reunidas. Sem cadastro, sem processo seletivo próprio — apenas a informação que o estudante precisa, no formato mais direto possível.`,
];

export default function SobrePage() {
  return (
    <>
      <PageHero eyebrow="Nossa história" title="Sobre" />

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <AnimatedSection className="mb-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Sobre
          </h2>
        </AnimatedSection>
        <div className="space-y-6">
          {sobreParagraphs.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-ink/75">{p}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-28">
        <AnimatedSection className="mb-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Quem somos nós
          </h2>
        </AnimatedSection>
        <div className="space-y-6">
          {quemSomosParagraphs.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-ink/75">{p}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
