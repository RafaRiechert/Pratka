import type { Sector } from "@/lib/types";

export type QuizAreaCode =
  | "IB"
  | "Trading"
  | "Research"
  | "Asset"
  | "Corporate"
  | "Consultoria"
  | "Fintech"
  | "Marketing"
  | "RH"
  | "Varejo"
  | "PEVC"
  | "Risco";

export interface QuizOption {
  id: string;
  text: string;
  areas: QuizAreaCode[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  personal?: boolean;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "É sábado de manhã e você não tem nada marcado. O que faz?",
    options: [
      { id: "q1o1", text: "Abre o computador e trabalha em algo que ficou pendente", areas: ["IB"] },
      { id: "q1o2", text: "Checa como os mercados fecharam e lê notícias financeiras", areas: ["Trading", "Research"] },
      { id: "q1o3", text: "Lê um artigo longo ou livro sobre um tema que te fascinou", areas: ["Research", "Asset"] },
      { id: "q1o4", text: "Encontra amigos — precisa de gente ao redor", areas: ["Corporate", "Varejo"] },
      { id: "q1o5", text: "Trabalha em um projeto criativo pessoal", areas: ["Marketing"] },
      { id: "q1o6", text: "Organiza sua vida, planeja a semana, faz listas", areas: ["Consultoria", "Risco"] },
      { id: "q1o7", text: "Assiste vídeos ou podcasts sobre startups e tecnologia", areas: ["Fintech", "PEVC"] },
    ],
  },
  {
    id: "q2",
    question: "Você está em uma festa. Qual é o seu papel?",
    options: [
      { id: "q2o1", text: "Fico conversando profundamente com uma pessoa interessante", areas: ["Research", "Asset"] },
      { id: "q2o2", text: "Conheço o máximo de gente possível — adoro circular", areas: ["Varejo", "Corporate"] },
      { id: "q2o3", text: "Organizo tudo — playlist, drinks, quem vem", areas: ["Consultoria", "RH"] },
      { id: "q2o4", text: "Conto histórias que fazem todo mundo rir", areas: ["Marketing", "Varejo"] },
      { id: "q2o5", text: "Fico observando as dinâmicas entre as pessoas — acho fascinante", areas: ["RH", "Risco"] },
      { id: "q2o6", text: "Proponho um jogo competitivo ou aposta divertida", areas: ["Trading"] },
      { id: "q2o7", text: "Prefiro festas menores — qualidade sobre quantidade", areas: ["IB", "PEVC"] },
    ],
  },
  {
    id: "q3",
    question: "Como você prefere resolver um problema complexo?",
    options: [
      { id: "q3o1", text: "Montando uma planilha detalhada para analisar todos os cenários", areas: ["IB", "Risco"] },
      { id: "q3o2", text: "Tomando uma decisão rápida com base no instinto e nos dados", areas: ["Trading"] },
      { id: "q3o3", text: "Pesquisando a fundo até formar uma opinião sólida", areas: ["Research", "Asset"] },
      { id: "q3o4", text: "Conversando com as pessoas envolvidas para entender perspectivas", areas: ["Corporate", "RH"] },
      { id: "q3o5", text: "Fazendo um brainstorm criativo com ideias fora da caixa", areas: ["Marketing", "Fintech"] },
      { id: "q3o6", text: "Quebrando em partes menores e resolvendo metodicamente", areas: ["Consultoria"] },
      { id: "q3o7", text: "Testando rápido, errando rápido e ajustando", areas: ["Fintech", "PEVC"] },
      { id: "q3o8", text: "Vendendo a solução para o time antes de implementar", areas: ["Varejo"] },
    ],
  },
  {
    id: "q4",
    question: "O que te motiva mais?",
    options: [
      { id: "q4o1", text: "Fechar um grande deal e ver o impacto concreto", areas: ["IB"] },
      { id: "q4o2", text: "Ganhar com base nas suas próprias convicções", areas: ["Trading"] },
      { id: "q4o3", text: "Entender algo tão profundamente que ninguém sabe mais que você", areas: ["Research"] },
      { id: "q4o4", text: "Construir algo que cresce e gera retorno ao longo dos anos", areas: ["Asset", "PEVC"] },
      { id: "q4o5", text: "Construir relacionamentos duradouros", areas: ["Corporate"] },
      { id: "q4o6", text: "Criar algo que as pessoas vejam e comentem", areas: ["Marketing"] },
      { id: "q4o7", text: "Bater uma meta e ser reconhecido por isso", areas: ["Varejo"] },
      { id: "q4o8", text: "Construir tecnologia que muda como as coisas funcionam", areas: ["Fintech"] },
      { id: "q4o9", text: "Garantir que tudo funcione sem surpresas", areas: ["Risco"] },
      { id: "q4o10", text: "Desenvolver pessoas e ver elas brilhando", areas: ["RH"] },
    ],
  },
  {
    id: "q5",
    question: "Qual o seu tipo de filme/série favorito?",
    personal: true,
    options: [
      { id: "q5o1", text: "Thriller/suspense — adoro tensão", areas: ["Trading", "Risco"] },
      { id: "q5o2", text: "Documentário — quero aprender algo real", areas: ["Research", "Asset"] },
      { id: "q5o3", text: "Drama — histórias humanas profundas me tocam", areas: ["RH", "Corporate"] },
      { id: "q5o4", text: "Comédia — a vida já é séria demais", areas: ["Marketing", "Varejo"] },
      { id: "q5o5", text: "Sci-fi / ficção científica — imaginar o futuro me fascina", areas: ["Fintech", "PEVC"] },
      { id: "q5o6", text: "True crime / investigação — montar o quebra-cabeça", areas: ["Consultoria", "Risco"] },
      { id: "q5o7", text: "Ação / competição — quero adrenalina", areas: ["Trading", "Varejo"] },
      { id: "q5o8", text: "Biografias / histórias reais de sucesso", areas: ["IB", "PEVC"] },
    ],
  },
  {
    id: "q6",
    question: "Qual matéria você mais curte (ou curtiria)?",
    options: [
      { id: "q6o1", text: "Contabilidade / Finanças corporativas", areas: ["IB", "Risco"] },
      { id: "q6o2", text: "Economia / Estatística / Modelagem", areas: ["Research", "Trading"] },
      { id: "q6o3", text: "Marketing / Comunicação / Comportamento do consumidor", areas: ["Marketing", "Varejo"] },
      { id: "q6o4", text: "Programação / Ciência de dados / IA", areas: ["Fintech"] },
      { id: "q6o5", text: "Psicologia / Gestão de pessoas / Liderança", areas: ["RH"] },
      { id: "q6o6", text: "Estratégia / Administração / Estudos de caso", areas: ["Consultoria"] },
      { id: "q6o7", text: "Empreendedorismo / Inovação", areas: ["PEVC", "Fintech"] },
      { id: "q6o8", text: "Direito / Regulamentação / Governança", areas: ["Risco"] },
    ],
  },
  {
    id: "q7",
    question: "Se um amigo tivesse que te descrever em uma frase, qual seria?",
    personal: true,
    options: [
      { id: "q7o1", text: "“Ele(a) é a pessoa mais organizada que eu conheço”", areas: ["Consultoria", "Risco"] },
      { id: "q7o2", text: "“Ele(a) faz amizade com qualquer um em 5 minutos”", areas: ["Varejo", "Corporate"] },
      { id: "q7o3", text: "“Ele(a) sabe um pouco de tudo — é tipo uma enciclopédia”", areas: ["Research", "Consultoria"] },
      { id: "q7o4", text: "“Ele(a) é o mais competitivo do grupo — tudo vira disputa”", areas: ["Trading", "Varejo"] },
      { id: "q7o5", text: "“Ele(a) sempre tem as ideias mais criativas e diferentes”", areas: ["Marketing", "Fintech"] },
      { id: "q7o6", text: "“Ele(a) é o que segura tudo junto quando o grupo tá perdido”", areas: ["RH", "Corporate"] },
      { id: "q7o7", text: "“Ele(a) não descansa enquanto não termina o que começou”", areas: ["IB", "PEVC"] },
      { id: "q7o8", text: "“Ele(a) é sempre o primeiro a testar coisa nova”", areas: ["Fintech", "PEVC"] },
    ],
  },
  {
    id: "q8",
    question: "Você prefere trabalhar com...",
    options: [
      { id: "q8o1", text: "Poucos projetos gigantes ao longo de meses", areas: ["IB", "PEVC"] },
      { id: "q8o2", text: "Decisões que mudam a cada minuto", areas: ["Trading"] },
      { id: "q8o3", text: "Análise profunda de um tema por semanas", areas: ["Research", "Asset"] },
      { id: "q8o4", text: "Muitos clientes diferentes todos os dias", areas: ["Corporate", "Varejo"] },
      { id: "q8o5", text: "Campanhas criativas do início ao fim", areas: ["Marketing"] },
      { id: "q8o6", text: "Código, dados e algoritmos", areas: ["Fintech"] },
      { id: "q8o7", text: "Pessoas — entrevistas, treinamentos, dinâmicas de grupo", areas: ["RH"] },
      { id: "q8o8", text: "Checklists, normas e processos de controle", areas: ["Risco"] },
    ],
  },
  {
    id: "q9",
    question: "Qual é o seu app favorito e por quê?",
    personal: true,
    options: [
      { id: "q9o1", text: "Planilha (Excel/Google Sheets) — amo organizar dados", areas: ["IB", "Risco"] },
      { id: "q9o2", text: "App de investimentos — checo cotações o tempo todo", areas: ["Trading", "Asset"] },
      { id: "q9o3", text: "App de notícias / leitura — sempre consumindo conteúdo", areas: ["Research"] },
      { id: "q9o4", text: "WhatsApp/Instagram — falar com gente é minha energia", areas: ["Varejo", "Corporate"] },
      { id: "q9o5", text: "TikTok/Pinterest/Canva — referências visuais e criativas", areas: ["Marketing"] },
      { id: "q9o6", text: "GitHub/Notion/Figma — construir coisas", areas: ["Fintech"] },
      { id: "q9o7", text: "Spotify/podcast — ouvindo algo enquanto faz tudo", areas: ["Consultoria", "PEVC"] },
      { id: "q9o8", text: "LinkedIn — networking estratégico", areas: ["Corporate", "RH"] },
    ],
  },
  {
    id: "q10",
    question: "O que te atrairia mais em uma empresa?",
    options: [
      { id: "q10o1", text: "Participar de operações bilionárias", areas: ["IB"] },
      { id: "q10o2", text: "Acompanhar mercados globais em tempo real", areas: ["Trading"] },
      { id: "q10o3", text: "Produzir análises que influenciam decisões de investimento", areas: ["Research", "Asset"] },
      { id: "q10o4", text: "Ser o rosto da empresa para os clientes", areas: ["Corporate", "Varejo"] },
      { id: "q10o5", text: "Criar a identidade e a voz de uma marca reconhecida", areas: ["Marketing"] },
      { id: "q10o6", text: "Construir produtos digitais do zero", areas: ["Fintech"] },
      { id: "q10o7", text: "Montar times e desenvolver talentos", areas: ["RH"] },
      { id: "q10o8", text: "Avaliar startups e decidir onde investir", areas: ["PEVC"] },
      { id: "q10o9", text: "Garantir que a empresa esteja protegida contra riscos", areas: ["Risco"] },
      { id: "q10o10", text: "Bater metas e ver o resultado direto no faturamento", areas: ["Varejo"] },
    ],
  },
  {
    id: "q11",
    question: "Numa viagem com amigos, qual papel você assume?",
    personal: true,
    options: [
      { id: "q11o1", text: "Planejo o roteiro inteiro com horários e backup plans", areas: ["Consultoria", "Risco"] },
      { id: "q11o2", text: "Acho os melhores restaurantes e experiências locais", areas: ["Research", "Marketing"] },
      { id: "q11o3", text: "Negocio os preços e encontro os melhores deals", areas: ["Varejo", "Trading"] },
      { id: "q11o4", text: "Sou o que mantém o grupo junto e resolve conflitos", areas: ["RH", "Corporate"] },
      { id: "q11o5", text: "Improviso — os melhores momentos não são planejados", areas: ["Trading", "Marketing"] },
      { id: "q11o6", text: "Pesquiso tudo antes e chego sabendo mais que o guia local", areas: ["Research", "Asset"] },
      { id: "q11o7", text: "Documento tudo — fotos, vídeos, stories", areas: ["Marketing"] },
      { id: "q11o8", text: "Cuido das finanças do grupo — quem deve o quê", areas: ["IB", "Risco"] },
    ],
  },
  {
    id: "q12",
    question: "Qual destes perfis mais combina com você?",
    options: [
      { id: "q12o1", text: "Perfeccionista — não entrega nada sem revisar três vezes", areas: ["IB", "Risco"] },
      { id: "q12o2", text: "Competitivo — tudo é um jogo e eu quero ganhar", areas: ["Trading", "Varejo"] },
      { id: "q12o3", text: "Curioso — preciso entender como tudo funciona", areas: ["Research", "Fintech"] },
      { id: "q12o4", text: "Comunicativo — convencer pessoas é meu superpoder", areas: ["Corporate", "Varejo"] },
      { id: "q12o5", text: "Criativo — vejo possibilidades onde outros veem padrões", areas: ["Marketing"] },
      { id: "q12o6", text: "Analítico — números me contam histórias", areas: ["Fintech", "Asset"] },
      { id: "q12o7", text: "Empático — sinto o que as pessoas precisam", areas: ["RH"] },
      { id: "q12o8", text: "Estratégico — sempre penso três passos à frente", areas: ["Consultoria", "PEVC"] },
    ],
  },
  {
    id: "q13",
    question: "O que mais te incomoda?",
    options: [
      { id: "q13o1", text: "Trabalho sem impacto visível", areas: ["IB", "PEVC"] },
      { id: "q13o2", text: "Lentidão — tudo deveria ser mais rápido", areas: ["Trading"] },
      { id: "q13o3", text: "Superficialidade — quando ninguém vai a fundo", areas: ["Research", "Asset"] },
      { id: "q13o4", text: "Trabalhar isolado sem interação humana", areas: ["Corporate", "Varejo", "RH"] },
      { id: "q13o5", text: "Fazer sempre a mesma coisa sem espaço para criar", areas: ["Marketing", "Fintech"] },
      { id: "q13o6", text: "Processos manuais que poderiam ser automatizados", areas: ["Fintech"] },
      { id: "q13o7", text: "Ambiente tóxico com pessoas que não se respeitam", areas: ["RH"] },
      { id: "q13o8", text: "Falta de regras claras e processos definidos", areas: ["Risco"] },
      { id: "q13o9", text: "Falta de planejamento e estratégia clara", areas: ["Consultoria"] },
    ],
  },
  {
    id: "q14",
    question: "Qual frase mais te representa?",
    options: [
      { id: "q14o1", text: "“O detalhe faz a diferença”", areas: ["IB", "Risco"] },
      { id: "q14o2", text: "“Velocidade mata a concorrência”", areas: ["Trading"] },
      { id: "q14o3", text: "“Conhecimento é a vantagem competitiva definitiva”", areas: ["Research", "Asset"] },
      { id: "q14o4", text: "“Pessoas certas mudam tudo”", areas: ["RH", "Corporate"] },
      { id: "q14o5", text: "“Uma boa história muda o mundo”", areas: ["Marketing"] },
      { id: "q14o6", text: "“Se dá para automatizar, não deveria ser manual”", areas: ["Fintech"] },
      { id: "q14o7", text: "“Quem não arrisca não petisca”", areas: ["PEVC", "Trading"] },
      { id: "q14o8", text: "“Disciplina supera talento”", areas: ["Consultoria", "Risco"] },
      { id: "q14o9", text: "“O cliente sempre tem razão — quase sempre”", areas: ["Varejo", "Corporate"] },
    ],
  },
  {
    id: "q15",
    question: "Se você ganhasse R$ 10 milhões amanhã, o que faria?",
    personal: true,
    options: [
      { id: "q15o1", text: "Investiria tudo estrategicamente e viveria dos rendimentos", areas: ["Asset", "Research"] },
      { id: "q15o2", text: "Colocaria em operações de alto risco buscando multiplicar", areas: ["Trading"] },
      { id: "q15o3", text: "Compraria uma empresa e faria ela crescer", areas: ["PEVC", "IB"] },
      { id: "q15o4", text: "Abriria meu próprio negócio", areas: ["Fintech", "PEVC"] },
      { id: "q15o5", text: "Criaria uma marca ou projeto criativo dos sonhos", areas: ["Marketing"] },
      { id: "q15o6", text: "Montaria um time incrível para alguma causa", areas: ["RH"] },
      { id: "q15o7", text: "Viajaria o mundo fazendo networking e conhecendo gente", areas: ["Corporate", "Varejo"] },
      { id: "q15o8", text: "Guardaria de forma segura e diversificada — sem emoção", areas: ["Risco"] },
      { id: "q15o9", text: "Contrataria uma consultoria para planejar tudo", areas: ["Consultoria"] },
    ],
  },
];

