import { MapPin, Link2, RefreshCw } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import CountUp from "@/components/ui/count-up";
import { companies } from "@/lib/companies";

const companyCount = Math.floor(companies.length / 5) * 5;

export default function StatsBar() {
  return (
    <section className="relative -mt-16 px-6">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl px-8 py-10 shadow-card sm:grid-cols-4">
          <div className="text-center">
            <div className="font-display text-4xl font-extrabold text-lime sm:text-5xl">
              <CountUp value={companyCount} suffix="+" />
            </div>
            <p className="mt-2 text-sm text-offwhite/60">empresas mapeadas</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-extrabold text-lime sm:text-3xl">
              <MapPin size={22} className="shrink-0" />
              SP & RJ
            </div>
            <p className="mt-2 text-sm text-offwhite/60">cobertura principal</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-extrabold text-lime sm:text-3xl">
              <Link2 size={22} className="shrink-0" />
              Diretos
            </div>
            <p className="mt-2 text-sm text-offwhite/60">links para inscrição</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-extrabold text-lime sm:text-3xl">
              <RefreshCw size={22} className="shrink-0" />
              Sempre
            </div>
            <p className="mt-2 text-sm text-offwhite/60">atualizado</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
