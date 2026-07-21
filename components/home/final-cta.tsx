import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";
import GradientOrbs from "@/components/ui/gradient-orbs";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-28">
      <GradientOrbs />
      <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-paper sm:text-5xl">
          Conhece uma empresa que oferece summer e{" "}
          <span className="text-gradient-pop">não está aqui</span>?
        </h2>
        <p className="mt-5 text-lg text-paper/65">
          Nos mande uma mensagem e a gente inclui.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button
              href="mailto:contato@pratka.com.br?subject=Sugest%C3%A3o%20de%20empresa"
              size="lg"
              className="shadow-brutal-paper hover:shadow-[9px_9px_0_0_var(--color-paper)]"
            >
              Sugerir empresa
            </Button>
          </Magnetic>
        </div>
      </AnimatedSection>
    </section>
  );
}
