"use client";

import { cn } from "@/lib/utils";
import { seasonLabels, seasons } from "@/lib/companies";
import type { Season } from "@/lib/types";

export default function SeasonTabs({
  value,
  onChange,
}: {
  value: Season;
  onChange: (season: Season) => void;
}) {
  return (
    <div className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1 shadow-card">
      {seasons.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
            value === s
              ? "bg-tangerine text-cream shadow-glow-tangerine"
              : "text-ink-soft hover:text-ink"
          )}
        >
          {seasonLabels[s]}
        </button>
      ))}
    </div>
  );
}
