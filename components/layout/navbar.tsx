"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/layout/nav-link";

const links = [
  { href: "/#empresas", label: "Empresas" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#problema-solucao", label: "Problema & Solução" },
  { href: "/sobre", label: "Sobre" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav className="panel flex items-center justify-between rounded-lg px-5 py-3 shadow-card">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-ink"
          >
            Pratka
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sair
              </Button>
            ) : (
              <>
                <Button href="/login" variant="outline" size="sm">
                  Entrar
                </Button>
                <Button href="/cadastro" variant="primary" size="sm">
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          <button
            className="text-ink lg:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="mx-4 mt-2 lg:hidden"
          >
            <div className="panel flex flex-col gap-1 rounded-lg p-4 shadow-card">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-ink/80 hover:bg-paper-2"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
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
