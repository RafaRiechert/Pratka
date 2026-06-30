import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import AnimatedSection from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Quem somos nós — Pratka",
};

const paragraphs = [
  `A Pratka nasceu de uma observação atenta. Seu fundador, ainda no ensino médio, acompanhou de perto a frustração de collegas universitários que tentavam, a cada verão, encontrar um programa de summer internship — e sempre se encontravam nas mesmas barreiras: cada empresa conduzia suas aplicações de forma isolada, em plataformas diferentes, com prazos diferentes, processos pouco transparentes, e pricipalmente, não havia nenhum lugar onde o estudante pudesse ver, de uma só vez, quais empresas ofereciam essa oportunidade e se candidatar de forma simples.`,
  `Foi dessa problema que surgiu uma convicção: isso precisava mudar.`,
  `Enxergar esse problema de fora, mas tão de perto, foi o que tornou tudo mais claro. As oportunidades existiam. Os talentos também. O que faltava era a ponte entre os dois. Foi dessa inquietação que nasceu a Pratka — uma startup brasileira com uma missão clara: tornar o acesso aos programas de summer internship mais justo, mais transparente e mais eficiente. Acreditamos que o primeiro passo de uma carreira extraordinária pode e deve estar ao alcance de qualquer universitário, independentemente de onde ele estuda ou de onde ele mora.`,
];

export default function QuemSomosNosPage() {
  return (
    <>
      <PageHero eyebrow="Nossa história" title="Quem somos nós" />
      <section className="mx-auto max-w-3xl px-6 pb-28">
        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-offwhite/80">{p}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
