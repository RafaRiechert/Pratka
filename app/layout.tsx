import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Work_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
import SmoothScroll from "@/components/providers/smooth-scroll";
import GrainOverlay from "@/components/ui/grain-overlay";
import CursorGlow from "@/components/ui/cursor-glow";

/**
 * DUAS VOZES + A MONO FUNCIONAL — o teto que o IDENTIDADE.md impõe.
 *
 * Fraunces é a voz de display E de editorial da identidade "Dossiê": uma
 * serifada de eixo óptico, então a mesma família dá a manchete de alto
 * contraste e o corpo serifado de destaque sem virar duas fontes. Carrega
 * itálico de verdade (usado no herói e nas linhas de personalidade das
 * áreas) e é preload porque desenha a manchete, que é o elemento de LCP.
 *
 * Saíram nesta direção: Clash Display (a grotesca pesada da pele anterior —
 * o dossiê não tem display sem serifa) e Caveat (a voz manuscrita, que é o
 * oposto exato de "publicação séria").
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  preload: true,
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/**
 * Voz monoespaçada — o terceiro slot, e o único que se justifica por ser
 * funcional: data, prazo, contador, cidade, numeral de índice. Fica atrás
 * de --font-mono em globals.css, então trocar a mono da identidade é trocar
 * só este import.
 */
const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Pratka — Seu summer internship começa aqui.",
  description:
    "O único lugar onde você encontra todos os programas de summer internship do Brasil, com link direto para se candidatar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${workSans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink font-body antialiased">
        <MotionConfig reducedMotion="user">
          <AuthProvider>
            <GrainOverlay />
            <CursorGlow />
            <SmoothScroll>
              <SiteChrome>{children}</SiteChrome>
            </SmoothScroll>
          </AuthProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
