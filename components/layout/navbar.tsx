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
  /*
   * A página é feita de blocos de cor chapada e o header atravessa todos
   * eles. Em vez de um painel translúcido (que some sobre metade deles), a
   * cápsula é OPACA e inverte: tinta sobre areia, areia sobre bloco de cor.
   * Ver lib/use-nav-over-dark.ts para os contrastes de cada combinação.
   */
  const overBlock = useNavOverDark();
  // `true` quando a própria cápsula é escura — o que o conteúdo dela precisa
  // saber. Sobre um bloco de cor a cápsula é clara, e vice-versa.
  const capsuleDark = !overBlock;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav
          className={cn(
            "flex items-center justify-between rounded-control px-5 py-3 shadow-card transition-colors duration-500",
            capsuleDark
              ? "bg-inverse text-on-inverse"
              : "border border-ink/15 bg-surface-2 text-ink"
          )}
        >
          <Link
            href="/"
            className={cn(
              "wordmark focus-ring text-xl transition-colors duration-500 sm:text-2xl",
              capsuleDark ? "text-on-inverse" : "text-ink"
            )}
          >
            Pratka
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} onDark={capsuleDark}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={capsuleDark ? "text-on-inverse hover:bg-on-inverse/10" : undefined}
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
                    capsuleDark
                      ? "border-on-inverse/40 text-on-inverse hover:border-accent-on-inverse hover:text-accent-on-inverse"
                      : undefined
                  }
                >
                  Entrar
                </Button>
                {/*
                  Dentro da cápsula de tinta o laranja escuro (accent-deep)
                  encosta no preto e some; o laranja cheio com texto tinta
                  (4.68) é o par certo ali. Sobre a cápsula de areia vale o
                  contrário, e aí a variante padrão serve.
                */}
                <Button
                  href="/cadastro"
                  variant="primary"
                  size="sm"
                  className={capsuleDark ? "bg-accent text-ink hover:shadow-none" : undefined}
                >
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          <button
            className={cn(
              "focus-ring rounded-control transition-colors duration-500 lg:hidden",
              capsuleDark ? "text-on-inverse" : "text-ink"
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
                  className="focus-ring rounded-input px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent/15"
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
