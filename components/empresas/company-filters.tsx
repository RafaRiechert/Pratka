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
  const selectClass =
    "rounded-md border border-ink/20 bg-paper px-4 py-2.5 text-sm text-ink/85 outline-none transition-colors duration-150 focus:border-signal";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-mist">
        <Filter size={16} />
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
          className="underline-draw font-mono text-xs uppercase tracking-wide text-mist hover:text-signal"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
