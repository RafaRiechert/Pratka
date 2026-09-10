import type { Metadata } from "next";
import { Caveat, Fraunces, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
import SmoothScroll from "@/components/providers/smooth-scroll";
import GrainOverlay from "@/components/ui/grain-overlay";
import CursorGlow from "@/components/ui/cursor-glow";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/**
 * Clash Display (Fontshare / ITF, free license) — the heavy display voice for
 * headlines. Self-hosted rather than CDN-linked so it ships from our own
 * origin with the static export: two weights, 29KB total, preloaded because
 * the hero headline is the LCP element.
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

/**
 * Script accent — deliberately rationed to one or two words at a time.
 * Not preloaded: it decorates three words, and preloading it would put it
 * in the critical path against Clash, which draws the LCP headline.
 */
const caveat = Caveat({
  variable: "--font-caveat",
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
      className={`${clashDisplay.variable} ${fraunces.variable} ${workSans.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body antialiased">
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
