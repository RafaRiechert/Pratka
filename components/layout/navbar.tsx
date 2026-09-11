"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/layout/nav-link";
import { cn } from "@/lib/utils";
import { useNavOverDark } from "@/lib/use-nav-over-dark";

const links = [
  { href: "/#empresas", label: "Empresas" },
  { href: "/quiz", label: "Quiz" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#problema-solucao", label: "Problema & Solução" },
  { href: "/sobre", label: "Sobre" },
];

/**
 * Cabeçalho como cabeçalho de publicação: uma faixa de papel de largura
 * total fechada por um fio, não um cartão arredondado flutuando sobre o
 * conteúdo. É a peça que mais define se o site parece produto ou parece
 * documento — e o dossiê precisa de documento.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  // Dois estados apenas: ink sobre surface, e on-inverse sobre o bloco escuro.
  const overDark = useNavOverDark();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 border-b transition-colors duration-500",
        overDark
          ? "border-on-inverse/20 bg-inverse"
          : "border-line-strong bg-surface"
      )}
    >
      <div className="mx-auto max-w-7xl px-5">
        <nav className="flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            className={cn(
              "focus-ring font-display text-2xl font-semibold leading-none tracking-tight transition-colors duration-500",
              overDark ? "text-on-inverse" : "text-ink"
            )}
          >
            Pratka
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} onDark={overDark}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={
                  overDark
                    ? "text-on-inverse hover:border-on-inverse/40"
                    : undefined
                }
                onClick={() => signOut()}
              >
                Sair
              </Button>
            ) : (
              <>
                <Button
                  href="/login"
                  variant="outline"
                  size="sm"
                  className={
                    overDark
                      ? "border-on-inverse/40 text-on-inverse hover:border-on-inverse hover:bg-on-inverse hover:text-ink"
                      : undefined
                  }
                >
                  Entrar
                </Button>
                <Button
                  href="/cadastro"
                  variant="primary"
                  size="sm"
                  className={
                    overDark
                      ? "border-on-inverse bg-on-inverse text-ink hover:border-signal hover:bg-signal hover:text-on-signal"
                      : undefined
                  }
                >
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          <button
            className={cn(
              "focus-ring rounded-control transition-colors duration-500 lg:hidden",
              overDark ? "text-on-inverse" : "text-ink"
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-line bg-surface-2 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-5 py-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring label-meta border-b border-line py-3.5 text-ink hover:text-accent-deep"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 py-4">
                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                  >
                    Sair
                  </Button>
                ) : (
                  <>
                    <Button href="/login" variant="outline" size="sm" onClick={() => setOpen(false)}>
                      Entrar
                    </Button>
                    <Button href="/cadastro" variant="primary" size="sm" onClick={() => setOpen(false)}>
                      Cadastrar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