export interface QuizResultInfo {
  name: string;
  description: string;
  /** Extra second-person insight sentences used to pad "por que combina" when few/no rules match. */
  genericInsights: string[];
  sector?: Sector;
}

export const quizResults: Record<QuizAreaCode, QuizResultInfo> = {
  IB: {
    name: "Investment Banking",
    description:
      "Você é movido por grandes operações. Fusões bilionárias, IPOs e reestruturações são o seu território. Detalhista ao extremo, resiliente sob pressão e obcecado por entregar um trabalho impecável — mesmo que isso signifique virar a noite. Para você, o tamanho do deal é o tamanho do impacto.",
    genericInsights: [
      "Poucas coisas rivalizam com a sensação de fechar um grande negócio depois de semanas de trabalho intenso.",
      "Você tem o tipo de resistência que faz virar noites de trabalho parecerem parte do jogo, não um sacrifício.",
      "Detalhe e volume de trabalho não te assustam quando o resultado final vale a pena.",
    ],
    sector: "Banco de Investimento",
  },
  Trading: {
    name: "Sales & Trading",
    description:
      "Adrenalina é o seu combustível. Você toma decisões em segundos, confia no seu instinto alimentado por dados e adora a dinâmica de mercados que não param. Competitivo por natureza, você não quer só participar do jogo — quer ganhar.",
    genericInsights: [
      "Mercados nunca param, e é exatamente por isso que eles combinam com você.",
      "Você prefere confiar na própria leitura da situação a esperar por certezas que talvez nunca cheguem.",
      "A ideia de ganhar ou perder em tempo real, sem rede de segurança, te energiza em vez de te paralisar.",
    ],
    sector: "Banco de Investimento",
  },
  Research: {
    name: "Equity Research",
    description:
      "Você é o detetive do mercado financeiro. Adora investigar empresas, destrinchar balanços, entender setores e formar uma tese que ninguém mais viu. Para você, a satisfação está em estar certo antes de todo mundo.",
    genericInsights: [
      "Você não se contenta com a versão superficial de uma história — precisa entender o que está por trás dos números.",
      "Formar uma opinião bem embasada, mesmo que impopular, é algo que te dá satisfação genuína.",
      "Você prefere gastar mais tempo entendendo o problema certo do que correndo para uma resposta rápida.",
    ],
    sector: "Banco de Investimento",
  },
  Asset: {
    name: "Asset Management",
    description:
      "Você pensa em décadas, não em minutos. Gestão de portfólio, alocação de capital e retornos consistentes ao longo do tempo são o que te fascinam. Paciência disciplinada é a sua vantagem competitiva.",
    genericInsights: [
      "Enquanto muitos pensam no próximo trimestre, você já está pensando na próxima década.",
      "Paciência não é uma limitação para você — é uma estratégia.",
      "Você prefere um retorno consistente e bem pensado a uma aposta chamativa de curto prazo.",
    ],
    sector: "Banco de Investimento",
  },
  Corporate: {
    name: "Corporate Banking",
    description:
      "Relacionamentos são a sua moeda. Você entende que grandes negócios são construídos sobre confiança, e que estar presente para o cliente é mais importante do que qualquer modelo financeiro. Seu talento é ser a pessoa que todo mundo liga quando precisa de uma solução.",
    genericInsights: [
      "Você entende que por trás de todo contrato existe uma relação humana que precisa ser cultivada.",
      "Ser a pessoa de confiança do cliente é, para você, mais valioso do que qualquer proposta comercial.",
      "Você constrói pontes que duram anos, não só negócios que fecham em uma reunião.",
    ],
    sector: "Banco de Investimento",
  },
  Consultoria: {
    name: "Consultoria Estratégica",
    description:
      "Você é o solucionador. Pega qualquer problema, por mais caótico que seja, quebra em partes, estrutura com método e apresenta uma resposta clara. Frameworks, decks e pensamento estruturado são a sua linguagem natural.",
    genericInsights: [
      "Você enxerga estrutura onde os outros veem caos, e isso é um superpoder subestimado.",
      "Um bom framework, para você, vale mais do que mil opiniões soltas.",
      "Quebrar um problema gigante em partes gerenciáveis é, para você, quase automático.",
    ],
    sector: "Consultoria",
  },
  Fintech: {
    name: "Fintech / Tecnologia",
    description:
      "Você quer construir o futuro. Se existe um processo manual, você já está pensando em como automatizar. Dados, código e produto são o seu mundo — e a interseção entre tecnologia e finanças é onde você quer estar.",
    genericInsights: [
      "Você não aceita fazer manualmente o que poderia ser automatizado com uma boa solução.",
      "Tecnologia, para você, não é só ferramenta — é a forma mais eficiente de resolver problemas reais.",
      "Você prefere construir a ferramenta que resolve o problema de uma vez do que repetir o mesmo processo manual.",
    ],
  },
  Marketing: {
    name: "Marketing / Branding",
    description:
      "Você é o contador de histórias. Entende que percepção é realidade, e que uma boa narrativa move pessoas — criatividade aplicada com estratégia é uma das forças mais poderosas dos negócios.",
    genericInsights: [
      "Você entende que a forma como uma história é contada muda completamente o impacto que ela tem.",
      "Uma boa ideia criativa, para você, vale tanto quanto uma boa planilha vale para outra pessoa.",
      "Você percebe tendências e referências antes da maioria das pessoas ao seu redor.",
    ],
  },
  RH: {
    name: "Recursos Humanos / People",
    description:
      "Você é o arquiteto de cultura. Entende que empresas são feitas de pessoas e que recrutar, desenvolver e reter talentos é o que separa empresas medianas de empresas extraordinárias. Empatia e visão estratégica andam juntas no seu perfil.",
    genericInsights: [
      "Você enxerga potencial nas pessoas antes mesmo delas enxergarem em si mesmas.",
      "Para você, contratar certo é tão estratégico quanto qualquer decisão financeira da empresa.",
      "Cultura não é um detalhe para você — é o que determina se uma empresa vai durar ou não.",
    ],
  },
  Varejo: {
    name: "Varejo / Comercial",
    description:
      "Você é o closer. Adora o contato direto com o cliente, vive de metas e sente satisfação genuína em convencer, vender e entregar. Energia alta, comunicação afiada e orientação a resultado são as suas marcas registradas.",
    genericInsights: [
      "Você não tem medo de ouvir um \"não\" — na verdade, é isso que te motiva a tentar de novo.",
      "Bater uma meta e ver o resultado no fim do mês é uma das suas maiores fontes de energia.",
      "Conversar com estranhos e conquistar confiança rápido é algo que vem naturalmente para você.",
    ],
  },
  PEVC: {
    name: "Private Equity / Venture Capital",
    description:
      "Você pensa como dono. Avaliar negócios, identificar potencial de crescimento e apostar em empresas que podem mudar de patamar — isso te fascina. Você combina visão estratégica com apetite por risco calculado.",
    genericInsights: [
      "Você olha para um negócio pequeno e já imagina o tamanho que ele pode ter.",
      "Apostar em potencial, mesmo com incerteza, é algo que te empolga em vez de te assustar.",
      "Você pensa como dono mesmo quando ainda não é — e é exatamente essa mentalidade que separa bons investidores dos demais.",
    ],
  },
  Risco: {
    name: "Risco / Compliance",
    description:
      "Você é o guardião. Enquanto os outros correm atrás de retorno, você garante que ninguém quebre no caminho. Regras, controles e governança não são burocracia para você — são a base que sustenta todo o resto.",
    genericInsights: [
      "Enquanto todo mundo comemora o crescimento, você já está pensando no que pode dar errado.",
      "Para você, prevenir um problema vale muito mais do que remediar um depois que ele já aconteceu.",
      "Ordem, controle e processos bem definidos te dão segurança onde outros veem só burocracia.",
    ],
  },
};

