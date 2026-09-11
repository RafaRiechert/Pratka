import type { Audience, City, Company, Sector } from "@/lib/types";

export const companies: Company[] = [
  // ---- Inscrições abertas ----
  {
    id: "btg-summer-undergrad",
    name: "BTG Pactual — Summer Undergrad",
    sector: "Banco de Investimento",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Estágio de verão para brasileiros que estudam fora do país, no maior banco de investimentos da América Latina.",
    fullDescription:
      "O Summer Undergrad do BTG Pactual é dedicado a contratar estudantes brasileiros de alto potencial que cursam universidades internacionais. Duração de cerca de 3 meses, entre junho e setembro de 2027, com exposição a diferentes áreas do banco. A área final de atuação é definida pelos gestores e sócios conforme as habilidades avaliadas durante o processo seletivo.",
    type: "Summer Internship",
    target: "Brasileiros em universidades no exterior",
    duration: "3 meses (jun–set)",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "aberta",
    link: "https://carreiras.btgpactual.com/programas-de-entrada/summer-undergrad/vagas/6113588004",
  },
  {
    id: "bank-of-america-brazil-ib-internship",
    name: "Bank of America — Brazil IB Internship 2027",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Investment Banking Internship Program em São Paulo para 2027.",
    fullDescription:
      "O programa de Investment Banking Internship do Bank of America em São Paulo oferece exposição a operações de M&A, mercados de dívida e capital (Debt and Equity underwriting). Busca estudantes de Business, Economia, Contabilidade, Engenharia ou áreas correlatas, com previsão de formatura em 1 ano ou mais, inglês fluente e disponibilidade de 30 horas semanais em formato presencial ou híbrido.",
    type: "Summer Internship",
    target: "Universitários (penúltimo ano)",
    duration: "Período de férias",
    paid: true,
    audience: "Universitários no Brasil",
    status: "aberta",
    link: "https://careers.bankofamerica.com/en-us/students/job-detail/14454/2027-brazil-investment-banking-internship-program-sao-paulo-brazil",
  },
  {
    id: "citi-sales-trading",
    name: "Citi — Markets (Sales & Trading)",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Internship na área de Markets (Sales & Trading) no escritório de São Paulo.",
    fullDescription:
      "O Citi busca estagiários para o time de Markets em São Paulo. Como parte de Markets, o trabalho tem impacto imediato — desde apoiar soluções de financiamento para grandes corporações, governos e investidores institucionais até oferecer uma ampla gama de produtos e serviços, com conhecimento aprofundado em um setor específico. Pré-requisitos do programa: formatura prevista até julho de 2028, forte capacidade analítica e de resolução de problemas, e domínio de Word, Excel e PowerPoint.",
    type: "Summer Internship",
    target: "Universitários (formatura até jul/2028)",
    duration: "Período de férias",
    paid: true,
    audience: "Universitários no Brasil",
    status: "aberta",
    link: "https://jobs.citi.com/job/sao-paulo/markets-sales-and-trading-internship-sao-paulo-brazil-2026/287/99545044624",
  },
  {
    id: "moove-summer-job",
    name: "Moove — Summer Job",
    sector: "Tecnologia",
    cities: ["São Paulo"],
    shortDescription:
      "Summer Job da Moove para brasileiros que estudam no exterior, com foco em IA aplicada a negócios.",
    fullDescription:
      "A Moove é uma multinacional brasileira de lubrificantes automotivos e industriais, com presença na América do Sul, Estados Unidos e Europa. O Summer Job é voltado para estudantes brasileiros em universidades no exterior, com foco em aplicar IA de forma prática nas operações. O estagiário atua em projetos reais nas áreas de Logística, Planejamento, Comercial e suporte, mapeando processos e testando ferramentas de IA. Duração de 8 semanas, presença em São Paulo (modelo híbrido). O processo é conduzido pela Mappit.",
    type: "Summer Job",
    target: "Brasileiros em universidades no exterior",
    duration: "8 semanas",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "aberta",
    link: "https://mappit.com.br/jobs/summer-job-moove-sao-paulo/blnup10bxl32anrt9okfyqgd0",
  },

  // ---- Programa existe, inscrições ainda não abertas ----
  {
    id: "br-partners-summer-job",
    name: "BR Partners — Summer Job",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Summer Job para brasileiros que estudam no exterior e pretendem voltar ao Brasil.",
    fullDescription:
      "O BR Partners oferece o Summer Job para universitários brasileiros que estudam no exterior. As inscrições abrem em outubro, com início das atividades em junho e duração mínima de 8 semanas. Os estagiários rotacionam entre diferentes áreas do banco e contam com o apoio de um buddy (ex-estagiário) para ambientação e contato com executivos.",
    type: "Summer Job",
    target: "Brasileiros em universidades no exterior",
    duration: "Mínimo 8 semanas",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "em-breve",
    opensWhen: "Inscrições abrem em outubro de 2026",
  },
  {
    id: "banco-pine-summer-undergrad",
    name: "Banco Pine — Summer Job Undergrad",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Summer Job Undergrad que aproxima universitários brasileiros no exterior do mercado financeiro.",
    fullDescription:
      "O Summer Job Undergrad do Banco Pine é voltado para universitários brasileiros que estudam no exterior, com início no período de férias de julho. O programa oferece imersão na rotina de um banco de negócios ágil, com contato direto com diferentes áreas e projetos reais.",
    type: "Summer Job",
    target: "Brasileiros em universidades no exterior",
    duration: "Período de férias (julho)",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "em-breve",
    opensWhen: "Inscrições reabrem no fim de 2026",
  },
  {
    id: "itau-bba-summer",
    name: "Itaú BBA — Summer",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Summer para estudantes brasileiros em universidades estrangeiras, nas áreas de Asset, IB e Tesouraria.",
    fullDescription:
      "O programa do Itaú BBA é voltado para estudantes brasileiros em universidades estrangeiras que querem impactar o mercado financeiro. As áreas de atuação incluem Asset Management (maior gestora privada do Brasil), Banco de Investimentos (M&A, ECM, DCM), Private Bank, Global Markets e Tesouraria Institucional. O estágio começa em junho e tem duração de 2 a 3 meses na sede em São Paulo.",
    type: "Summer Internship",
    target: "Brasileiros em universidades no exterior",
    duration: "2–3 meses (a partir de jun)",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "em-breve",
    opensWhen: "Inscrições reabrem para a turma de 2027",
  },
  {
    id: "nomad-summer-job",
    name: "Nomad — Summer Job Global Ambassadors",
    sector: "Tecnologia",
    cities: ["São Paulo"],
    shortDescription:
      "Programa para brasileiros que estudam e residem no exterior, com projeto estratégico remoto alinhado ao fuso do Brasil.",
    fullDescription:
      "O Summer Job Global Ambassadors da Nomad é voltado para brasileiros que estudam e residem nos Estados Unidos, Europa ou América Latina. Os participantes protagonizam um projeto estratégico de expansão da Nomad, com até 10 semanas consecutivas a partir da primeira semana de junho, trabalhando de forma remota alinhada ao fuso do Brasil. Bolsa mensal de R$ 5.000 e mentoria com profissionais de Banking e Marketing.",
    type: "Summer Job",
    target: "Brasileiros em universidades no exterior",
    duration: "Até 10 semanas (a partir de jun)",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "em-breve",
    opensWhen: "Inscrições da edição 2027 ainda não abriram",
  },
  {
    id: "grupo-nc-summer-internship",
    name: "Grupo NC — Summer Internship Internacional",
    sector: "Mercado Financeiro",
    cities: ["São Paulo"],
    shortDescription:
      "Summer Internship do Grupo NC (dono da EMS) para brasileiros que cursam graduação no exterior.",
    fullDescription:
      "O Summer Internship Internacional do Grupo NC — holding que controla a farmacêutica EMS e diversos negócios — é voltado para estudantes brasileiros que cursam graduação no exterior e retornam ao Brasil durante as férias acadêmicas (entre junho e agosto). Os participantes atuam em projetos reais em uma empresa brasileira com presença internacional.",
    type: "Summer Internship",
    target: "Brasileiros em universidades no exterior",
    duration: "Jun–ago",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "em-breve",
    opensWhen: "Inscrições da edição 2027 ainda não abriram",
  },
  {
    id: "genial-summer-internacional",
    name: "Genial Investimentos — Summer Internacional",
    sector: "Mercado Financeiro",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Programa Summer da Genial para universitários brasileiros que estudam no exterior.",
    fullDescription:
      "Além do Estágio de Férias nacional, a Genial Investimentos possui o Programa Summer voltado a universitários brasileiros que estudam no exterior, com atuação durante as férias do hemisfério norte (junho a agosto). Os estudantes trabalham em projetos reais e conhecem diferentes áreas do mercado financeiro. O programa costuma ser divulgado em parceria com a BRASA (Brazilian Student Association).",
    type: "Summer Internship",
    target: "Brasileiros em universidades no exterior",
    duration: "Jun–ago",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    status: "em-breve",
    opensWhen: "Divulgado via BRASA — inscrições 2027 ainda não abriram",
  },
];

const SECTOR_ORDER: Sector[] = [
  "Banco de Investimento",
  "Consultoria",
  "Direito",
  "Tecnologia",
  "Mercado Financeiro",
  "Óleo & Gás",
  "Entretenimento",
];

const CITY_ORDER: City[] = ["São Paulo", "Rio de Janeiro"];

const AUDIENCE_ORDER: Audience[] = [
  "Universitários no Brasil",
  "Brasileiros em universidades no exterior",
];

export const sectors: Sector[] = SECTOR_ORDER.filter((s) =>
  companies.some((c) => c.sector === s)
);

export const cities: City[] = CITY_ORDER.filter((city) =>
  companies.some((c) => c.cities.includes(city))
);

export const audiences: Audience[] = AUDIENCE_ORDER.filter((a) =>
  companies.some((c) => c.audience === a)
);
