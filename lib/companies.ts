import type { Audience, City, Company, Sector } from "@/lib/types";

export const companies: Company[] = [
  {
    id: "btg-summer-undergrad",
    name: "BTG Pactual — Summer Undergrad",
    sector: "Banco de Investimento",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Estágio de verão para brasileiros que estudam fora do país, no maior banco de investimentos da América Latina.",
    fullDescription:
      "O Summer Undergrad do BTG Pactual é dedicado a contratar estudantes brasileiros de alto potencial que cursam universidades internacionais. O estagiário pode escolher entre 4 macro áreas (tecnologia, negócio, suporte ao negócio e varejo digital). Duração de 3 meses, de junho a agosto, com exposição a diferentes áreas do banco. A área final de atuação é definida pelos gestores e sócios conforme as habilidades avaliadas durante o processo seletivo.",
    type: "Summer Internship",
    target: "Brasileiros em universidades no exterior",
    duration: "3 meses (jun–ago)",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    link: "https://conteudo.btgpactual.com/summer-undergrad",
  },
  {
    id: "itau-bba-summer",
    name: "Itaú BBA — Summer",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Summer para estudantes brasileiros em universidades estrangeiras, nas áreas de Asset, IB e Tesouraria.",
    fullDescription:
      "O programa do Itaú BBA é voltado para estudantes brasileiros em universidades estrangeiras que querem impactar o mercado financeiro. Áreas de atuação incluem Asset Management (maior gestora privada do Brasil, com mais de R$ 1 trilhão em ativos), Banco de Investimentos (maior da América Latina — M&A, ECM, DCM) e Tesouraria Institucional. O estagiário tem exposição direta a operações reais e contato com sócios e executivos.",
    type: "Summer Internship",
    target: "Brasileiros em universidades no exterior",
    duration: "2–3 meses",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    link: "https://carreiras.itau.com.br/summer",
  },
  {
    id: "morgan-stanley-brazil-internship",
    name: "Morgan Stanley — Brazil Internship Program",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Brazil Internship Program com vagas em IB, Sales & Trading, Research, Tech e mais.",
    fullDescription:
      "O Morgan Stanley oferece o Brazil Internship Program em São Paulo, com oportunidades em Investment Banking & Capital Markets, Sales & Trading, Research, Finance, Technology, Operations, Human Resources e Legal. O programa proporciona experiência prática em um ambiente de alta performance. Benefícios incluem bolsa auxílio, 13ª bolsa, seguro de vida, assistência médica, vale refeição, auxílio transporte e bolsa auxílio idioma inglês. Local: Av. Faria Lima, São Paulo.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "1–2 anos",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://morganstanley.tal.net/vx/mobile-0/brand-2/spa-1/candidate/so/pm/1/pl/1/opp/21004-2026-2-Brazil-Internship-Program-Sao-Paulo/en-GB",
  },
  {
    id: "jp-morgan-drive-the-future",
    name: "JP Morgan — Drive The Future",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Programa aberto a universitários brasileiros sem exigência de experiência prévia.",
    fullDescription:
      "O programa Drive The Future do JP Morgan em São Paulo é aberto a universitários brasileiros sem exigência de experiência prévia. Áreas de atuação incluem Currencies and Emerging Markets, Equity Research (análise de empresas LatAm para clientes institucionais), Global Corporate Banking e Investment Banking (M&A, ECM, DCM). Carga de 30 horas semanais, presencial no escritório de São Paulo. Requisito: graduação prevista para dezembro de 2026 ou depois, com inglês avançado.",
    type: "Summer Internship",
    target: "Universitários no Brasil",
    duration: "Período de férias",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210643718",
  },
  {
    id: "bank-of-america-brazil-ib-internship",
    name: "Bank of America — Brazil IB Internship",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription: "Investment Banking Internship Program em São Paulo.",
    fullDescription:
      "O programa de Investment Banking Internship do Bank of America em São Paulo oferece exposição a operações de M&A, mercados de capitais e financiamento estruturado. Busca estudantes de Business, Economia, Contabilidade, Engenharia ou áreas correlatas, com disponibilidade de 30 horas semanais em formato presencial ou híbrido.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "2–3 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://careers.bankofamerica.com/en-us/students/job-detail/13192/2026-brazil-investment-banking-internship-program-sao-paulo-brazil",
  },
  {
    id: "ubs-trainee-brasil",
    name: "UBS — Trainee Brasil",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Jornada de Trainee UBS Brasil em Global Wealth Management e IT Dev.",
    fullDescription:
      "O UBS oferece a Jornada de Trainee Brasil com programas em Global Wealth Management (assessoria financeira e planejamento patrimonial) e IT Dev (desenvolvimento de soluções tecnológicas para o banco). Os candidatos de IT Dev que avançarem recebem um certificado de 80 horas em Fullstack, mesmo se não contratados. O banco administra globalmente USD 6,1 trilhões em ativos.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "2–3 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://trainee-ubs.com.br",
  },
  {
    id: "br-partners-summer-job",
    name: "BR Partners — Summer Job",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Summer Job para brasileiros que estudam no exterior. 8 semanas mínimo, início em junho.",
    fullDescription:
      "O BR Partners oferece o Summer Job para universitários brasileiros que estudam no exterior e pretendem retornar ao Brasil após a formação. Inscrições em setembro, início das atividades em junho, com duração mínima de 8 semanas. Os estagiários rotacionam entre diferentes áreas para entender as interações do dia a dia, e contam com o apoio de um buddy (ex-estagiário) para ambientação e contato com executivos.",
    type: "Summer Job",
    target: "Brasileiros em universidades no exterior",
    duration: "Mínimo 8 semanas",
    paid: true,
    audience: "Brasileiros em universidades no exterior",
    link: "https://www.brpartners.com.br/pt-BR/careers/internship.html",
  },
  {
    id: "genial-investimentos",
    name: "Genial Investimentos",
    sector: "Mercado Financeiro",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Summer Internship em tecnologia, áreas institucionais e comerciais. Faria Lima, SP.",
    fullDescription:
      "A Genial Investimentos possui mais de 2 milhões de clientes e R$ 250 bilhões em ativos sob gestão. Oferece o Genial Summer Internship com oportunidades em tecnologia, áreas institucionais, suporte e comerciais. Presencial na Av. Faria Lima. Busca estudantes de Economia, Administração, Contabilidade, Engenharia, Marketing e áreas correlatas.",
    type: "Summer Internship",
    target: "Universitários no Brasil",
    duration: "1–2 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://estagiogenial.gupy.io",
  },
  {
    id: "bcg-brasil",
    name: "BCG — Brasil",
    sector: "Consultoria",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Summer Intern em consultoria estratégica. Prova online com GMAT, Case Study e inglês.",
    fullDescription:
      "O BCG oferece a posição de Summer Intern para estudantes com previsão de formação a partir de dezembro/2028. O processo seletivo inclui prova online com questões de múltipla escolha baseadas em GMAT, Case Study e conhecimentos de inglês. O programa proporciona experiência real em consultoria estratégica, trabalhando em projetos para as maiores empresas do mundo.",
    type: "Summer Internship",
    target: "Universitários (formatura a partir de dez/2028)",
    duration: "8–10 semanas",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://careers.bcg.com/global/en/locations/brazil/application-process",
  },
  {
    id: "disney-latam",
    name: "Disney — LATAM",
    sector: "Entretenimento",
    cities: ["São Paulo"],
    shortDescription: "Brazil Internship Program da Walt Disney Company Latin America.",
    fullDescription:
      "O Brazil Internship Program da Walt Disney Company Latin America é uma oportunidade de iniciar sua carreira em uma das maiores empresas de entretenimento do mundo. As entrevistas acontecem em outubro e o programa começa em janeiro. O estagiário tem contato com diversas áreas da operação Disney na América Latina, incluindo marketing, conteúdo, tecnologia e operações.",
    type: "Estágio",
    target: "Universitários no Brasil",
    duration: "6–12 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://www.disneycareers.com/en/brazil-internships",
  },
];

const SECTOR_ORDER: Sector[] = [
  "Banco de Investimento",
  "Consultoria",
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
