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
 * A colofão. Um dos dois únicos blocos de tinta do documento (o outro é "O
 * Problema"): no fim de uma publicação impressa a página escura é
 * convenção, não efeito — ela fecha o caderno em vez de disputar atenção
 * com o conteúdo.
 *
 * Os tons de texto subiram de /45 e /35 para /75 e /60: sobre a tinta
 * #14110F, /45 dava 4,2:1 e reprovava em AA para texto normal.
 */
export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="relative mt-24 bg-inverse">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 border-t-2 border-on-inverse pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl font-semibold tracking-tight text-on-inverse">
              Pratka
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-inverse/75">
              Feito no Brasil para universitários brasileiros.
            </p>
          </div>

          <div>
            <h4 className="label-meta border-b border-on-inverse/25 pb-2 text-on-inverse/75">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="focus-ring rounded-input text-sm text-on-inverse/75 underline-offset-4 transition-colors hover:text-signal hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-meta border-b border-on-inverse/25 pb-2 text-on-inverse/75">
              Redes sociais
            </h4>
            <div className="mt-4 flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="pop focus-ring flex h-10 w-10 items-center justify-center rounded-control border border-on-inverse/30 text-on-inverse/75 hover:border-signal hover:text-signal"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-on-inverse/20 pt-6">
          <p className="label-meta text-on-inverse/60">
            © {new Date().getFullYear()} Pratka. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
