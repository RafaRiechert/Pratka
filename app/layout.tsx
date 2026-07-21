import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
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
      className={`${fraunces.variable} ${workSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body antialiased">
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
