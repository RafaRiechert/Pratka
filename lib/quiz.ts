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
    question: "Em um trabalho de faculdade em grupo, qual papel você naturalmente assume?",
    options: [
      { id: "q1o1", text: "Monto a parte quantitativa — planilhas, gráficos e projeções", areas: ["IB", "Risco"] },
      { id: "q1o2", text: "Faço a pesquisa de fundo que embasa todo o argumento", areas: ["Research", "Asset"] },
      { id: "q1o3", text: "Estruturo o raciocínio e o roteiro da apresentação", areas: ["Consultoria"] },
      { id: "q1o4", text: "Apresento para a turma — gosto de estar na frente", areas: ["Corporate", "Varejo"] },
      { id: "q1o5", text: "Cuido do visual, do design dos slides e do storytelling", areas: ["Marketing"] },
      { id: "q1o6", text: "Coordeno o grupo, divido tarefas e cobro prazos", areas: ["RH"] },
      { id: "q1o7", text: "Monto o protótipo, a automação ou a demo técnica", areas: ["Fintech"] },
      { id: "q1o8", text: "Questiono as premissas do grupo para fortalecer o argumento", areas: ["Trading", "PEVC"] },
    ],
  },
  {
    id: "q2",
    question: "Qual tipo de estágio ou projeto acadêmico mais te atrairia?",
    options: [
      { id: "q2o1", text: "Participar de uma operação real de fusão ou aquisição", areas: ["IB"] },
      { id: "q2o2", text: "Operar uma carteira de investimentos simulada com ranking de performance", areas: ["Trading"] },
      { id: "q2o3", text: "Escrever um relatório aprofundado sobre uma empresa listada na bolsa", areas: ["Research", "Asset"] },
      { id: "q2o4", text: "Acompanhar reuniões com clientes corporativos de grande porte", areas: ["Corporate"] },
      { id: "q2o5", text: "Desenvolver uma estratégia de go-to-market para um produto novo", areas: ["Marketing", "Consultoria"] },
      { id: "q2o6", text: "Construir uma solução tecnológica para um problema financeiro", areas: ["Fintech"] },
      { id: "q2o7", text: "Analisar o portfólio de uma empresa de venture capital", areas: ["PEVC"] },
      { id: "q2o8", text: "Mapear riscos operacionais e propor controles para uma instituição", areas: ["Risco"] },
      { id: "q2o9", text: "Liderar um processo de recrutamento ou programa de desenvolvimento", areas: ["RH"] },
      { id: "q2o10", text: "Montar uma estratégia comercial para aumentar vendas de um produto", areas: ["Varejo"] },
    ],
  },
  {
    id: "q3",
    question: "Como você prefere resolver um problema complexo em um projeto?",
    options: [
      { id: "q3o1", text: "Montando um modelo detalhado para analisar todos os cenários possíveis", areas: ["IB", "Risco"] },
      { id: "q3o2", text: "Tomando uma decisão rápida com base nos dados disponíveis e ajustando depois", areas: ["Trading"] },
      { id: "q3o3", text: "Pesquisando referências e casos similares até formar uma opinião fundamentada", areas: ["Research", "Asset"] },
      { id: "q3o4", text: "Ouvindo diferentes stakeholders para entender todas as perspectivas", areas: ["Corporate", "RH"] },
      { id: "q3o5", text: "Quebrando o problema em partes e atacando cada uma com método", areas: ["Consultoria"] },
      { id: "q3o6", text: "Prototipando uma solução rápida, testando e iterando", areas: ["Fintech", "PEVC"] },
      { id: "q3o7", text: "Criando uma narrativa visual que torne o problema claro para todos", areas: ["Marketing"] },
      { id: "q3o8", text: "Convencendo o time da melhor abordagem antes de começar a executar", areas: ["Varejo", "Corporate"] },
    ],
  },
  {
    id: "q4",
    question: "O que mais te motiva em um ambiente profissional?",
    options: [
      { id: "q4o1", text: "Participar de projetos de grande escala com impacto visível no mercado", areas: ["IB"] },
      { id: "q4o2", text: "Tomar decisões com consequências imediatas e mensuráveis", areas: ["Trading"] },
      { id: "q4o3", text: "Dominar um assunto tão profundamente que me torno referência nele", areas: ["Research"] },
      { id: "q4o4", text: "Construir portfólios que geram retorno consistente ao longo do tempo", areas: ["Asset", "PEVC"] },
      { id: "q4o5", text: "Ser o ponto de confiança entre a empresa e seus clientes", areas: ["Corporate"] },
      { id: "q4o6", text: "Resolver desafios estratégicos que ninguém mais conseguiu", areas: ["Consultoria"] },
      { id: "q4o7", text: "Criar campanhas e posicionamentos que transformam a percepção de uma marca", areas: ["Marketing"] },
      { id: "q4o8", text: "Superar metas e ser reconhecido diretamente pelo resultado", areas: ["Varejo"] },
      { id: "q4o9", text: "Construir produtos ou sistemas que melhoram processos existentes", areas: ["Fintech"] },
      { id: "q4o10", text: "Garantir que a operação funcione de forma segura e dentro das normas", areas: ["Risco"] },
      { id: "q4o11", text: "Desenvolver talentos e construir equipes de alta performance", areas: ["RH"] },
    ],
  },
  {
    id: "q5",
    question: "Qual disciplina da faculdade você mais se identificou (ou se identificaria)?",
    options: [
      { id: "q5o1", text: "Contabilidade, Valuation ou Finanças Corporativas", areas: ["IB", "Risco"] },
      { id: "q5o2", text: "Macroeconomia, Estatística ou Econometria", areas: ["Research", "Trading"] },
      { id: "q5o3", text: "Estratégia Empresarial ou Estudos de Caso", areas: ["Consultoria"] },
      { id: "q5o4", text: "Marketing, Comportamento do Consumidor ou Comunicação", areas: ["Marketing", "Varejo"] },
      { id: "q5o5", text: "Programação, Ciência de Dados ou Inteligência Artificial", areas: ["Fintech"] },
      { id: "q5o6", text: "Gestão de Pessoas, Psicologia Organizacional ou Liderança", areas: ["RH"] },
      { id: "q5o7", text: "Empreendedorismo, Inovação ou Venture Capital", areas: ["PEVC", "Fintech"] },
      { id: "q5o8", text: "Direito Empresarial, Regulamentação ou Governança Corporativa", areas: ["Risco"] },
      { id: "q5o9", text: "Gestão Comercial, Negociação ou Vendas", areas: ["Varejo", "Corporate"] },
      { id: "q5o10", text: "Análise de Investimentos, Renda Fixa ou Gestão de Carteiras", areas: ["Asset"] },
    ],
  },
  {
    id: "q6",
    question: "Você está liderando uma equipe em um projeto importante. O prazo apertou. Como você reage?",
    options: [
      { id: "q6o1", text: "Foco total — cancelo tudo e trabalho até entregar com a qualidade que exijo", areas: ["IB"] },
      { id: "q6o2", text: "Priorizo o essencial, corto o que não é crítico e entrego rápido", areas: ["Trading", "Fintech"] },
      { id: "q6o3", text: "Revisito o escopo com calma para garantir que o resultado tenha consistência", areas: ["Research", "Asset"] },
      { id: "q6o4", text: "Redistribuo tarefas no time para que ninguém fique sobrecarregado", areas: ["RH", "Corporate"] },
      { id: "q6o5", text: "Monto um plano de contingência estruturado com entregas parciais", areas: ["Consultoria", "Risco"] },
      { id: "q6o6", text: "Transformo a pressão em energia criativa e entrego algo surpreendente", areas: ["Marketing"] },
      { id: "q6o7", text: "Negocio diretamente com quem precisa da entrega para ajustar prazo e expectativa", areas: ["Varejo", "Corporate"] },
      { id: "q6o8", text: "Aposto no caminho mais ousado — o risco compensa se der certo", areas: ["PEVC"] },
    ],
  },
  {
    id: "q7",
    question: "Qual tipo de conteúdo profissional você mais consome no dia a dia?",
    options: [
      { id: "q7o1", text: "Relatórios de earnings, balanços e análises de empresas", areas: ["IB", "Research"] },
      { id: "q7o2", text: "Cotações, análises de mercado e notícias da Bloomberg ou InfoMoney", areas: ["Trading", "Asset"] },
      { id: "q7o3", text: "Estudos de caso, artigos da HBR ou frameworks de estratégia", areas: ["Consultoria"] },
      { id: "q7o4", text: "Newsletters de tecnologia, Product Hunt ou tendências de inovação", areas: ["Fintech", "PEVC"] },
      { id: "q7o5", text: "Cases de branding, tendências de comunicação e campanhas premiadas", areas: ["Marketing"] },
      { id: "q7o6", text: "Conteúdo sobre liderança, cultura organizacional e gestão de equipes", areas: ["RH"] },
      { id: "q7o7", text: "Podcasts de negócios e entrevistas com executivos e empreendedores", areas: ["Corporate", "PEVC"] },
      { id: "q7o8", text: "Regulamentação financeira, normas do Bacen ou atualizações de compliance", areas: ["Risco"] },
      { id: "q7o9", text: "Estratégias de vendas, funis de conversão e métricas comerciais", areas: ["Varejo"] },
    ],
  },
  {
    id: "q8",
    question: "Qual formato de trabalho mais combina com o seu perfil?",
    options: [
      { id: "q8o1", text: "Poucos projetos grandes e complexos ao longo de meses", areas: ["IB", "PEVC"] },
      { id: "q8o2", text: "Decisões frequentes e rápidas ao longo de todo o dia", areas: ["Trading"] },
      { id: "q8o3", text: "Análise aprofundada de um setor ou empresa por semanas", areas: ["Research", "Asset"] },
      { id: "q8o4", text: "Reuniões com diferentes clientes e stakeholders todos os dias", areas: ["Corporate", "Varejo"] },
      { id: "q8o5", text: "Campanhas e projetos criativos com começo, meio e fim", areas: ["Marketing"] },
      { id: "q8o6", text: "Desenvolvimento técnico — código, dados e construção de produtos", areas: ["Fintech"] },
      { id: "q8o7", text: "Processos de seleção, treinamento e desenvolvimento de equipes", areas: ["RH"] },
      { id: "q8o8", text: "Monitoramento de indicadores, controles e processos regulatórios", areas: ["Risco"] },
      { id: "q8o9", text: "Projetos curtos e intensos resolvendo um problema diferente a cada vez", areas: ["Consultoria"] },
    ],
  },
  {
    id: "q9",
    question: "Em uma competição de cases na faculdade, qual papel você escolheria?",
    options: [
      { id: "q9o1", text: "Construir o modelo financeiro e as projeções de receita", areas: ["IB", "Risco"] },
      { id: "q9o2", text: "Analisar o mercado e os concorrentes em profundidade", areas: ["Research", "Asset"] },
      { id: "q9o3", text: "Estruturar o argumento estratégico e o framework de análise", areas: ["Consultoria"] },
      { id: "q9o4", text: "Apresentar o case para a banca com confiança e persuasão", areas: ["Corporate", "Varejo"] },
      { id: "q9o5", text: "Criar o pitch deck com visual impactante e narrativa convincente", areas: ["Marketing"] },
      { id: "q9o6", text: "Desenvolver a solução tecnológica ou o protótipo do produto", areas: ["Fintech"] },
      { id: "q9o7", text: "Avaliar a viabilidade do investimento e o retorno esperado", areas: ["PEVC", "Trading"] },
      { id: "q9o8", text: "Coordenar o time e garantir que todos contribuam no prazo", areas: ["RH"] },
    ],
  },
  {
    id: "q10",
    question: "Se você pudesse escolher qualquer área para estagiar amanhã, qual seria?",
    options: [
      { id: "q10o1", text: "M&A, IPOs ou emissão de dívida em um banco de investimento", areas: ["IB"] },
      { id: "q10o2", text: "Mesa de operações acompanhando mercados em tempo real", areas: ["Trading"] },
      { id: "q10o3", text: "Time de research produzindo relatórios e recomendações de ações", areas: ["Research"] },
      { id: "q10o4", text: "Gestão de portfólio em uma asset ou family office", areas: ["Asset"] },
      { id: "q10o5", text: "Relacionamento com clientes corporativos em um banco", areas: ["Corporate"] },
      { id: "q10o6", text: "Projeto de estratégia em uma consultoria como McKinsey ou BCG", areas: ["Consultoria"] },
      { id: "q10o7", text: "Produto ou engenharia em uma fintech ou startup de tecnologia", areas: ["Fintech"] },
      { id: "q10o8", text: "Marketing, branding ou comunicação de uma empresa reconhecida", areas: ["Marketing"] },
      { id: "q10o9", text: "Recrutamento e desenvolvimento de talentos em uma grande empresa", areas: ["RH"] },
      { id: "q10o10", text: "Equipe comercial com metas de vendas e contato direto com clientes", areas: ["Varejo"] },
      { id: "q10o11", text: "Análise de investimentos em um fundo de private equity ou venture capital", areas: ["PEVC"] },
      { id: "q10o12", text: "Compliance, gestão de risco ou auditoria interna", areas: ["Risco"] },
    ],
  },
  {
    id: "q11",
    question: "Qual habilidade você mais gostaria de desenvolver na sua carreira?",
    options: [
      { id: "q11o1", text: "Modelagem financeira e valuation avançado", areas: ["IB", "PEVC"] },
      { id: "q11o2", text: "Leitura de mercado e tomada de decisão sob incerteza", areas: ["Trading"] },
      { id: "q11o3", text: "Análise setorial aprofundada e formação de tese de investimento", areas: ["Research", "Asset"] },
      { id: "q11o4", text: "Negociação e construção de relacionamentos estratégicos", areas: ["Corporate", "Varejo"] },
      { id: "q11o5", text: "Pensamento estruturado e resolução de problemas complexos", areas: ["Consultoria"] },
      { id: "q11o6", text: "Programação, análise de dados e construção de produtos digitais", areas: ["Fintech"] },
      { id: "q11o7", text: "Storytelling, branding e comunicação estratégica", areas: ["Marketing"] },
      { id: "q11o8", text: "Gestão de equipes, coaching e desenvolvimento organizacional", areas: ["RH"] },
      { id: "q11o9", text: "Gestão de risco, governança e regulamentação financeira", areas: ["Risco"] },
    ],
  },
  {
    id: "q12",
    question: "Qual perfil profissional mais combina com você?",
    options: [
      { id: "q12o1", text: "Detalhista e perfeccionista — a qualidade da entrega é inegociável", areas: ["IB", "Risco"] },
      { id: "q12o2", text: "Competitivo e orientado a resultado — gosto de disputar e vencer", areas: ["Trading", "Varejo"] },
      { id: "q12o3", text: "Investigativo e curioso — preciso entender o porquê de tudo", areas: ["Research", "Fintech"] },
      { id: "q12o4", text: "Comunicativo e persuasivo — sei apresentar e convencer", areas: ["Corporate", "Varejo"] },
      { id: "q12o5", text: "Criativo e original — enxergo soluções onde outros veem padrões", areas: ["Marketing"] },
      { id: "q12o6", text: "Analítico e lógico — números e dados me guiam naturalmente", areas: ["Fintech", "Asset"] },
      { id: "q12o7", text: "Empático e colaborativo — entendo o que as pessoas precisam", areas: ["RH"] },
      { id: "q12o8", text: "Estratégico e metódico — penso sempre três passos à frente", areas: ["Consultoria", "PEVC"] },
    ],
  },
  {
    id: "q13",
    question: "O que mais te frustraria em um ambiente de trabalho?",
    options: [
      { id: "q13o1", text: "Trabalhar em projetos sem impacto real ou visibilidade", areas: ["IB", "PEVC"] },
      { id: "q13o2", text: "Processos lentos de decisão quando a oportunidade exige agilidade", areas: ["Trading"] },
      { id: "q13o3", text: "Análises superficiais feitas sem rigor ou profundidade", areas: ["Research", "Asset"] },
      { id: "q13o4", text: "Um ambiente individualista sem colaboração ou interação", areas: ["Corporate", "Varejo", "RH"] },
      { id: "q13o5", text: "Rotina repetitiva sem espaço para inovação ou criatividade", areas: ["Marketing", "Fintech"] },
      { id: "q13o6", text: "Ausência de métricas claras para medir o meu resultado", areas: ["Varejo", "Trading"] },
      { id: "q13o7", text: "Falta de processos, governança ou organização mínima", areas: ["Risco", "Consultoria"] },
      { id: "q13o8", text: "Cultura tóxica que não valoriza o desenvolvimento das pessoas", areas: ["RH"] },
    ],
  },
  {
    id: "q14",
    question: "Qual frase mais representa a sua mentalidade profissional?",
    options: [
      { id: "q14o1", text: "A excelência está nos detalhes", areas: ["IB", "Risco"] },
      { id: "q14o2", text: "Quem hesita perde a oportunidade", areas: ["Trading"] },
      { id: "q14o3", text: "Conhecimento profundo é a maior vantagem competitiva", areas: ["Research", "Asset"] },
      { id: "q14o4", text: "Grandes negócios são construídos sobre grandes relacionamentos", areas: ["Corporate", "RH"] },
      { id: "q14o5", text: "Uma narrativa bem construída transforma percepções", areas: ["Marketing"] },
      { id: "q14o6", text: "Se existe um processo manual, existe uma oportunidade de automação", areas: ["Fintech"] },
      { id: "q14o7", text: "O maior risco é não assumir risco nenhum", areas: ["PEVC", "Trading"] },
      { id: "q14o8", text: "Método e disciplina superam talento sem estrutura", areas: ["Consultoria", "Risco"] },
      { id: "q14o9", text: "Resultado é a melhor forma de provar competência", areas: ["Varejo", "Corporate"] },
    ],
  },
  {
    id: "q15",
    question: "Imagine que você vai fundar uma empresa. Qual seria o seu papel principal?",
    options: [
      { id: "q15o1", text: "CFO — estruturo as finanças, a captação e o modelo de receita", areas: ["IB", "Risco"] },
      { id: "q15o2", text: "Head de Investimentos — decido onde alocar capital para crescer", areas: ["Asset", "Trading"] },
      { id: "q15o3", text: "Head de Estratégia — defino para onde a empresa vai e como chegar lá", areas: ["Consultoria", "PEVC"] },
      { id: "q15o4", text: "Head de Produto — construo a tecnologia e a experiência do usuário", areas: ["Fintech"] },
      { id: "q15o5", text: "CMO — crio a marca, o posicionamento e a comunicação", areas: ["Marketing"] },
      { id: "q15o6", text: "Head de Vendas — monto o time comercial e trago os primeiros clientes", areas: ["Varejo", "Corporate"] },
      { id: "q15o7", text: "Head de People — recruto o time fundador e construo a cultura", areas: ["RH"] },
      { id: "q15o8", text: "Head de Research — analiso o mercado em profundidade antes de qualquer decisão", areas: ["Research"] },
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
      pick(a, 0, "Monto a parte quantitativa") &&
      pick(a, 4, "Contabilidade, Valuation"),
    text: (area) =>
      `Sua inclinação por modelagem e análise quantitativa é exatamente o que profissionais de ${area} fazem todos os dias.`,
  },
  {
    test: (a) =>
      pick(a, 2, "Tomando uma decisão rápida") &&
      pick(a, 7, "Decisões frequentes e rápidas"),
    text: (area) =>
      `Você prefere agir com velocidade e ajustar no caminho — o ritmo exato que ${area} exige.`,
  },
  {
    test: (a) =>
      pick(a, 5, "cancelo tudo e trabalho até entregar") &&
      pick(a, 11, "Detalhista e perfeccionista"),
    text: (area) =>
      `Sua combinação de perfeccionismo e resiliência sob pressão é rara — e é exatamente o que ${area} demanda.`,
  },
  {
    test: (a) =>
      pick(a, 0, "Apresento para a turma") && pick(a, 3, "ponto de confiança"),
    text: (area) =>
      `Comunicação e presença são as suas armas — habilidades centrais para quem quer se destacar em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 1, "relatório aprofundado sobre uma empresa") &&
      pick(a, 6, "Relatórios de earnings"),
    text: (area) =>
      `Você já consome e produz o tipo de análise que sustenta uma tese de investimento — a matéria-prima do trabalho em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 7, "Análise aprofundada de um setor") &&
      pick(a, 10, "Análise setorial aprofundada"),
    text: (area) =>
      `Você tem paciência para ir fundo em um tema por semanas até formar convicção — a disciplina que separa quem se destaca em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 0, "Estruturo o raciocínio") &&
      pick(a, 2, "Quebrando o problema em partes"),
    text: (area) =>
      `Pensamento estruturado é o seu default: você organiza o caos antes de atacá-lo, que é literalmente o método de ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 1, "solução tecnológica para um problema financeiro") &&
      pick(a, 13, "oportunidade de automação"),
    text: (area) =>
      `Você enxerga tecnologia como alavanca para resolver problemas de negócio — a mentalidade que move ${area}.`,
  },
  {
    test: (a) => pick(a, 0, "Cuido do visual") && pick(a, 8, "pitch deck"),
    text: (area) =>
      `Você sabe que uma boa ideia mal comunicada não convence ninguém — e é por isso que ${area} combina tanto com você.`,
  },
  {
    test: (a) => pick(a, 0, "Coordeno o grupo") && pick(a, 14, "Head de People"),
    text: (area) =>
      `Coordenar pessoas e destravar o time é algo que você faz naturalmente — a competência central de ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 3, "Superar metas") && pick(a, 12, "Ausência de métricas claras"),
    text: (area) =>
      `Você é movido a meta e resultado mensurável — a energia que define quem cresce rápido em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 6, "Newsletters de tecnologia") &&
      pick(a, 13, "O maior risco é não assumir risco nenhum"),
    text: (area) =>
      `Você acompanha inovação de perto e não tem medo de apostar em teses novas — exatamente o perfil que ${area} procura.`,
  },
  {
    test: (a) =>
      pick(a, 4, "Direito Empresarial") && pick(a, 12, "Falta de processos"),
    text: (area) =>
      `Governança e processo bem definido não te incomodam — pelo contrário, é onde você opera melhor, o que é essencial em ${area}.`,
  },
  {
    test: (a) =>
      pick(a, 0, "Questiono as premissas") &&
      pick(a, 10, "tomada de decisão sob incerteza"),
    text: (area) =>
      `Você questiona o consenso e se sente confortável decidindo sem ter todas as respostas — o tipo de cabeça que ${area} recompensa.`,
  },
  {
    test: (a) =>
      pick(a, 9, "M&A, IPOs") && pick(a, 10, "Modelagem financeira"),
    text: (area) =>
      `Você já sabe qual habilidade quer dominar e em qual mesa quer sentar — e as duas apontam direto para ${area}.`,
  },
];
