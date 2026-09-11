import { ArrowUpRight, Clock3, MapPin, Users2 } from "lucide-react";
import PanelCard from "@/components/ui/panel-card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";

/**
 * Ficha de catálogo. A ordem é a de uma entrada de diretório impresso:
 * régua de topo com o status, nome em serifada, etiquetas de classificação,
 * resumo, e o bloco de metadados (cidade, público) separado por fio antes
 * das ações.
 */
export default function CompanyCard({
  company,
  onDetails,
}: {
  company: Company;
  onDetails: () => void;
}) {
  const isSoon = company.status === "em-breve";

  return (
    <PanelCard interactive className="flex h-full flex-col">
      {/* Cabeça da ficha: a classificação à esquerda, a marcação de prazo à
          direita — e ela só existe quando o dado existe, exatamente como
          antes. Nada de status inventado para preencher o espaço. */}
      <div className="flex min-h-[2.75rem] items-center justify-between gap-3 border-b border-line px-5 py-2.5">
        <span className="label-meta text-ink-soft">{company.sector}</span>
        {isSoon && (
          <span className="label-meta inline-flex items-center gap-1.5 text-signal-deep">
            <Clock3 size={11} aria-hidden="true" />
            Em breve
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          {company.name}
        </h3>

        <p className="text-sm leading-relaxed text-ink-2">
          {company.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <Tag variant="ink">{company.type}</Tag>
        </div>

        <dl className="mt-auto space-y-1.5 border-t border-line pt-4 text-sm text-ink-soft">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Cidades</dt>
            <MapPin size={14} className="shrink-0 text-ink-soft" aria-hidden="true" />
            <dd className="truncate font-mono text-xs">{company.cities.join(", ")}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Público</dt>
            <Users2 size={14} className="shrink-0 text-ink-soft" aria-hidden="true" />
            <dd className="truncate text-xs">{company.target}</dd>
          </div>
        </dl>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={company.areas ? "w-full" : "flex-1"}
            onClick={onDetails}
          >
            Mais informações
          </Button>
          {isSoon ? (
            // Sem link ativo: um texto informativo, não um botão morto — um
            // controle que parece clicável e não faz nada custa mais confiança
            // do que a informação que ele daria.
            <p className="flex flex-1 items-center justify-center border border-dashed border-line-strong px-3 py-2 text-center text-[0.6875rem] leading-tight text-ink-soft">
              {company.opensWhen ?? "Inscrições abrem em breve"}
            </p>
          ) : (
            !company.areas &&
            company.link && (
              <Button
                href={company.link}
                external
                variant="primary"
                size="sm"
                className="flex-1"
              >
                Aplicar
                <ArrowUpRight size={15} />
              </Button>
            )
          )}
        </div>
      </div>
    </PanelCard>
  );
}
