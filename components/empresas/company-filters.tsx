"use client";

import { Filter } from "lucide-react";
import type { Audience, City, Sector } from "@/lib/types";

export interface FilterState {
  sector: Sector | "";
  city: City | "";
  audience: Audience | "";
}

export const EMPTY_FILTERS: FilterState = {
  sector: "",
  city: "",
  audience: "",
};

export default function CompanyFilters({
  sectors,
  cities,
  audiences,
  value,
  onChange,
}: {
  sectors: Sector[];
  cities: City[];
  audiences: Audience[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  // Select de terminal: borda de controle visível (line-strong, 3.8:1),
  // rótulo em mono, foco em verde. `color-scheme: dark` em globals.css é o
  // que faz o menu nativo do navegador abrir escuro junto.
  const selectClass =
    "focus-ring rounded-input border border-line-strong bg-surface-2 px-3 py-2 font-mono text-xs text-ink-2 outline-none transition-colors hover:border-line-strong focus:border-accent-deep";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="label-meta flex items-center gap-2 text-ink-soft">
        <Filter size={14} aria-hidden="true" />
        Filtrar:
      </div>
      <select
        className={selectClass}
        value={value.sector}
        onChange={(e) =>
          onChange({ ...value, sector: e.target.value as Sector | "" })
        }
      >
        <option value="">Todos os setores</option>
        {sectors.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={value.city}
        onChange={(e) =>
          onChange({ ...value, city: e.target.value as City | "" })
        }
      >
        <option value="">Todas as cidades</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={value.audience}
        onChange={(e) =>
          onChange({ ...value, audience: e.target.value as Audience | "" })
        }
      >
        <option value="">Todos os públicos</option>
        {audiences.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      {(value.sector || value.city || value.audience) && (
        <button
          onClick={() => onChange(EMPTY_FILTERS)}
          className="focus-ring rounded-control font-mono text-xs text-ink-soft underline underline-offset-4 transition-colors hover:text-accent-deep"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
