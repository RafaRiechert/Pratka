import type { Audience, City, Company, Sector } from "@/lib/types";

export const companies: Company[] = [
  {
    id: "btg-summer-undergrad",
    name: "BTG Pactual — Summer Undergrad",
    sector: "Banco de Investimento",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Estágio de férias para brasileiros que estudam fora do país, no maior banco de investimentos da América Latina.",
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
    id: "btg-estagio-ferias",
    name: "BTG Pactual — Estágio de Férias",
    sector: "Banco de Investimento",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Programa de 1-2 meses durante as férias para estudantes nos primeiros anos de graduação no Brasil.",
    fullDescription:
      "O Estágio de Férias do BTG Pactual acontece em janeiro-fevereiro ou julho-agosto, com duração de 1 a 2 meses. Voltado para estudantes nos primeiros dois anos de graduação em Tecnologia, Engenharias, Negócios ou áreas correlatas. O estagiário desenvolve um projeto de curto prazo para otimizar fluxos da área e participa de rotinas do dia a dia. Presencial em SP ou RJ. Benefícios: bolsa auxílio, vale-refeição, vale-transporte e seguro de vida.",
    type: "Estágio de Férias",
    target: "Universitários no Brasil (1º e 2º ano)",
    duration: "1–2 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://conteudo.btgpactual.com/estagio-de-ferias",
  },
  {
    id: "itau-bba",
    name: "Itaú BBA",
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
    id: "goldman-sachs",
    name: "Goldman Sachs",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Off-Cycle Internship em IB, Risk e Operations no escritório de São Paulo.",
    fullDescription:
      "O programa da Goldman Sachs em São Paulo oferece imersão total nas atividades do dia a dia. Cada candidato pode aplicar para até 4 combinações de área/localização. As áreas disponíveis incluem Investment Banking (M&A, financiamento e risk management), Risk (identificação e gestão de riscos financeiros) e Operations. A duração varia conforme a universidade do candidato.",
    type: "Summer Internship",
    target: "Universitários (penúltimo ano)",
    duration: "Varia por universidade",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://higher.gs.com/roles/151739",
  },
  {
    id: "morgan-stanley",
    name: "Morgan Stanley",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Brazil Internship Program com exposição a diversas áreas do banco.",
    fullDescription:
      "O Morgan Stanley oferece o Brazil Internship Program em São Paulo, com oportunidades em diversas áreas do banco. O programa proporciona experiência prática em um ambiente de alta performance, contato com profissionais experientes e exposição a operações reais do mercado financeiro global.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "2–3 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://morganstanley.tal.net/vx/mobile-0/brand-2/spa-1/candidate/so/pm/1/pl/1/opp/21004-2026-2-Brazil-Internship-Program-Sao-Paulo/en-GB",
  },
  {
    id: "jp-morgan",
    name: "JP Morgan Chase",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Programa Drive The Future — sem exigência de experiência prévia. IB, Equity Research, Corporate Banking.",
    fullDescription:
      "O programa Drive The Future do JP Morgan em São Paulo é aberto a universitários brasileiros sem exigência de experiência prévia. Áreas de atuação incluem Currencies and Emerging Markets, Equity Research (análise de empresas LatAm para clientes institucionais), Global Corporate Banking e Investment Banking (M&A, ECM, DCM). Carga de 30 horas semanais, presencial no escritório de São Paulo. Requisito: graduação prevista para dezembro de 2026 ou depois, com inglês avançado.",
    type: "Summer Internship",
    target: "Universitários no Brasil",
    duration: "Período de férias",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://jpmorgan.tal.net/vx/candidate/apply/17029",
  },
  {
    id: "bank-of-america",
    name: "Bank of America",
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
    link: "https://careers.bankofamerica.com/en-us/students/job-detail/13192/2026-sao-paulo-brazil",
  },
  {
    id: "ubs",
    name: "UBS",
    sector: "Banco de Investimento",
    cities: ["São Paulo"],
    shortDescription:
      "Jornada de Trainee UBS Brasil em Global Wealth Management e IT Dev.",
    fullDescription:
      "O UBS oferece a Jornada de Trainee Brasil com programas em Global Wealth Management (assessoria financeira e planejamento patrimonial) e IT Dev (desenvolvimento de soluções tecnológicas para o banco). Os candidatos de IT Dev que avançarem recebem um certificado de 80 horas em Fullstack, mesmo se não contratados. O banco administra globalmente USD 6,1 trilhões em ativos, com 65 anos de história na América Latina.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "2–3 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://trainee-ubs.com.br",
  },
  {
    id: "br-partners",
    name: "BR Partners",
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
      "Summer Internship e Estágio de Férias em tecnologia, áreas institucionais e comerciais. Faria Lima, SP.",
    fullDescription:
      "A Genial Investimentos possui mais de 2 milhões de clientes e R$ 25 bilhões sob gestão. Oferece o Genial Summer Internship e o Programa Estágio de Férias com oportunidades em tecnologia, áreas institucionais, suporte e comerciais. Presencial na Av. Faria Lima. Busca estudantes de Economia, Administração, Contabilidade, Engenharia, Marketing e áreas correlatas. Também oferece o Desafio Genial, competição com prêmios de R$ 10 mil+ e vaga de estágio.",
    type: "Summer Internship",
    target: "Universitários no Brasil",
    duration: "1–2 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://estagiogenial.gupy.io",
  },
  {
    id: "xp-inc",
    name: "XP Inc.",
    sector: "Mercado Financeiro",
    cities: ["São Paulo"],
    shortDescription:
      "Vagas em IB, Asset Management, Research, Produtos Financeiros e Tecnologia.",
    fullDescription:
      "O Programa de Estágio da XP Inc. oferece vagas em diversas áreas: Mercado Financeiro (Análise de Crédito, Banker, Corporate Desk, Asset Management, Investment Banking, Research, Produtos Financeiros), Corporativo (Branding, Controladoria, Jurídico, M&A, RH) e Tecnologia (Produtos Digitais, Segurança da Informação, Engenharia de Dados). Início previsto para agosto. Requisito: não trabalhar ou estagiar em escritório credenciado à XP.",
    type: "Estágio",
    target: "Universitários no Brasil",
    duration: "12 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://lp.xpi.com.br/programa_de_estagio",
  },
  {
    id: "bcg",
    name: "BCG",
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
    id: "mckinsey",
    name: "McKinsey & Company",
    sector: "Consultoria",
    cities: ["São Paulo", "Rio de Janeiro"],
    shortDescription:
      "Business Analyst e Summer Business Analyst no escritório do Brasil.",
    fullDescription:
      "Na McKinsey Brasil você pode explorar seus interesses profissionais e trabalhar ao lado de líderes de empresas globais e startups. O Summer Business Analyst é para estudantes no penúltimo ano, com imersão em projetos reais de consultoria estratégica. O processo é competitivo e inclui entrevistas de caso e fit.",
    type: "Summer Internship",
    target: "Universitários (penúltimo ano)",
    duration: "8–10 semanas",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://www.mckinsey.com/br/careers/role-descriptions/join-us/current-students-and-recent-graduates",
  },
  {
    id: "bain",
    name: "Bain & Company",
    sector: "Consultoria",
    cities: ["São Paulo"],
    shortDescription:
      "Associate Consultant Internship em consultoria estratégica com clientes Fortune 1000.",
    fullDescription:
      "O Associate Consultant Internship da Bain é para estudantes de graduação. Inclui treinamento intensivo nos primeiros dias para desenvolver habilidades de consultoria (business acumen e comunicação), seguido de alocação em times de caso com clientes reais. Os clientes são empresas Fortune 1000 que buscam inovar em seus setores. O estagiário trabalha com desafios complexos ao lado de consultores seniores.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "8–10 semanas",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://www.bain.com/careers/work-with-us/internships-programs",
  },
  {
    id: "tiktok",
    name: "TikTok / ByteDance",
    sector: "Tecnologia",
    cities: ["São Paulo"],
    shortDescription: "Internships 2026 em LIVE operations, advertisement e content em SP.",
    fullDescription:
      "A TikTok busca talentos para internships de 2026 no escritório de São Paulo. As vagas incluem LIVE Operations (trabalhar com criadores, agências e parceiros), Solutions Engineer (equipe de advertisement) e Content Operations. O programa oferece exposição prática, workshops de desenvolvimento e eventos sociais. O candidato pode aplicar para no máximo duas posições.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "3–6 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://careers.tiktok.com/position?keywords=intern&category=&location=CT_5765&project=&type=&job_hot_flag=&current=1&limit=10",
  },
  {
    id: "wildlife-studios",
    name: "Wildlife Studios",
    sector: "Tecnologia",
    cities: ["São Paulo"],
    shortDescription:
      "Uma das maiores desenvolvedoras de jogos mobile do mundo. 30h semanais em SP.",
    fullDescription:
      "A Wildlife Studios é uma das maiores desenvolvedoras e publishers de jogos mobile do mundo, com sede em São Paulo. O programa de summer internship oferece 30 horas semanais, com exposição prática em desenvolvimento de jogos, produto, marketing e operações. O ambiente é dinâmico e inovador, com projetos reais desde o primeiro dia.",
    type: "Summer Internship",
    target: "Universitários",
    duration: "2–3 meses",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://wildlifestudios.com/careers",
  },
  {
    id: "prio",
    name: "PRIO",
    sector: "Óleo & Gás",
    cities: ["Rio de Janeiro"],
    shortDescription: "8-10 semanas no RJ com viagem, moradia e alimentação 100% cobertos.",
    fullDescription:
      "A PRIO é a maior empresa independente de óleo e gás do Brasil. O Summer Job Program dura 8 a 10 semanas no Rio de Janeiro, com todas as despesas cobertas (viagem, moradia e alimentação). O estagiário trabalha em projetos reais de negócio. Aberto a estudantes de graduação e pós, preferencialmente de engenharia e business. É uma oportunidade de viver uma experiência profissional completa em uma das cidades mais vibrantes do mundo.",
    type: "Summer Internship",
    target: "Universitários (engenharia e business)",
    duration: "8–10 semanas",
    paid: true,
    audience: "Universitários no Brasil",
    link: "https://prio3.com.br",
  },
  {
    id: "disney",
    name: "Disney (LATAM)",
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

export const sectors: Sector[] = [
  "Banco de Investimento",
  "Consultoria",
  "Tecnologia",
  "Mercado Financeiro",
  "Óleo & Gás",
  "Entretenimento",
];

export const cities: City[] = ["São Paulo", "Rio de Janeiro"];

export const audiences: Audience[] = [
  "Universitários no Brasil",
  "Brasileiros em universidades no exterior",
];
