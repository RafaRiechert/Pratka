"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import type { ReactNode } from "react";

/** Clearance for the fixed pill header so anchored sections aren't tucked under it. */
const HEADER_OFFSET = -104;

/**
 * Lenis smooth scroll.
 *
 * Two things it has to coexist with:
 *
 * 1. `prefers-reduced-motion`. Lenis animates the scroll position itself, so
 *    the only honest way to respect the preference is to never start it —
 *    not to shorten it. We render children untouched in that case and the
 *    browser's own instant scrolling takes over.
 *
 * 2. Our nav's cross-route hash links (`/#empresas`). Lenis's built-in
 *    `anchors` option only matches bare `#hash` hrefs, and Next's router
 *    handles `/#hash` with an instant jump. So same-page hash clicks are
 *    intercepted here and handed to Lenis, and a hash present on arrival is
 *    scrolled to after mount.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Same-page hash links: let Lenis do the travelling instead of Next.
  useEffect(() => {
    if (reducedMotion !== false) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank") return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      // Only hijack when we're already on the destination page.
      if (url.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) {
        return;
      }

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
        offset: HEADER_OFFSET,
      });
      window.history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reducedMotion]);

  // Arriving with a hash already in the URL (cross-route nav, shared link).
  useEffect(() => {
    if (reducedMotion !== false || !window.location.hash) return;

    const target = document.querySelector(window.location.hash);
    if (!target) return;

    const timer = window.setTimeout(() => {
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
        offset: HEADER_OFFSET,
        immediate: true,
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname, reducedMotion]);

  // Until we've read the media query, and whenever motion is reduced, stay out of the way.
  if (reducedMotion !== false) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.11,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Native scrolling on touch: Lenis on mobile fights the browser's
        // own momentum and costs more than it adds.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
