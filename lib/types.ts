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
  /** Single application link. Omit when `areas` is set instead. */
  link?: string;
  /** Multiple sub-programs, each with its own apply link (e.g. Citi). */
  areas?: CompanyArea[];
}
