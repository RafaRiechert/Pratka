import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import AnimatedSection from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Sobre — Pratka",
};

const sobreParagraphs = [
  `O mercado de trabalho não começa na formatura — começa muito antes. Cada verão é uma janela de oportunidade que pode redefinir uma trajetória inteira — e a Pratka existe para garantir que nenhum universitário brasileiro perca essa janela por falta de acesso à informação.`,
  `Somos um diretório curado e atualizado de todos os programas de summer internship disponíveis no Brasil, voltado para universitários que querem dar o primeiro passo em direção a uma carreira extraordinária. Reunimos em um só lugar o que antes exigia horas de pesquisa dispersa — e entregamos com um clique.`,
];

const quemSomosParagraphs = [
  `A Pratka nasceu de uma observação atenta. Seu fundador, ainda no ensino médio, acompanhou de perto a frustração de colegas e familiares universitários que tentavam, a cada verão, encontrar um programa de summer internship — e esbarravam sempre nas mesmas barreiras: cada empresa conduzia suas aplicações de forma isolada, em plataformas diferentes, com prazos diferentes, e não havia absolutamente nenhum lugar onde o estudante pudesse ver todas as opções de uma só vez.`,
  `Foi dessa observação que surgiu uma convicção simples: isso precisava mudar. A resposta não deveria ser mais uma plataforma complexa com dezenas de funcionalidades — mas sim o básico, bem feito: todas as oportunidades reunidas, com informação clara e link direto. A ponte que faltava entre o talento e a oportunidade.`,
  `A Pratka é uma startup brasileira com uma missão clara: democratizar o acesso aos programas de summer internship. Acreditamos que o primeiro passo de uma carreira extraordinária deve estar ao alcance de qualquer universitário, independentemente de onde ele estuda ou de onde ele mora.`,
];

export default function SobrePage() {
  return (
    <>
      <PageHero eyebrow="Nossa história" title="Sobre" />

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <AnimatedSection className="mb-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Sobre
          </h2>
        </AnimatedSection>
        <div className="space-y-6">
          {sobreParagraphs.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-ink/80">{p}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-28">
        <AnimatedSection className="mb-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Quem somos nós
          </h2>
        </AnimatedSection>
        <div className="space-y-6">
          {quemSomosParagraphs.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-ink/80">{p}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
