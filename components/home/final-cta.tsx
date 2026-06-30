import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";
import GradientOrbs from "@/components/ui/gradient-orbs";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28">
      <GradientOrbs />
      <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-offwhite sm:text-5xl">
          Pronto para dar o <span className="text-gradient-lime">próximo passo</span>?
        </h2>
        <p className="mt-5 text-lg text-offwhite/65">
          Crie sua conta gratuitamente e comece agora — seja você um
          estudante ou uma empresa.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button href="/cadastro/aluno" size="lg">
              Sou estudante
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="/cadastro/empresa" variant="outline" size="lg">
              Sou empresa
            </Button>
          </Magnetic>
        </div>
      </AnimatedSection>
    </section>
  );
}
