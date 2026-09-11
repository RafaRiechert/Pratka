import Link from "next/link";
import { Camera, Briefcase, Send } from "lucide-react";

const footerLinks = [
  { href: "/#empresas", label: "Empresas" },
  { href: "/quiz", label: "Quiz" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#problema-solucao", label: "Problema & Solução" },
  { href: "/sobre", label: "Sobre" },
];

const socials = [
  { href: "#", label: "Instagram", icon: Camera },
  { href: "#", label: "LinkedIn", icon: Briefcase },
  { href: "#", label: "Twitter", icon: Send },
];

/**
 * O rodapé era o bloco `inverse` da pele clara. Aqui a pele já é escura, e
 * `inverse` passou a significar o CLARO — então o rodapé usa `surface-3`,
 * uma superfície do próprio sistema, e se separa do CTA por um fio, não por
 * uma troca de polo. Sem `data-nav-theme`: o header já está no modo escuro.
 */
export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-surface-3">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-mono text-xl font-bold tracking-tight text-ink">
              Pratka
              <span aria-hidden="true" className="text-accent-deep">
                _
              </span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Feito no Brasil para universitários brasileiros.
            </p>
          </div>

          <div>
            <h4 className="label-meta text-ink-soft">Navegação</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="focus-ring rounded-control text-sm text-ink-2 transition-colors hover:text-accent-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-meta text-ink-soft">Redes sociais</h4>
            <div className="mt-4 flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="pop focus-ring flex h-10 w-10 items-center justify-center rounded-control border border-line bg-surface-2 text-ink-soft hover:border-accent-deep hover:text-accent-deep"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-center font-mono text-[11px] text-ink-soft">
          © {new Date().getFullYear()} Pratka. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
