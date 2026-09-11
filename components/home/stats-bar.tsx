import { MapPin, Link2, RefreshCw } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import CountUp from "@/components/ui/count-up";
import { cities, companies } from "@/lib/companies";

/**
 * Every figure here is derived from lib/companies, so the strip cannot drift
 * out of step with the listing. Nothing is hardcoded.
 *
 * Na identidade "Terminal" a faixa deixou de flutuar sobre o herói (o card
 * com -mt-16 e sombra) e passou a ser uma RÉGUA: quatro células separadas
 * por fio de 1px, encaixadas logo abaixo da fita de cotação. Números em mono
 * tabular, rótulos em caixa alta. É a linha de resumo de um monitor.
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

function Cell({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`px-3 py-6 text-center sm:px-6 sm:py-7 ${className ?? ""}`}>
      <div className="data-figure flex flex-wrap items-center justify-center gap-x-2 text-xl leading-none text-ink sm:text-3xl">
        {children}
      </div>
      <p className="label-meta mt-3 text-ink-soft">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-b border-line bg-surface-3">
      <AnimatedSection className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-line border-x border-line sm:grid-cols-4 sm:divide-y-0">
          <Cell label={companyCount === 1 ? "empresa mapeada" : "empresas mapeadas"}>
            <span className="text-accent-deep">
              {/* The "+" only makes sense alongside a real count. */}
              <CountUp value={companyCount} suffix={companyCount > 0 ? "+" : ""} />
            </span>
          </Cell>

          <Cell label="cobertura principal">
            <MapPin size={18} className="shrink-0 text-ink-soft" aria-hidden="true" />
            {coverage}
          </Cell>

          {/*
            Era "Diretos / links para inscrição". Com a maioria das empresas
            em "em breve", só parte dos cards tem link de inscrição — a
            alegação deixou de ser verdadeira. Esta conta é derivada do mesmo
            dado que alimenta os cards, então acompanha a lista sozinha.
          */}
          <Cell label={openCount === 1 ? "com inscrição aberta" : "com inscrições abertas"}>
            <Link2 size={18} className="shrink-0 text-ink-soft" aria-hidden="true" />
            <span className="text-accent-deep">
              <CountUp value={openCount} />
            </span>
          </Cell>

          <Cell label="última atualização">
            <RefreshCw size={18} className="shrink-0 text-ink-soft" aria-hidden="true" />
            {lastUpdated}
          </Cell>
        </div>
      </AnimatedSection>
    </section>
  );
}
