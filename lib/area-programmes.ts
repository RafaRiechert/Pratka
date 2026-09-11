import { companies } from "@/lib/companies";
import { quizResults, type QuizAreaCode, type QuizResultInfo } from "@/lib/quiz";
import type { Company, Sector } from "@/lib/types";

/**
 * Bridges the 12 quiz áreas to the programmes we actually list, and to the
 * sector filter the listing already uses.
 *
 * The map below is the discovery section's own — deliberately separate from
 * `quizResults[code].sector`, which drives the quiz result page. The one
 * place they differ is Asset Management: the quiz files it under Banco de
 * Investimento, while for browsing it points at Mercado Financeiro, where
 * the gestora sits. Everything else agrees.
 *
 * Five áreas map to no sector at all (Marketing, RH, Varejo, PE/VC, Risco)
 * and two map to sectors no company currently uses (Consultoria lost its
 * companies when BCG and Accenture were removed; nothing is filed under
 * Tecnologia yet). Those are surfaced as "Em breve" rather than filtering
 * the listing down to nothing.
 */
const DISCOVERY_SECTOR: Record<QuizAreaCode, Sector | null> = {
  IB: "Banco de Investimento",
  Trading: "Banco de Investimento",
  Research: "Banco de Investimento",
  Asset: "Mercado Financeiro",
  Corporate: "Banco de Investimento",
  Consultoria: "Consultoria",
  Fintech: "Tecnologia",
  Marketing: null,
  RH: null,
  Varejo: null,
  PEVC: null,
  Risco: null,
};

export interface AreaProgrammes {
  code: QuizAreaCode;
  info: QuizResultInfo;
  /** The área's own pitch, first sentence, used as the hover annotation. */
  pitch: string;
  /** The sector this área filters the listing by, when there is one. */
  sector: Sector | null;
  matches: Company[];
  /** False when there is nothing to show or filter — the "Em breve" state. */
  interactive: boolean;
}

function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

function matchesFor(info: QuizResultInfo, sector: Sector | null): Company[] {
  // A sub-programme named exactly like the área is the specific match and
  // ranks first: Citi lists "Sales & Trading", "Equity Research" and
  // "Corporate Banking", the same strings the quiz uses.
  const bySubProgramme = companies.filter((c) =>
    c.areas?.some((a) => a.area === info.name)
  );
  const bySector = sector ? companies.filter((c) => c.sector === sector) : [];

  const seen = new Set<string>();
  return [...bySubProgramme, ...bySector].filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
}

export const areaProgrammes: AreaProgrammes[] = (
  Object.keys(quizResults) as QuizAreaCode[]
).map((code) => {
  const info = quizResults[code];
  const sector = DISCOVERY_SECTOR[code];
  const matches = matchesFor(info, sector);

  return {
    code,
    info,
    pitch: firstSentence(info.description),
    sector,
    matches,
    interactive: Boolean(sector) && matches.length > 0,
  };
});
