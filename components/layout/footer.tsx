import Link from "next/link";
import { Camera, Briefcase, Send } from "lucide-react";
import { Arch, ArcField } from "@/components/ui/arc";

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

/*
 * O rodapé é o último bloco: azul profundo, a cor mais "de dentro" da
 * paleta — é ela que assina a marca no fim da página, não o laranja.
 *
 * Duas decisões de contraste vivem aqui:
 *  - A régua laranja de 6px no topo. O rodapé encosta no CTA final, que é
 *    tinta; tinta contra azul profundo dá 1.54 e os dois blocos virariam um
 *    borrão só. A régua é a fronteira.
 *  - Nenhum texto abaixo de 70% de areia. Sobre azul profundo, areia/75 dá
 *    6.17 e areia/70 dá 5.58; areia/55 (o valor antigo) dava 4.08 e
 *    reprovava. Foi por isso que as opacidades subiram.
 */
export default function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative mt-0 overflow-hidden bg-support"
    >
      <span aria-hidden="true" className="rule-accent block w-full" />

      <ArcField>
        <Arch
          tone="support-deep"
          side="top"
          className="-right-[10%] bottom-0 h-56 w-[60vw] max-w-[30rem]"
        />
      </ArcField>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="wordmark text-2xl text-on-support">Pratka</span>
            <p className="mt-3 max-w-xs text-sm text-on-support/75">
              Feito no Brasil para universitários brasileiros.
            </p>
          </div>

          <div>
            <h4 className="label-meta text-on-support/75">Navegação</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="focus-ring rounded-input text-sm text-on-support/85 transition-colors hover:text-on-support"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-meta text-on-support/75">Redes sociais</h4>
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="pop focus-ring flex h-11 w-11 items-center justify-center rounded-pill bg-on-support/15 text-on-support hover:bg-accent hover:text-ink"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-on-support/20 pt-6 text-center text-xs text-on-support/75">
          © {new Date().getFullYear()} Pratka. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
