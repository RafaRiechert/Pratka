import type { Metadata } from "next";
import { JetBrains_Mono, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
import SmoothScroll from "@/components/providers/smooth-scroll";
import GrainOverlay from "@/components/ui/grain-overlay";
import CursorGlow from "@/components/ui/cursor-glow";

/**
 * Duas vozes, e só. A direção "Verão" é modernista brasileira: geometria,
 * peso e curva. Fraunces (serifada editorial) e Caveat (manuscrita) saíram
 * junto com a identidade anterior — a manuscrita em especial puxava a marca
 * para um registro adolescente que este público (BTG, Itaú, Morgan Stanley,
 * Mattos Filho) não compra.
 */
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/**
 * Voz monoespaçada — o terceiro slot, e o único que se justifica por ser
 * funcional: janela de inscrição, contagem, cidade. É o que dá à linha do
 * tempo do herói o ar de tabela de dados em vez de enfeite.
 */
const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: false,
});

/**
 * Clash Display (Fontshare / ITF, free license) — a display geométrica de
 * peso alto que assina as manchetes E o wordmark. Self-hosted rather than
 * CDN-linked so it ships from our own origin with the static export: two
 * weights, 29KB total, preloaded because the hero headline is the LCP
 * element.
 */
const clashDisplay = localFont({
  variable: "--font-clash",
  display: "swap",
  preload: true,
  src: [
    { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
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
      className={`${clashDisplay.variable} ${workSans.variable} ${mono.variable} h-full`}
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
