import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SiteChrome from "@/components/layout/site-chrome";
import GrainOverlay from "@/components/ui/grain-overlay";
import CursorGlow from "@/components/ui/cursor-glow";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
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
      className={`${baloo.variable} ${nunito.variable} h-full`}
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
