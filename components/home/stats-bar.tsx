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
 * A faixa deixou de ser um cartão flutuando sobre o herói e virou o que é
 * numa publicação: a tira de números da ficha técnica. Quatro células
 * separadas por fio vertical, o dado grande na serifada, o rótulo em caixa
 * alta por baixo. Os ícones ficaram, mas reduzidos e em cinza de apoio —
 * aqui quem tem que gritar é o número.
 */
function Cell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="bg-surface-3 px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex items-baseline gap-2 font-display text-[2rem] font-semibold leading-none tracking-tight text-ink sm:text-[2.5rem]">
        {children}
      </div>
      <p className="label-meta mt-3 text-ink-soft">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-surface-3">
      <AnimatedSection className="mx-auto max-w-7xl px-6">
        {/* Os fios entre as células são o próprio fundo do grid aparecendo
            pelo gap de 1px — assim eles caem certos tanto em 4 colunas
            quanto em 2, o que `divide-*` não faz num grid que quebra. */}
        <div className="grid grid-cols-2 gap-px border-x border-b border-line-strong bg-line-strong sm:grid-cols-4 sm:border-b-0">
          <Cell
            label={companyCount === 1 ? "empresa mapeada" : "empresas mapeadas"}
          >
            {/* The "+" only makes sense alongside a real count. */}
            <span className="tabular-nums">
              <CountUp value={companyCount} suffix={companyCount > 0 ? "+" : ""} />
            </span>
          </Cell>

          <Cell label="cobertura principal">
            <MapPin
              size={18}
              className="shrink-0 self-center text-ink-soft"
              aria-hidden="true"
            />
            {coverage}
          </Cell>

          {/*
            Era "Diretos / links para inscrição". Com 6 das 10 empresas em
            "em breve", só 4 cards têm link de inscrição — a alegação
            deixou de ser verdadeira. Esta conta é derivada do mesmo dado
            que alimenta os cards, então acompanha a lista sozinha.
          */}
          <Cell
            label={
              openCount === 1 ? "com inscrição aberta" : "com inscrições abertas"
            }
          >
            <Link2
              size={18}
              className="shrink-0 self-center text-ink-soft"
              aria-hidden="true"
            />
            <span className="tabular-nums">
              <CountUp value={openCount} />
            </span>
          </Cell>

          <Cell label="última atualização">
            <RefreshCw
              size={18}
              className="shrink-0 self-center text-ink-soft"
              aria-hidden="true"
            />
            <span className="font-mono text-[1.375rem] tabular-nums sm:text-[1.625rem]">
              {lastUpdated}
            </span>
          </Cell>
        </div>
      </AnimatedSection>
    </section>
  );
}
