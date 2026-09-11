"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * The band the header actually occupies. It is no longer a floating card
 * inset from the top: the "Dossiê" identity turns it into a full-width
 * masthead flush against the viewport, so the band starts at 0 and ends at
 * py-4 + the wordmark's line box + the hairline rule.
 */
const BAND_TOP = 0;
const BAND_BOTTOM = 57;

/**
 * True while a dark surface sits under the floating header.
 *
 * This is the reference's per-section menu recolouring, cut down to two
 * states instead of a colour per section — cream-on-dark and ink-on-cream.
 * A careers site can carry one deliberate inversion; a rainbow header reads
 * as a toy.
 *
 * Sections opt in with `data-nav-theme="dark"`. An IntersectionObserver
 * whose root margin collapses the viewport to the header's own band tells
 * us which of them is currently behind it — cheaper and steadier than
 * measuring on every scroll frame, and it rides Lenis without extra work.
 */
export function useNavOverDark(): boolean {
  const pathname = usePathname();
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const intersecting = new Set<Element>();

    const connect = () => {
      observer?.disconnect();
      intersecting.clear();

      const targets = document.querySelectorAll('[data-nav-theme="dark"]');
      if (targets.length === 0) {
        setOverDark(false);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          setOverDark(intersecting.size > 0);
        },
        {
          rootMargin: `-${BAND_TOP}px 0px -${Math.max(
            window.innerHeight - BAND_BOTTOM,
            0
          )}px 0px`,
        }
      );

      targets.forEach((t) => observer?.observe(t));
    };

    // A frame's grace so the incoming route's sections are in the DOM.
    const raf = requestAnimationFrame(connect);

    // The root margin is computed from viewport height, so it has to be
    // rebuilt when that changes.
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(connect, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [pathname]);

  return overDark;
}
