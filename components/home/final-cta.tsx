import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";

/**
 * O fecho do documento — e ele voltou para o PAPEL.
 *
 * Antes havia três blocos de tinta seguidos (Problema, este CTA e o
 * rodapé), e os dois últimos se fundiam numa massa escura de meia tela no
 * fim da página. O conceito editorial pede parcimônia com a tinta: a página
 * preta fica só em "O Problema", o rodapé fica escuro porque é colofão, e
 * esta chamada se resolve como se resolve num impresso — régua grossa,
 * manchete grande e uma caixa de tinta só no botão.
 */
export default function FinalCta() {
  return (
    <section className="bg-surface py-24">
      <AnimatedSection className="mx-auto max-w-4xl px-6">
        <div className="rule-section pt-8">
          <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,6.5vw,3.75rem)] font-semibold leading-[1.04] tracking-tight text-ink">
            Conhece uma empresa que oferece summer e{" "}
            <span className="text-accent-emphasis italic">não está aqui</span>?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Nos mande uma mensagem e a gente inclui.
          </p>
          <div className="mt-10">
            <Magnetic>
              <Button
                href="mailto:contato@pratka.com.br?subject=Sugest%C3%A3o%20de%20empresa"
                variant="secondary"
                size="lg"
              >
                Sugerir empresa
              </Button>
            </Magnetic>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
