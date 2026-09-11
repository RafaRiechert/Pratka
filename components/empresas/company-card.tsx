import { ArrowUpRight, Clock3, MapPin, Users2 } from "lucide-react";
import PanelCard from "@/components/ui/panel-card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";

/**
 * O card vira CÉLULA: borda de 1px, cantos quase retos, cabeçalho separado
 * do corpo por um fio, e todo metadado (cidade, público) em mono. O hover é
 * a borda acendendo em verde, como uma linha selecionada numa planilha.
 */
export default function CompanyCard({
  company,
  onDetails,
}: {
  company: Company;
  onDetails: () => void;
}) {
  return (
    <PanelCard interactive className="flex h-full flex-col">
      <div className="border-b border-line p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug text-ink">
            {company.name}
          </h3>
          {company.status === "em-breve" ? (
            <span className="label-meta mt-0.5 flex shrink-0 items-center gap-1 rounded-tag border border-signal/40 bg-signal/10 px-1.5 py-0.5 text-signal">
              <Clock3 size={10} aria-hidden="true" />
              Em breve
            </span>
          ) : (
            <span className="label-meta mt-0.5 flex shrink-0 items-center gap-1 rounded-tag border border-accent-deep/40 bg-accent-deep/10 px-1.5 py-0.5 text-accent-deep">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent-deep" />
              Aberta
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Tag variant="accent">{company.sector}</Tag>
          <Tag variant="ink">{company.type}</Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-ink-2">
          {company.shortDescription}
        </p>

        <dl className="space-y-1.5 font-mono text-xs text-ink-soft">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Cidades</dt>
            <MapPin size={13} className="shrink-0" aria-hidden="true" />
            <dd className="truncate">{company.cities.join(", ")}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Público</dt>
            <Users2 size={13} className="shrink-0" aria-hidden="true" />
            <dd className="truncate">{company.target}</dd>
          </div>
        </dl>

        <div className="mt-auto flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className={company.areas ? "w-full" : "flex-1"}
            onClick={onDetails}
          >
            Mais informações
          </Button>
          {company.status === "em-breve" ? (
            // Sem link ativo: um texto informativo, não um botão morto — um
            // controle que parece clicável e não faz nada custa mais confiança
            // do que a informação que ele daria.
            <p className="flex flex-1 items-center justify-center rounded-control border border-dashed border-line-strong px-3 py-2 text-center font-mono text-[11px] text-ink-soft">
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