/**
 * Personalized "por que combina" sentences. Each rule inspects the exact
 * option text the person picked for specific questions; when it matches,
 * it contributes a sentence naming the primary result area. Kept generic
 * enough (just a {area} slot) to fire regardless of which area ends up on
 * top, as long as the underlying answer pattern is there.
 */
export interface InsightRule {
  test: (answers: string[]) => boolean;
  text: (areaName: string) => string;
}

function pick(answers: string[], questionIndex: number, fragment: string): boolean {
  return (answers[questionIndex] ?? "").includes(fragment);
}

export const insightRules: InsightRule[] = [
  {
    test: (a) =>
      pick(a, 1, "Conheço o máximo de gente possível") &&
      pick(a, 6, "faz amizade com qualquer um"),
    text: (area) =>
      `Você tem uma habilidade natural para se conectar com pessoas — e isso é exatamente o que profissionais de ${area} fazem todos os dias.`,
  },
  {
    test: (a) => pick(a, 4, "Thriller/suspense") && pick(a, 8, "Planilha"),
    text: (area) =>
      `Você combina raciocínio analítico com gosto por tensão e desafio — um perfil que se encaixa perfeitamente em ambientes de alta pressão como ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 14, "Compraria uma empresa e faria ela crescer") &&
      pick(a, 3, "Fechar um grande deal"),
    text: (area) =>
      `Você pensa em escala e quer estar no centro de operações que transformam negócios — a essência de ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 0, "startups e tecnologia") && pick(a, 5, "Empreendedorismo / Inovação"),
    text: (area) =>
      `Você já vive no universo de startups e inovação mesmo nas horas livres — sinal de que ${area} não seria só um trabalho, seria uma extensão do que você já ama.`,
  },
  {
    test: (a) =>
      pick(a, 2, "Testando rápido, errando rápido") &&
      pick(a, 12, "Processos manuais que poderiam ser automatizados"),
    text: (area) =>
      `Você prefere velocidade e iteração a processos engessados — exatamente o ritmo que ${area} exige.`,
  },
  {
    test: (a) =>
      pick(a, 7, "Checklists, normas e processos de controle") &&
      pick(a, 11, "Estratégico — sempre penso três passos à frente"),
    text: (area) =>
      `Você gosta de antecipar problemas antes que eles aconteçam, com estrutura e disciplina — a mentalidade certa para ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 10, "Planejo o roteiro inteiro com horários") &&
      pick(a, 13, "Disciplina supera talento"),
    text: (area) =>
      `Organização e disciplina não são um esforço para você — são a sua forma natural de operar, o que combina diretamente com ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 1, "Fico observando as dinâmicas entre as pessoas") &&
      pick(a, 6, "sabe um pouco de tudo"),
    text: (area) =>
      `Você presta atenção aos detalhes que os outros ignoram e gosta de entender o quadro completo antes de agir — uma mistura rara que se encaixa bem em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 3, "Ganhar com base nas suas próprias convicções") &&
      pick(a, 13, "Quem não arrisca não petisca"),
    text: (area) =>
      `Você confia nas suas próprias leituras e não tem medo de agir com convicção mesmo sob incerteza — o tipo de apetite por risco que ${area} recompensa.`,
  },
  {
    test: (a) =>
      pick(a, 8, "TikTok/Pinterest/Canva") && pick(a, 4, "Comédia"),
    text: (area) =>
      `Criatividade e leveza fazem parte de quem você é — e são exatamente os ingredientes que tornam alguém bom em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 9, "Bater metas e ver o resultado direto no faturamento") &&
      pick(a, 3, "Bater uma meta e ser reconhecido"),
    text: (area) =>
      `Você é movido a resultado mensurável e reconhecimento direto — a energia que define quem se destaca em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 5, "Direito / Regulamentação / Governança") &&
      pick(a, 12, "Falta de regras claras"),
    text: (area) =>
      `Regras claras e governança bem definida não te incomodam — pelo contrário, é onde você se sente confortável, o que é essencial em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 0, "Lê um artigo longo ou livro") && pick(a, 5, "Economia / Estatística"),
    text: (area) =>
      `Curiosidade profunda e gosto por entender os porquês — essa combinação é a base de quem se destaca em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 10, "Sou o que mantém o grupo junto") &&
      pick(a, 6, "segura tudo junto quando o grupo tá perdido"),
    text: (area) =>
      `Você é o ponto de estabilidade em qualquer grupo — as pessoas confiam em você para resolver o que ninguém mais quer resolver, um traço central em ${area}.`,
  },
];
