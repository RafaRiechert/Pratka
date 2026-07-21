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
    <footer className="relative mt-32 border-t border-cream/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight text-cream">
              Pratka
            </span>
            <p className="mt-3 max-w-xs text-sm text-cream/55">
              Feito no Brasil para universitários brasileiros.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-cream/45">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/70 transition-colors hover:text-tangerine"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-cream/45">
              Redes sociais
            </h4>
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-tangerine hover:text-cream"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/35">
          © {new Date().getFullYear()} Pratka. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
