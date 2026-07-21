import Link from "next/link";
import { Camera, Briefcase, Send } from "lucide-react";

const footerLinks = [
  { href: "/#empresas", label: "Empresas" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#problema-solucao", label: "Problema & Solução" },
  { href: "/sobre", label: "Sobre" },
];

const socials = [
  { href: "#", label: "Instagram", icon: Camera },
  { href: "#", label: "LinkedIn", icon: Briefcase },
  { href: "#", label: "Twitter", icon: Send },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-paper">
              Pratka
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            </span>
            <p className="mt-3 max-w-xs text-sm text-paper/55">
              Feito no Brasil para universitários brasileiros.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-paper/40">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/70 transition-colors duration-150 hover:text-signal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-paper/40">
              Redes sociais
            </h4>
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-line-dark text-paper/70 transition-colors duration-150 hover:border-signal hover:text-signal"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line-dark pt-6 text-center font-mono text-xs text-paper/35">
          © {new Date().getFullYear()} Pratka. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
