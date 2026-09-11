"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** The band the floating header actually occupies (mt-4 + py-3 + content). */
const BAND_TOP = 20;
const BAND_BOTTOM = 96;

/**
 * True while a SATURATED block sits under the floating header.
 *
 * A direção "Verão" pinta a página como uma sequência de blocos de cor
 * chapada — areia, verde folha, tinta, laranja queimado, azul profundo — e o
 * header flutua por cima de todos eles. Um header translúcido seria ilegível
 * em pelo menos três desses blocos, então ele não é translúcido: é uma
 * cápsula opaca que INVERTE.
 *
 *   sobre areia (o padrão) → cápsula de tinta, texto areia
 *   sobre bloco de cor     → cápsula de areia, texto tinta
 *
 * Assim a separação entre a cápsula e o bloco de baixo nunca cai abaixo de
 * 3:1 (areia vs laranja 3.19, vs verde 4.51, vs azul 9.66, vs tinta 14.93;
 * tinta vs areia 14.93), e o texto dentro dela está sempre em 14.93. Era
 * exatamente isso que o esquema anterior não garantia: tinta sobre azul
 * profundo dá 1.54.
 *
 * Seções se declaram com `data-nav-theme="dark"` — que aqui significa "sou
 * um bloco de cor saturada", não necessariamente escuro (o bloco laranja
 * também se declara assim). Um IntersectionObserver cujo rootMargin colapsa
 * a viewport à faixa do próprio header diz qual deles está atrás dele —
 * mais barato e mais estável do que medir a cada frame de scroll, e pega
 * carona no Lenis sem trabalho extra.
 *
 * A extensão desta rodada é o contrato, não a mecânica: antes bastava
 * marcar o que era literalmente escuro, porque o resto da página era uma
 * areia só. Agora `data-nav-theme="dark"` quer dizer "sou um bloco de cor
 * saturada" e está em SEIS lugares — a barra de estatísticas (azul), "Como
 * funciona" (verde), "O Problema" (tinta), "A Solução" (laranja), o CTA
 * final (tinta) e o rodapé (azul). Esquecer a marcação em um bloco novo é
 * o único jeito de o header perder contraste, e é por isso que o padrão
 * (sem marcação) é a cápsula de tinta: ela lê sobre areia, que é o fundo
 * de todo bloco não marcado.
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
