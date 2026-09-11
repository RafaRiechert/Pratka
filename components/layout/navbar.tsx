"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/layout/nav-link";
import { cn } from "@/lib/utils";
import { useNavOverLight } from "@/lib/use-nav-over-light";

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
  // Dois estados apenas, e a pergunta inverteu junto com a pele: o padrão é
  // o header escuro, e a exceção é quando ele passa por uma zona de leitura.
  const overLight = useNavOverLight();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav
          className={cn(
            // ⚠️ SEM `transition-colors` aqui. A inversão troca os VALORES das
            // custom properties (via `read-surface`), não o texto da
            // declaração — e o Chrome, nesse caso, inicia uma transição que
            // nunca avança: a barra ficava congelada na cor antiga. Sem
            // transição, a troca é instantânea, que é o comportamento certo
            // para esta identidade de qualquer forma: um terminal não
            // dissolve, ele comuta.
            "flex items-center justify-between rounded-panel border px-5 py-2.5",
            overLight
              ? "read-surface border-line-strong/30 bg-surface-2/95 backdrop-blur-sm"
              : "border-line bg-surface-2/95 backdrop-blur-sm"
          )}
        >
          {/*
            O wordmark serifado (Fraunces) não sobreviveu: numa marca que se
            apresenta como terminal de dado, a mono É a assinatura, e o
            cursor verde faz o trabalho que a serifa fazia.

            Nenhuma cor aqui é condicional: como a barra inteira entra em
            `read-surface` quando passa por uma zona clara, os MESMOS tokens
            (`text-ink`, `text-accent-deep`, `border-line`) já resolvem para
            os dois polos. O componente não sabe em que fundo está.
          */}
          <Link
            href="/"
            className="focus-ring rounded-control font-mono text-xl font-bold tracking-tight text-ink"
          >
            Pratka
            <span aria-hidden="true" className="text-accent-deep">
              _
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
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
            className="focus-ring rounded-control text-ink lg:hidden"
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
            className={cn("mx-4 mt-2 lg:hidden", overLight && "read-surface")}
          >
            <div className="panel flex flex-col gap-1 rounded-panel p-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-input px-3 py-2.5 text-sm font-medium text-ink-2 hover:bg-surface-inset hover:text-ink"
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
