import AnimatedSection from "@/components/ui/animated-section";
import CountUp from "@/components/ui/count-up";

const stats = [
  { value: 3200, suffix: "+", label: "Estudantes cadastrados" },
  { value: 48, suffix: "+", label: "Empresas parceiras" },
  { value: 92, suffix: "%", label: "Taxa de resposta" },
];

export default function StatsBar() {
  return (
    <section className="relative -mt-16 px-6">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl px-8 py-10 shadow-card sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold text-lime sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-offwhite/60">{s.label}</p>
            </div>
          ))}
          <div className="text-center">
            <div className="font-display text-4xl font-extrabold text-lime sm:text-5xl">
              Jan–Mar
            </div>
            <p className="mt-2 text-sm text-offwhite/60">Temporada</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
