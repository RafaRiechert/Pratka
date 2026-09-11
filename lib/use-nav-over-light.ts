"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** The band the floating header actually occupies (mt-4 + py-3 + content). */
const BAND_TOP = 20;
const BAND_BOTTOM = 96;

/**
 * True while a LIGHT surface sits under the floating header.
 *
 * ⚠️ Este helper era `useNavOverDark` e lia `data-nav-theme="dark"`. Na
 * identidade "Terminal" o site é escuro por padrão e as exceções são as
 * zonas de LEITURA, que são claras — então a pergunta se inverteu junto com
 * a pele. Manter o nome antigo seria deixar o código mentir: o estado raro,
 * o que exige recolorir o menu, agora é "sobre o claro".
 *
 * Continuam sendo dois estados apenas — ink-sobre-escuro (o padrão) e
 * on-inverse-sobre-claro — e não uma cor por seção: um site de carreira
 * carrega uma inversão deliberada; um header arco-íris lê como brinquedo.
 *
 * Sections opt in with `data-nav-theme="light"`. An IntersectionObserver
 * whose root margin collapses the viewport to the header's own band tells
 * us which of them is currently behind it — cheaper and steadier than
 * measuring on every scroll frame, and it rides Lenis without extra work.
 */
export function useNavOverLight(): boolean {
  const pathname = usePathname();
  const [overLight, setOverLight] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const intersecting = new Set<Element>();

    const connect = () => {
      observer?.disconnect();
      intersecting.clear();

      const targets = document.querySelectorAll('[data-nav-theme="light"]');
      if (targets.length === 0) {
        setOverLight(false);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          setOverLight(intersecting.size > 0);
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

  return overLight;
}
