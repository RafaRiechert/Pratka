import type { Sector } from "@/lib/types";

export type QuizAreaCode =
  | "IB"
  | "Trading"
  | "Research"
  | "Corporate"
  | "Consultoria"
  | "Fintech"
  | "Marketing"
  | "RH";

export interface QuizOption {
  text: string;
  areas: QuizAreaCode[];
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "É sábado de manhã e você não tem nada marcado. O que faz?",
    options: [
      { text: "Abre o computador e trabalha em algo que ficou pendente", areas: ["IB"] },
      { text: "Checa como os mercados fecharam e lê notícias financeiras", areas: ["Trading"] },
      { text: "Lê um artigo longo ou livro sobre um tema que te fascinou", areas: ["Research"] },
      { text: "Encontra amigos — precisa de gente ao redor", areas: ["Corporate", "RH"] },
      { text: "Trabalha em um projeto criativo pessoal (vídeo, design, música)", areas: ["Marketing"] },
      { text: "Organiza sua vida, planeja a semana, faz listas", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Como você prefere resolver um problema complexo?",
    options: [
      { text: "Montando uma planilha detalhada para analisar todos os cenários", areas: ["IB"] },
      { text: "Tomando uma decisão rápida com base no instinto e nos dados disponíveis", areas: ["Trading"] },
      { text: "Pesquisando a fundo até formar uma opinião sólida", areas: ["Research"] },
      { text: "Conversando com as pessoas envolvidas para entender perspectivas", areas: ["Corporate", "RH"] },
      { text: "Fazendo um brainstorm criativo com ideias fora da caixa", areas: ["Marketing"] },
      { text: "Quebrando o problema em partes menores e resolvendo uma por uma", areas: ["Consultoria"] },
    ],
  },
  {
    question: "O que te motiva mais no trabalho?",
    options: [
      { text: "Fechar um grande deal e ver o impacto concreto", areas: ["IB"] },
      { text: "Ganhar dinheiro com base nas suas próprias convicções", areas: ["Trading"] },
      { text: "Entender profundamente como uma empresa ou setor funciona", areas: ["Research"] },
      { text: "Construir relacionamentos de longo prazo", areas: ["Corporate"] },
      { text: "Criar algo que as pessoas vejam, sintam e comentem", areas: ["Marketing"] },
      { text: "Resolver um problema que ninguém conseguiu resolver antes", areas: ["Consultoria"] },
      { text: "Desenvolver pessoas e ver elas crescerem", areas: ["RH"] },
      { text: "Construir tecnologia que muda como as coisas funcionam", areas: ["Fintech"] },
    ],
  },
  {
    question: "Qual matéria da faculdade você mais curte (ou curtiria)?",
    options: [
      { text: "Contabilidade / Finanças corporativas", areas: ["IB"] },
      { text: "Economia / Estatística / Modelagem", areas: ["Research", "Trading"] },
      { text: "Marketing / Comunicação / Comportamento do consumidor", areas: ["Marketing"] },
      { text: "Programação / Tecnologia / Ciência de dados", areas: ["Fintech"] },
      { text: "Psicologia / Gestão de pessoas / Liderança", areas: ["RH"] },
      { text: "Estratégia / Administração / Casos de negócio", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Como você lida com pressão e prazos apertados?",
    options: [
      { text: "Funciono melhor sob pressão — me organizo e entrego", areas: ["IB"] },
      { text: "Adoro a adrenalina — quanto mais rápido, melhor", areas: ["Trading"] },
      { text: "Se o tema me interessa, a pressão nem me afeta", areas: ["Research"] },
      { text: "Prefiro planejar com antecedência e evitar correria", areas: ["Consultoria"] },
      { text: "Pressão me dá energia criativa — faço meu melhor trabalho assim", areas: ["Marketing"] },
      { text: "Divido tarefas com o time para que ninguém fique sobrecarregado", areas: ["RH"] },
    ],
  },
  {
    question: "Você prefere trabalhar com...",
    options: [
      { text: "Poucos projetos grandes e complexos ao longo de meses", areas: ["IB"] },
      { text: "Decisões rápidas que mudam a cada minuto", areas: ["Trading"] },
      { text: "Análise profunda de um tema específico por semanas", areas: ["Research"] },
      { text: "Muitos clientes diferentes ao longo do dia", areas: ["Corporate"] },
      { text: "Campanhas e lançamentos que têm começo, meio e fim", areas: ["Marketing"] },
      { text: "Dados e algoritmos que automatizam processos", areas: ["Fintech"] },
      { text: "Pessoas — entrevistas, treinamentos, dinâmicas de grupo", areas: ["RH"] },
    ],
  },
  {
    question: "Qual destes perfis mais combina com você?",
    options: [
      { text: "Perfeccionista — não entrega nada sem revisar três vezes", areas: ["IB"] },
      { text: "Competitivo — gosta de ter score e comparar resultados", areas: ["Trading"] },
      { text: "Curioso — investiga até o fim e forma opinião própria", areas: ["Research"] },
      { text: "Comunicativo — gosta de apresentar ideias e convencer", areas: ["Corporate", "Consultoria"] },
      { text: "Criativo — sempre pensando em jeitos novos de fazer as coisas", areas: ["Marketing"] },
      { text: "Analítico — ama dados, padrões e números", areas: ["Fintech"] },
      { text: "Empático — entende as pessoas e sabe o que elas precisam", areas: ["RH"] },
    ],
  },
  {
    question: "O que te atrairia mais em uma empresa?",
    options: [
      { text: "Participar de operações bilionárias (fusões, IPOs, emissões de dívida)", areas: ["IB"] },
      { text: "Acompanhar mercados globais e tomar posições em tempo real", areas: ["Trading"] },
      { text: "Produzir análises que influenciam decisões de investimento", areas: ["Research"] },
      { text: "Ser o ponto de contato entre a empresa e grandes clientes", areas: ["Corporate"] },
      { text: "Criar a identidade e a voz de uma marca reconhecida", areas: ["Marketing"] },
      { text: "Construir produtos digitais que milhões de pessoas usam", areas: ["Fintech"] },
      { text: "Montar times incríveis e desenvolver talentos", areas: ["RH"] },
      { text: "Resolver o problema estratégico mais difícil da empresa", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Qual frase mais te representa?",
    options: [
      { text: "“O detalhe faz a diferença”", areas: ["IB"] },
      { text: "“Velocidade é tudo”", areas: ["Trading"] },
      { text: "“Dados contam a história real”", areas: ["Research", "Fintech"] },
      { text: "“Pessoas são meu maior ativo”", areas: ["Corporate", "RH"] },
      { text: "“Uma boa história muda tudo”", areas: ["Marketing"] },
      { text: "“Se dá pra automatizar, automatiza”", areas: ["Fintech"] },
      { text: "“Gente certa no lugar certo muda o jogo”", areas: ["RH"] },
      { text: "“Todo problema tem uma estrutura por trás”", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Como você imagina sua rotina ideal de trabalho?",
    options: [
      { text: "Intensa, com noites longas, mas com projetos transformadores", areas: ["IB"] },
      { text: "Rápida, acompanhando mercados em tempo real com telas e gráficos", areas: ["Trading"] },
      { text: "Focada, mergulhando fundo em setores e empresas por semanas", areas: ["Research"] },
      { text: "Dinâmica, reuniões com clientes diferentes todos os dias", areas: ["Corporate"] },
      { text: "Criativa, pensando em conceitos, visuais e mensagens", areas: ["Marketing"] },
      { text: "Técnica, escrevendo código e construindo produtos", areas: ["Fintech"] },
      { text: "Colaborativa, trabalhando em equipe e desenvolvendo pessoas", areas: ["RH"] },
      { text: "Estruturada, resolvendo problemas com frameworks e apresentações", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Um amigo te pede ajuda para lançar um negócio. Qual papel você assume?",
    options: [
      { text: "Monto o modelo financeiro e planilha de projeções", areas: ["IB"] },
      { text: "Cuido da parte de investimento — onde alocar e quando", areas: ["Trading"] },
      { text: "Pesquiso o mercado a fundo antes de dar qualquer passo", areas: ["Research"] },
      { text: "Saio ligando para possíveis clientes e parceiros", areas: ["Corporate"] },
      { text: "Crio a marca, o nome, a identidade visual e o pitch", areas: ["Marketing"] },
      { text: "Construo o site, o app ou a plataforma", areas: ["Fintech"] },
      { text: "Monto o time e defino quem faz o quê", areas: ["RH"] },
      { text: "Estruturo o plano de negócios e a estratégia", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Qual tipo de conteúdo você mais consome?",
    options: [
      { text: "Relatórios financeiros, earnings calls e balanços", areas: ["IB"] },
      { text: "Bloomberg, InfoMoney, cotações e análises de mercado", areas: ["Trading"] },
      { text: "Artigos longos, papers acadêmicos, livros de não-ficção", areas: ["Research"] },
      { text: "Podcasts de negócios, networking events, lives com executivos", areas: ["Corporate"] },
      { text: "Redes sociais, tendências culturais, cases de branding", areas: ["Marketing"] },
      { text: "Newsletters de tech, Product Hunt, GitHub, TechCrunch", areas: ["Fintech"] },
      { text: "Conteúdo sobre liderança, cultura organizacional, gestão de pessoas", areas: ["RH"] },
      { text: "Estudos de caso, Harvard Business Review, frameworks", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Em uma apresentação em grupo, qual papel você assume?",
    options: [
      { text: "Monto os slides com dados, gráficos e números", areas: ["IB"] },
      { text: "Desafio as ideias do grupo para garantir que estão certas", areas: ["Trading"] },
      { text: "Faço a pesquisa de base que sustenta tudo", areas: ["Research"] },
      { text: "Apresento — gosto de estar na frente falando", areas: ["Corporate", "Consultoria"] },
      { text: "Cuido do visual, do storytelling e de como a mensagem chega", areas: ["Marketing"] },
      { text: "Monto a parte técnica ou a demo", areas: ["Fintech"] },
      { text: "Coordeno o grupo e garanto que todo mundo contribui", areas: ["RH"] },
    ],
  },
  {
    question: "O que mais te incomoda no trabalho?",
    options: [
      { text: "Trabalho sem impacto — quero ver resultados concretos", areas: ["IB"] },
      { text: "Lentidão — decisões que demoram demais me frustram", areas: ["Trading"] },
      { text: "Superficialidade — odeio quando ninguém vai a fundo", areas: ["Research"] },
      { text: "Trabalhar isolado — preciso de interação com pessoas", areas: ["Corporate", "RH"] },
      { text: "Falta de criatividade — fazer sempre a mesma coisa me mata", areas: ["Marketing"] },
      { text: "Processos manuais que poderiam ser automatizados", areas: ["Fintech"] },
      { text: "Ambiente tóxico — cultura importa mais que salário", areas: ["RH"] },
      { text: "Falta de estratégia — agir sem pensar me irrita", areas: ["Consultoria"] },
    ],
  },
  {
    question: "Se você pudesse jantar com alguém, quem seria?",
    options: [
      { text: "Um sócio de banco de investimento que fez deals históricos", areas: ["IB"] },
      { text: "Um trader lendário como Ray Dalio ou George Soros", areas: ["Trading"] },
      { text: "Warren Buffett — para entender como ele pensa", areas: ["Research"] },
      { text: "Um CEO que construiu uma empresa do zero com boas relações", areas: ["Corporate"] },
      { text: "Um diretor criativo de uma marca icônica como Nike ou Apple", areas: ["Marketing"] },
      { text: "Elon Musk ou um fundador de fintech disruptiva", areas: ["Fintech"] },
      { text: "Um líder conhecido por construir culturas incríveis", areas: ["RH"] },
      { text: "Um consultor que já resolveu crises de empresas da Fortune 500", areas: ["Consultoria"] },
    ],
  },
];

export interface QuizResultInfo {
  name: string;
  description: string;
  /** Sector filter to preselect when linking back to the empresas section. */
  sector?: Sector;
}

export const quizResults: Record<QuizAreaCode, QuizResultInfo> = {
  IB: {
    name: "Investment Banking",
    description:
      "Você é detalhista, resiliente e movido por grandes entregas. Fusões, IPOs e operações bilionárias são o seu habitat natural. Você não tem medo de noites longas se o projeto vale a pena.",
    sector: "Banco de Investimento",
  },
  Trading: {
    name: "Sales & Trading",
    description:
      "Você vive de adrenalina e decisões rápidas. Acompanhar mercados em tempo real e tomar posições com convicção é o que te faz brilhar. Competitividade é seu combustível.",
    sector: "Banco de Investimento",
  },
  Research: {
    name: "Equity Research / Asset Management",
    description:
      "Você é o investigador. Adora mergulhar fundo em empresas e setores, formar uma tese e defender com dados. Curiosidade é sua principal ferramenta.",
    sector: "Banco de Investimento",
  },
  Corporate: {
    name: "Corporate Banking / Relacionamento",
    description:
      "Você é o construtor de relacionamentos. Entende que negócios são feitos entre pessoas e que confiança se constrói ao longo do tempo. Seu talento é conectar.",
    sector: "Banco de Investimento",
  },
  Consultoria: {
    name: "Consultoria Estratégica",
    description:
      "Você é o solucionador de problemas. Pega qualquer desafio, quebra em partes, estrutura e apresenta a resposta. Frameworks e método são sua linguagem.",
    sector: "Consultoria",
  },
  Fintech: {
    name: "Fintech / Tecnologia",
    description:
      "Você quer mudar como as coisas funcionam. Se existe um processo manual, você já está pensando em como automatizar. Dados, código e produto são o seu mundo.",
  },
  Marketing: {
    name: "Marketing / Branding",
    description:
      "Você é o contador de histórias. Entende que percepção é realidade e que uma boa narrativa move pessoas. Criatividade e estética são sua vantagem competitiva.",
  },
  RH: {
    name: "Recursos Humanos / People",
    description:
      "Você é o arquiteto de cultura. Entende que empresas são feitas de pessoas e que colocar a pessoa certa no lugar certo é o que muda o jogo.",
  },
};
