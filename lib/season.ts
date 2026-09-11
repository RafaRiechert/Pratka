import { companies } from "@/lib/companies";
import type { CompanyStatus } from "@/lib/types";

/**
 * Calendário da temporada — a fonte única do painel de prazos do herói.
 *
 * ⚠️ DADO PENDENTE: `lib/companies.ts` não tem campo de data. O que existe é
 * `status` ("aberta" | "em-breve"), o texto livre `opensWhen` e `duration`.
 * Por isso `window` é SEMPRE `null` hoje e o painel mostra o marcador de
 * pendência em vez de uma data. Nada aqui inventa prazo: no dia em que
 * `Company` ganhar `applicationOpens` / `applicationCloses`, é só preencher
 * `window` em `toEntry` e o painel passa a exibir as datas sozinho.
 */

export interface SeasonWindow {
  /** Abertura das inscrições, em ISO (YYYY-MM-DD). */
  opens: string | null;
  /** Fechamento das inscrições, em ISO (YYYY-MM-DD). */
  closes: string | null;
}

export interface SeasonEntry {
  id: string;
  /** Nome da empresa, sem o sufixo do programa. */
  company: string;
  /** Nome do programa — o que vem depois do travessão, ou o `type`. */
  programme: string;
  status: CompanyStatus;
  /** `null` enquanto não houver campo de data no dataset. */
  window: SeasonWindow | null;
  /** Texto livre sobre quando as inscrições devem abrir ("em-breve"). */
  opensWhen: string | null;
  /** Duração do programa, quando informada. */
  duration: string | null;
  cities: string[];
  href: string | null;
}

/** "BTG Pactual — Summer Undergrad" → ["BTG Pactual", "Summer Undergrad"] */
function splitName(name: string, fallback: string): [string, string] {
  const [company, ...rest] = name.split(" — ");
  const programme = rest.join(" — ").trim();
  return [company.trim(), programme || fallback];
}

function toEntry(company: (typeof companies)[number]): SeasonEntry {
  const [name, programme] = splitName(company.name, company.type);
  return {
    id: company.id,
    company: name,
    programme,
    status: company.status,
    // Sem campo de data no dataset — ver aviso no topo do arquivo.
    window: null,
    opensWhen: company.opensWhen ?? null,
    duration: company.duration ?? null,
    cities: company.cities,
    href: company.link ?? company.areas?.[0]?.link ?? null,
  };
}

/** Abertas primeiro; dentro de cada grupo, a ordem do dataset é preservada. */
const STATUS_ORDER: Record<CompanyStatus, number> = { aberta: 0, "em-breve": 1 };

export const seasonEntries: SeasonEntry[] = companies
  .map(toEntry)
  .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

/** `false` enquanto nenhuma entrada tiver janela de inscrição real. */
export const seasonHasDates = seasonEntries.some((e) => e.window !== null);

export const seasonOpenCount = seasonEntries.filter((e) => e.status === "aberta").length;
export const seasonSoonCount = seasonEntries.filter((e) => e.status === "em-breve").length;

/** Rótulos do painel — pt-BR, centralizados para revisão. */
export const seasonLabels = {
  eyebrow: "Calendário da temporada",
  heading: "Quando cada programa abre",
  columnProgramme: "Programa",
  columnWindow: "Inscrições",
  columnStatus: "Status",
  statusOpen: "Aberta",
  statusSoon: "Em breve",
  windowPending: "Data a confirmar",
  footnote:
    "As datas exatas de abertura e fechamento ainda não estão cadastradas. Status e janela prevista vêm da própria empresa.",
} as const;
