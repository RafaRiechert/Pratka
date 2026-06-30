"use client";

import { Filter } from "lucide-react";

export interface FilterState {
  area: string;
  city: string;
  period: string;
  sector: string;
}

export const EMPTY_FILTERS: FilterState = {
  area: "",
  city: "",
  period: "",
  sector: "",
};

export default function CompanyFilters({
  options,
  value,
  onChange,
}: {
  options: {
    areas: string[];
    cities: string[];
    periods: string[];
    sectors: string[];
  };
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const selectClass =
    "glass rounded-xl border-0 bg-transparent px-4 py-2.5 text-sm text-offwhite/85 outline-none focus:ring-2 focus:ring-lime/50";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-offwhite/50">
        <Filter size={16} />
        Filtrar:
      </div>
      <select
        className={selectClass}
        value={value.area}
        onChange={(e) => onChange({ ...value, area: e.target.value })}
      >
        <option value="">Área de atuação</option>
        {options.areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={value.city}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
      >
        <option value="">Cidade</option>
        {options.cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={value.period}
        onChange={(e) => onChange({ ...value, period: e.target.value })}
      >
        <option value="">Período</option>
        {options.periods.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={value.sector}
        onChange={(e) => onChange({ ...value, sector: e.target.value })}
      >
        <option value="">Setor</option>
        {options.sectors.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {(value.area || value.city || value.period || value.sector) && (
        <button
          onClick={() => onChange(EMPTY_FILTERS)}
          className="text-sm text-offwhite/50 underline-offset-2 hover:text-lime hover:underline"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
