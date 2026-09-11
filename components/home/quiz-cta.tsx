import { Compass } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import { ArcField, Disc } from "@/components/ui/arc";
import { Button } from "@/components/ui/button";

/*
 * A chamada do quiz virou um bloco chapado de laranja queimado com texto
 * tinta (4.68 AA) — não mais um cartão de papel. É o acento quente da
 * página que aparece em tamanho grande sem precisar ser a seção inteira, e
 * o disco de areia atrás do ícone repete a curva do herói em miniatura.
 */
export default function QuizCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-4 pt-24">
      <AnimatedSection>
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-card bg-accent p-10 text-center text-ink shadow-block sm:flex-row sm:justify-between sm:text-left">
          <ArcField>
            <Disc tone="accent-soft" className="-right-16 -top-20 w-56" />
          </ArcField>

          <div className="relative z-10 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-surface text-accent-deep">
              <Compass size={22} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Não sabe por onde começar?
              </h3>
              <p className="mt-1.5 text-ink">
                Descubra qual área do mercado combina com você.
              </p>
            </div>
          </div>
          <Button
            href="/quiz"
            variant="secondary"
            size="md"
            className="relative z-10 shrink-0"
          >
            Fazer o quiz
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
