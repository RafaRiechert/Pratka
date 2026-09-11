import { ArrowUpRight, Clock3, MapPin, Users2 } from "lucide-react";
import PanelCard from "@/components/ui/panel-card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";

export default function CompanyCard({
  company,
  onDetails,
}: {
  company: Company;
  onDetails: () => void;
}) {
  return (
    <PanelCard interactive className="flex h-full flex-col gap-5 p-6">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-ink">
            {company.name}
          </h3>
          {company.status === "em-breve" && (
            <span className="mt-0.5 flex shrink-0 items-center gap-1 rounded-pill border-2 border-accent bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent-deep">
              <Clock3 size={11} aria-hidden="true" />
              Em breve
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Tag variant="accent">{company.sector}</Tag>
          <Tag variant="ink">{company.type}</Tag>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">
        {company.shortDescription}
      </p>

      {/*
        `min-w-0` nos dois: sem ele, a linha `truncate` (que é
        white-space: nowrap) impõe seu comprimento inteiro como largura
        mínima do cartão, o cartão empurra a coluna do grid e a página
        inteira ganha rolagem horizontal abaixo de ~380px. Com ele o texto
        faz o que a classe promete — corta com reticências.
      */}
      <div className="min-w-0 space-y-2 text-sm text-ink-soft">
        <div className="flex min-w-0 items-center gap-2">
          <MapPin size={15} className="shrink-0 text-ink-soft" aria-hidden="true" />
          <span className="min-w-0 truncate">{company.cities.join(", ")}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <Users2 size={15} className="shrink-0 text-ink-soft" aria-hidden="true" />
          <span className="min-w-0 truncate">{company.target}</span>
        </div>
      </div>

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
          <p className="flex flex-1 items-center justify-center rounded-control border-2 border-dashed border-line-strong px-3 py-2 text-center text-xs font-medium text-ink-soft">
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
              <ArrowUpRight size={16} />
            </Button>
          )
        )}
      </div>
    </PanelCard>
  );
}
