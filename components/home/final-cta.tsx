import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";

/**
 * Volta ao terminal. Depois do bloco claro do FAQ, o CTA final é escuro de
 * novo: fecha o arco com o herói, dá o contraste que um pedido de ação
 * precisa e emenda no rodapé sem uma terceira troca de polo.
 */
export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-hero py-24">
      <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-7 block h-0.5 w-12 bg-accent-deep"
        />
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Conhece uma empresa que oferece summer e{" "}
          <span className="text-accent-emphasis">não está aqui</span>?
        </h2>
        <p className="measure mx-auto mt-5 text-lg text-ink-soft">
          Nos mande uma mensagem e a gente inclui.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button href="mailto:contato@pratka.com.br?subject=Sugest%C3%A3o%20de%20empresa" size="lg">
              Sugerir empresa
            </Button>
          </Magnetic>
        </div>
      </AnimatedSection>
    </section>
  );
}
