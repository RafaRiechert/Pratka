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
  // Cápsula de papel com fio de tinta — a mesma forma do botão, para que a
  // barra de filtros leia como uma fileira de controles e não como campos
  // de formulário perdidos no meio da listagem.
  const selectClass =
    "focus-ring rounded-control border-2 border-line-strong bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink outline-none transition-colors hover:border-ink/45";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
        <Filter size={16} aria-hidden="true" />
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
          className="focus-ring rounded-control px-2 py-1 text-sm font-semibold text-accent-deep underline-offset-4 hover:underline"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
