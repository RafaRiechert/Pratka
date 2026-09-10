import { companies } from "@/lib/companies";
import { quizResults, type QuizAreaCode, type QuizResultInfo } from "@/lib/quiz";
import type { Company } from "@/lib/types";

/**
 * Bridges the 12 quiz áreas to the programmes we actually list.
 *
 * Two matches, both from structured data — nothing is inferred from prose:
 *
 *   1. A company sub-programme whose name is exactly the área's name. Citi
 *      lists "Corporate Banking", "Sales & Trading" and "Equity Research",
 *      which are the same strings the quiz uses. These are the specific
 *      matches, so they come first.
 *   2. The área's `sector`, matched against the company's sector.
 *
 * Six áreas (Fintech, Marketing, RH, Varejo, PEVC, Risco) carry no sector,
 * and Consultoria's sector no longer has any company. Those return an empty
 * list on purpose — the UI says so rather than inventing a match.
 */

export interface AreaProgrammes {
  code: QuizAreaCode;
  info: QuizResultInfo;
  /** The área's own pitch, first sentence, used for the hover text morph. */
  pitch: string;
  matches: Company[];
}

function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

function matchesFor(info: QuizResultInfo): Company[] {
  const bySubProgramme = companies.filter((c) =>
    c.areas?.some((a) => a.area === info.name)
  );
  const bySector = info.sector
    ? companies.filter((c) => c.sector === info.sector)
    : [];

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
  return {
    code,
    info,
    pitch: firstSentence(info.description),
    matches: matchesFor(info),
  };
});
