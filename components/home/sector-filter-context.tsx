"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import type { Sector } from "@/lib/types";

/** Clearance for the fixed pill header, same value the smooth-scroll uses. */
const HEADER_OFFSET = -104;

interface SectorFilterValue {
  sector: Sector | "";
  setSector: (sector: Sector | "") => void;
  /** Apply a sector and bring the listing back into view. */
  selectSectorAndReveal: (sector: Sector) => void;
}

const SectorFilterContext = createContext<SectorFilterValue | null>(null);

/**
 * The sector filter is shared state: the listing owns the dropdown, and
 * "Descubra por área" — which now sits *below* the listing — drives the
 * same filter when an área is activated. Keeping it in one place means the
 * two can never disagree, and the área section reuses the existing filter
 * rather than growing a parallel one.
 */
export function SectorFilterProvider({ children }: { children: ReactNode }) {
  const [sector, setSector] = useState<Sector | "">("");
  const lenis = useLenis();

  const selectSectorAndReveal = useCallback(
    (next: Sector) => {
      setSector(next);

      const target = document.querySelector("#empresas");
      if (!target) return;

      // Let React paint the filtered list before travelling to it.
      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET });
          return;
        }
        // No Lenis means reduced motion is on: jump, don't animate.
        const top =
          target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
        window.scrollTo({ top, behavior: "auto" });
      });
    },
    [lenis]
  );

  const value = useMemo(
    () => ({ sector, setSector, selectSectorAndReveal }),
    [sector, selectSectorAndReveal]
  );

  return (
    <SectorFilterContext.Provider value={value}>
      {children}
    </SectorFilterContext.Provider>
  );
}

export function useSectorFilter(): SectorFilterValue {
  const ctx = useContext(SectorFilterContext);
  if (!ctx) {
    throw new Error("useSectorFilter must be used inside <SectorFilterProvider>");
  }
  return ctx;
}
