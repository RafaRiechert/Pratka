export type Sector =
  | "Banco de Investimento"
  | "Consultoria"
  | "Tecnologia"
  | "Mercado Financeiro"
  | "Óleo & Gás"
  | "Entretenimento";

export type City = "São Paulo" | "Rio de Janeiro";

export type Audience = "Universitários no Brasil" | "Brasileiros em universidades no exterior";

export interface Company {
  id: string;
  name: string;
  sector: Sector;
  cities: City[];
  shortDescription: string;
  fullDescription: string;
  type: string;
  target: string;
  duration: string;
  paid: boolean;
  audience: Audience;
  link: string;
}
