import AnimatedSection from "@/components/ui/animated-section";
import { Arch, ArcField, Ring } from "@/components/ui/arc";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";

/*
 * O último bloco antes do rodapé: campo de tinta com o sol laranja nascendo
 * pela borda inferior. Sobre tinta o acento inverte para o laranja claro
 * (8.81 AA) — o laranja escuro que serve sobre areia encostaria no preto.
 */
export default function FinalCta() {
  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-inverse py-28"
    >
      <ArcField>
        {/* Altura fixa e recorte pela base: o sol nasce sempre com os mesmos
            6rem visíveis, de 360px a 1440px, sem chegar perto do texto. */}
        <Arch
          tone="accent"
          side="top"
          className="-bottom-24 left-1/2 h-48 w-[150vw] max-w-[48rem] -translate-x-1/2"
        />
        <Ring
          tone="inverse-2"
          weight={16}
          className="-left-[14%] -top-[24%] w-[40vw] max-w-[22rem]"
        />
      </ArcField>

      <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold text-on-inverse sm:text-5xl">
          Conhece uma empresa que oferece summer e{" "}
          <span className="text-accent-emphasis-inverse">não está aqui</span>?
        </h2>
        <p className="mt-5 text-lg text-on-inverse/75">
          Nos mande uma mensagem e a gente inclui.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button
              href="mailto:contato@pratka.com.br?subject=Sugest%C3%A3o%20de%20empresa"
              variant="signal"
              size="lg"
            >
              Sugerir empresa
            </Button>
          </Magnetic>
        </div>
      </AnimatedSection>
    </section>
  );
}
