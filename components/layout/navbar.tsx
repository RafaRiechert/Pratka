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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  // Dois estados apenas: ink sobre surface, e on-inverse sobre o bloco escuro.
  const overDark = useNavOverDark();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav
          className={cn(
            "flex items-center justify-between rounded-panel px-5 py-3 shadow-card transition-colors duration-500",
            overDark
              // `support` em vez de `inverse`: as seções escuras já são
              // `inverse`, e um painel inverse sobre elas sumia.
              ? "border border-on-inverse/15 bg-support/85 backdrop-blur-lg"
              : "panel"
          )}
        >
          <Link
            href="/"
            className={cn(
              "font-editorial text-2xl font-extrabold tracking-tight transition-colors duration-500",
              overDark ? "text-on-inverse" : "text-ink"
            )}
          >
            Pratka
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} onDark={overDark}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={overDark ? "text-on-inverse hover:bg-on-inverse/10" : undefined}
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
                      ? "border-on-inverse/35 text-on-inverse hover:border-signal hover:text-signal"
                      : undefined
                  }
                >
                  Entrar
                </Button>
                <Button href="/cadastro" variant="primary" size="sm">
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          <button
            className={cn(
              "transition-colors duration-500 lg:hidden",
              overDark ? "text-on-inverse" : "text-ink"
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 lg:hidden"
          >
            <div className="panel flex flex-col gap-1 rounded-panel p-4 shadow-card">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-input px-3 py-2.5 text-sm font-medium text-ink/85 hover:bg-ink/5"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-ink/10 pt-3">
                {user ? (
                  <Button
                    variant="ghost"
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
