import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
import GrainOverlay from "@/components/ui/grain-overlay";
import CursorGlow from "@/components/ui/cursor-glow";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body antialiased">
        <MotionConfig reducedMotion="user">
          <AuthProvider>
            <GrainOverlay />
            <CursorGlow />
            <SiteChrome>{children}</SiteChrome>
          </AuthProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
