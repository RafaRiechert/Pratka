import { MapPin, Link2, RefreshCw } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import CountUp from "@/components/ui/count-up";
import { cities, companies } from "@/lib/companies";

/**
 * Every figure here is derived from lib/companies, so the strip cannot drift
 * out of step with the listing. Nothing is hardcoded.
 */

/** Distinct companies, which is what the label claims. Not programmes. */
const companyCount = companies.length;

/** Cities that actually appear in the data, shortened for the tile. */
const CITY_SHORT: Record<string, string> = {
  "São Paulo": "SP",
  "Rio de Janeiro": "RJ",
};
const coverage = cities.map((c) => CITY_SHORT[c] ?? c).join(" & ");

/**
 * Baked at build time, which — for a static export redeployed on every
 * push — is the honest answer to "when was this last updated". There is no
 * per-programme date field in the data to derive anything finer from.
 */
const buildDate = new Date();
const lastUpdated = `${new Intl.DateTimeFormat("pt-BR", { month: "short" })
  .format(buildDate)
  .replace(".", "")}/${buildDate.getFullYear()}`;

export default function StatsBar() {
  return (
    <section className="relative -mt-16 px-6">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl px-8 py-10 shadow-card sm:grid-cols-4">
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-tangerine-deep sm:text-5xl">
              {/* The "+" only makes sense alongside a real count. */}
              <CountUp value={companyCount} suffix={companyCount > 0 ? "+" : ""} />
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              {companyCount === 1 ? "empresa mapeada" : "empresas mapeadas"}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-tangerine-deep sm:text-3xl">
              <MapPin size={22} className="shrink-0" aria-hidden="true" />
              {coverage}
            </div>
            <p className="mt-2 text-sm text-ink-soft">cobertura principal</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-tangerine-deep sm:text-3xl">
              <Link2 size={22} className="shrink-0" aria-hidden="true" />
              Oficiais
            </div>
            <p className="mt-2 text-sm text-ink-soft">links para inscrição</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-tangerine-deep sm:text-3xl">
              <RefreshCw size={22} className="shrink-0" aria-hidden="true" />
              {lastUpdated}
            </div>
            <p className="mt-2 text-sm text-ink-soft">última atualização</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
