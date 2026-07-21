import { MapPin, Link2, RefreshCw } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import CountUp from "@/components/ui/count-up";
import { companies } from "@/lib/companies";

const companyCount = Math.floor(companies.length / 5) * 5;

export default function StatsBar() {
  return (
    <section className="relative -mt-16 px-6">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="panel grid grid-cols-2 divide-x divide-y divide-line rounded-lg shadow-card sm:grid-cols-4 sm:divide-y-0">
          <div className="px-8 py-10 text-center">
            <div className="font-mono text-4xl font-semibold text-signal sm:text-5xl">
              <CountUp value={companyCount} suffix="+" />
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-mist">
              empresas mapeadas
            </p>
          </div>

          <div className="px-8 py-10 text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-ink sm:text-3xl">
              <MapPin size={22} className="shrink-0 text-signal" />
              SP & RJ
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-mist">
              cobertura principal
            </p>
          </div>

          <div className="px-8 py-10 text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-ink sm:text-3xl">
              <Link2 size={22} className="shrink-0 text-signal" />
              Diretos
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-mist">
              links para inscrição
            </p>
          </div>

          <div className="px-8 py-10 text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-ink sm:text-3xl">
              <RefreshCw size={22} className="shrink-0 text-signal" />
              Sempre
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-mist">
              atualizado
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
