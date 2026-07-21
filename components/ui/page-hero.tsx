import AnimatedSection from "@/components/ui/animated-section";

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
    <section className="relative overflow-hidden bg-mesh py-24 sm:py-28">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-widest text-tangerine-deep">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
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
