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
    <section className="bg-grid relative overflow-hidden py-24 sm:py-28">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          {eyebrow && (
            <span className="font-mono text-sm font-medium uppercase tracking-widest text-signal">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-mist">
              {description}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
