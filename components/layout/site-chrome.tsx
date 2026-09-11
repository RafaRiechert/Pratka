import type { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* O cabeçalho deixou de flutuar e virou faixa colada no topo, então o
          respiro do conteúdo caiu junto: pt-16 é a altura da faixa + o fio. */}
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
