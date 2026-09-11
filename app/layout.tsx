import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
import SmoothScroll from "@/components/providers/smooth-scroll";
import GrainOverlay from "@/components/ui/grain-overlay";
import CursorGlow from "@/components/ui/cursor-glow";

/**
 * DUAS VOZES + A MONO FUNCIONAL.
 *
 * A identidade "Terminal" fala a língua de quem lê tela de mercado: uma
 * grotesca técnica para texto e uma monoespaçada para TODO dado. Fraunces
 * (serifada wonky), Caveat (manuscrita) e Clash Display saíram — nenhuma das
 * três diz "preciso e de dentro", que é o que esta direção precisa dizer.
 */

/** Corpo. Inter é a grotesca de tela: alta x-height, números legíveis. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/**
 * Display. Inter Tight é o corte estreito da MESMA superfamília, então o
 * teto de "duas vozes" continua valendo: é uma voz em dois registros. Nos
 * 68px do herói o corte estreito é o que dá a densidade de manchete
 * financeira. Preloaded: o headline do herói é o elemento de LCP.
 */
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/**
 * A ASSINATURA da direção. Não é decoração: prazo, contador, cidade, setor,
 * status, índice e ticker são dado, e dado nesta pele é sempre mono. Por
 * isso, ao contrário da identidade anterior, ela é preloaded — aparece no
 * painel do herói, acima da dobra.
 */
const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
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
      className={`${interTight.variable} ${inter.variable} ${mono.variable} h-full`}
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
