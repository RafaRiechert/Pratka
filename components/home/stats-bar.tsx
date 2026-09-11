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

/** Quantas estão recebendo inscrição agora — derivado, não afirmado. */
const openCount = companies.filter((c) => c.status === "aberta").length;

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

/*
 * A faixa deixou de ser um painel de papel e virou o primeiro BLOCO DE COR
 * da página: uma barra de azul profundo que ancora o herói de areia. Números
 * em areia sobre azul (9.66) e rótulos em areia/75 (6.17) — os dois AA. O
 * azul é o contrapeso "de dentro" logo depois do laranja: é o que impede a
 * abertura de virar só calor.
 */
export default function StatsBar() {
  return (
    <section data-nav-theme="dark" className="relative -mt-14 px-6 pb-20">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 rounded-card bg-support px-8 py-10 text-on-support shadow-block sm:grid-cols-4">
          <div className="text-center">
            <div className="font-display text-4xl font-bold tabular-nums text-on-support sm:text-5xl">
              {/* The "+" only makes sense alongside a real count. */}
              <CountUp value={companyCount} suffix={companyCount > 0 ? "+" : ""} />
            </div>
            <p className="mt-2 text-sm text-on-support/75">
              {companyCount === 1 ? "empresa mapeada" : "empresas mapeadas"}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-on-support sm:text-3xl">
              <MapPin size={22} className="shrink-0" aria-hidden="true" />
              {coverage}
            </div>
            <p className="mt-2 text-sm text-on-support/75">cobertura principal</p>
          </div>

          <div className="text-center">
            {/*
              Era "Diretos / links para inscrição". Com 6 das 10 empresas em
              "em breve", só 4 cards têm link de inscrição — a alegação
              deixou de ser verdadeira. Esta conta é derivada do mesmo dado
              que alimenta os cards, então acompanha a lista sozinha.
            */}
            <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold tabular-nums text-on-support sm:text-3xl">
              <Link2 size={22} className="shrink-0" aria-hidden="true" />
              <CountUp value={openCount} />
            </div>
            <p className="mt-2 text-sm text-on-support/75">
              {openCount === 1 ? "com inscrição aberta" : "com inscrições abertas"}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 font-mono text-xl font-bold uppercase text-on-support sm:text-2xl">
              <RefreshCw size={22} className="shrink-0" aria-hidden="true" />
              {lastUpdated}
            </div>
            <p className="mt-2 text-sm text-on-support/75">última atualização</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
