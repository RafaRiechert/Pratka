export type Sector =
  | "Banco de Investimento"
  | "Consultoria"
  | "Direito"
  | "Tecnologia"
  | "Mercado Financeiro"
  | "Óleo & Gás"
  | "Entretenimento";

export type City = "São Paulo" | "Rio de Janeiro";

export type Audience = "Universitários no Brasil" | "Brasileiros em universidades no exterior";

export type CompanyStatus = "aberta" | "em-breve";

export interface CompanyArea {
  area: string;
  description: string;
  link: string;
}

export interface Company {
  id: string;
  name: string;
  sector: Sector;
  cities: City[];
  shortDescription: string;
  fullDescription?: string;
  type: string;
  target: string;
  duration?: string;
  paid: boolean;
  audience: Audience;
  /** "aberta" = inscrições abertas; "em-breve" = programa existe mas inscrições não abriram. */
  status: CompanyStatus;
  /** Texto opcional sobre quando as inscrições devem abrir (só para status "em-breve"). */
  opensWhen?: string;
  /** Single application link. Omit when `areas` is set, or when status is "em-breve". */
  link?: string;
  /** Multiple sub-programs, each with its own apply link (e.g. Citi). */
  areas?: CompanyArea[];
}
