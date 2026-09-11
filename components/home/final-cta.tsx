import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";

export default function FinalCta() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-inverse py-28">
      <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold text-on-inverse sm:text-5xl">
          Conhece uma empresa que oferece summer e{" "}
          <span className="text-accent-emphasis">não está aqui</span>?
        </h2>
        <p className="mt-5 text-lg text-on-inverse/65">
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
