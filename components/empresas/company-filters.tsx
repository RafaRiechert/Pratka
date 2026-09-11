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
  // Campo de ficha: caixa de fio com a base reforçada, texto em caixa alta
  // espaçada. Nenhum vidro, nenhuma cápsula, nenhum anel colorido.
  const selectClass =
    "focus-ring label-meta rounded-input border border-line-strong border-b-2 border-b-ink bg-surface-2 px-3 py-2.5 text-ink outline-none transition-colors hover:border-ink";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
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
          className="focus-ring label-meta rounded-input px-1 py-2 text-ink-soft underline underline-offset-4 hover:text-accent-deep"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
