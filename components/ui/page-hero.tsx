import AnimatedSection from "@/components/ui/animated-section";
import { Arch, ArcField, Ring } from "@/components/ui/arc";

/**
 * O herói das páginas internas. Mesma gramática do herói da home — bloco de
 * areia, arco grande, manchete display — em escala reduzida, para que
 * /sobre, /quiz, /login e /cadastro cheguem obviamente do mesmo lugar.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero py-24 sm:py-28">
      <ArcField>
        {/*
          A coluna de texto aqui é centralizada e ocupa a largura inteira
          abaixo de ~900px, então a curva que passa POR TRÁS dela é tonal
          (areia escura: ink 12.9, ink-soft 5.70, accent-deep 4.71 — tudo AA).
          O acento saturado só aparece em xl, onde sobra margem de verdade.
        */}
        <Arch
          tone="surface-3"
          side="top"
          className="-left-[12%] bottom-0 h-40 w-[80vw] max-w-[34rem]"
        />
        <Ring
          tone="accent"
          weight={8}
          className="hidden xl:block xl:-right-[3%] xl:top-8 xl:w-[12vw] xl:max-w-[9rem]"
        />
      </ArcField>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          {eyebrow && (
            <span className="label-meta text-accent-deep">{eyebrow}</span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
              {description}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
