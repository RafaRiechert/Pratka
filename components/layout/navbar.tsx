"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/layout/nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/quem-somos-nos", label: "Quem somos nós" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/problema-solucao", label: "Problema & Solução" },
  { href: "/empresas", label: "Empresas" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, userType, signOut } = useAuth();

  const profileHref = userType === "empresa" ? "/perfil/empresa" : "/perfil/aluno";

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3 shadow-card">
          <Link
            href="/"
            className="font-display text-2xl font-extrabold tracking-tight text-offwhite"
          >
            Pratka
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
            {user && <NavLink href={profileHref}>Perfil</NavLink>}
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
            className="text-offwhite lg:hidden"
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
            <div className="glass flex flex-col gap-1 rounded-2xl p-4 shadow-card">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-offwhite/85 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              {user && (
                <Link
                  href={profileHref}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-offwhite/85 hover:bg-white/5"
                >
                  Perfil
                </Link>
              )}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
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
                    <Button href="/login" variant="outline" size="sm">
                      Entrar
                    </Button>
                    <Button href="/cadastro" variant="primary" size="sm">
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
