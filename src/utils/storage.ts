/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export interface LeadFile {
  name: string;
  size: string;
  type: string;
  dataUrl?: string;
}

export interface LeadEstimatorData {
  tipologia: string;
  areaParedeM2: number;
  peDireito: number;
  pavimentosOuUnidades: number;
  cicloDesejado: string;
  areaFormasCalculada: number;
  jogosEstimados: number;
  acessoriosEstimados: {
    pinosCunhas: number;
    tirantes: number;
    alinhadores: number;
  };
  economiaEstimadaReais: number;
  diasPoupados: number;
}

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  segmentoObra?: string;
  localizacaoObra?: string;
  prazoInicio?: string;
  temProjeto?: string;
  mensagem: string;
  arquivos?: LeadFile[];
  dadosEstimador?: LeadEstimatorData;
  status: 'Novo' | 'Em Atendimento' | 'Fechado' | 'Descartado';
  date: string;
  source: 'Contato' | 'Estimador' | 'Blog' | 'WhatsApp' | 'Produto';
}

export interface SiteTexts {
  companyName?: string;
  companyTagline?: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutHistory: string;
  aboutMission: string;
  aboutVision: string;
  aboutValues: string;
  contactAddress: string;
  contactWhatsapp: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  contactCityState: string;
  contactCep: string;
  contactWhatsappMessage: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
}

export interface BlogPostComment {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'engenharia' | 'seguranca' | 'sustentabilidade' | 'reforma';
  categoryLabel: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  tags: string[];
  likes: number;
  comments: BlogPostComment[];
}

const defaultTexts: SiteTexts = {
  companyName: 'FUNDIFERRO',
  companyTagline: 'Engenharia de Formas & Concreto',
  heroTitle: 'Fôrmas de Alumínio e Acessórios sob Medida para Parede de Concreto',
  heroSubtitle: 'Soluções robustas em alumínio e aço para ciclos rápidos de concretagem de 24 horas, plataformas de segurança NR-18 e reengenharia técnica de fôrmas usadas.',
  aboutTitle: 'Fundiferro: Engenharia de Fôrmas com Tradição e Tecnologia',
  aboutHistory: 'Fundada em Catanduva/SP, a Fundiferro é pioneira e referência nacional em soluções de engenharia para fôrmas de parede de concreto e sistemas metálicos de escoramento. Nossa história é pautada pelo compromisso rigoroso com a produtividade de canteiro de obras de alta velocidade, atendendo às maiores construtoras e incorporadoras do país.',
  aboutMission: 'Garantir que cada obra de parede de concreto atinja ciclos de desforma ultra rápidos e seguros por meio de produtos engenheirados e assistência técnica integral.',
  aboutVision: 'Ser reconhecida como a maior e mais eficiente parceira de reengenharia, reforma e desenvolvimento de fôrmas metálicas do mercado brasileiro.',
  aboutValues: 'Segurança Operacional Absoluta (NR-18), Racionalização de Recursos, Qualidade Geométrica Milimétrica e Atendimento Pró-Ativo.',
  contactAddress: 'Av. Dona Engrácia | Agudo Romão, 891 - Catanduva/SP — CEP 15.802-200',
  contactWhatsapp: '(17) 99181-2122',
  contactPhone: '(17) 3531-6611',
  contactEmail: 'fundiferro@fundiferroformas.com.br',
  contactHours: 'Segunda a sexta-feira, das 7h às 17h',
  contactCityState: 'Catanduva / SP',
  contactCep: '15.802-200',
  contactWhatsappMessage: 'Olá! Estou no site da Fundiferro e gostaria de falar com um engenheiro técnico sobre fôrmas e orçamento para minha obra.',
  instagramUrl: 'https://www.instagram.com/fundiferroformas',
  facebookUrl: 'https://www.facebook.com/fundiferroformas',
  linkedinUrl: 'https://www.linkedin.com/company/fundiferro',
};

const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    nome: 'Eng. Marcelo Albuquerque',
    email: 'marcelo@albuquerqueconstrutora.com.br',
    telefone: '(11) 98765-4321',
    empresa: 'Albuquerque Construtora',
    mensagem: 'Gostaria de agendar um alinhamento técnico para estimar um projeto de 4 blocos de 12 pavimentos em Guarulhos. Enviarei as plantas de arquitetura.',
    status: 'Novo',
    date: '2026-06-30 14:22',
    source: 'Contato'
  },
  {
    id: 'lead-2',
    nome: 'Juliana Costa',
    email: 'juliana.operacoes@oesteincorporadora.com',
    telefone: '(17) 99234-5678',
    empresa: 'Oeste Incorporadora',
    mensagem: 'Estimativa gerada pelo calculador do site:\n- Escoras Metálicas: 150 unidades [Modalidade: Aluguel]\n- Andaimes Tubulares: 40 unidades [Modalidade: Aluguel]\n- Formas de Alumínio (M²): 800 unidades [Modalidade: Compra]\n\nPor favor, enviem o orçamento formal para essas quantidades.',
    status: 'Em Atendimento',
    date: '2026-06-30 11:05',
    source: 'Estimador'
  },
  {
    id: 'lead-3',
    nome: 'Carlos Eduardo Vieira',
    email: 'carlos.vieira@v2engenharia.eng.br',
    telefone: '(31) 98112-4455',
    empresa: 'V2 Engenharia S/A',
    mensagem: 'Possuímos um lote de fôrmas de alumínio de outro fabricante no nosso pátio. Queremos saber os custos para a reforma, solda e adaptação para uma nova planta de casas em Belo Horizonte.',
    status: 'Fechado',
    date: '2026-06-29 09:40',
    source: 'Contato'
  }
];

const initialBlogPosts: BlogPost[] = [
  {
    id: 'otimizacao-ciclos-concretagem',
    title: 'Como otimizar os ciclos de concretagem em sistemas de parede de concreto',
    category: 'engenharia',
    categoryLabel: 'Engenharia de Fôrmas',
    author: 'Peter Prudencio',
    authorRole: 'Gerente de Projetos',
    date: '15 Mai 2026',
    readTime: '6 min de leitura',
    summary: 'Aprenda os principais fatores logísticos e técnicos para atingir a marca de 24 horas por ciclo de concretagem em edifícios residenciais de alta escala.',
    content: [
      'Na construção civil moderna, o tempo de execução é um dos principais fatores que determinam a rentabilidade de um projeto imobiliário. No sistema de paredes de concreto moldadas in loco, o objetivo de atingir um ciclo de concretagem de 24 horas por pavimento tem se tornado o padrão de ouro de eficiência. No entanto, para alcançar essa velocidade sem comprometer a segurança estrutural e a qualidade de acabamento, é necessário um planejamento cirúrgico.',
      'O primeiro passo é a racionalização da modulação. Fôrmas sob medida, leves e ergonomicamente balanceadas reduzem o cansaço dos montadores e eliminam ajustes e improvisações de última hora. Cada painel de alumínio Fundiferro é projetado com furos e passadores milimétricos, de forma que a montagem se assemelhe a um quebra-cabeça intuitivo.',
      'Além disso, a sincronia logística é fundamental. A armação de telas soldadas de aço, a passagem de kits de instalações elétricas e hidráulicas pré-montadas e o posicionamento de espaçadores (faquetas) devem ocorrer de forma paralela e encadeada. Outro fator técnico crítico é a especificação do concreto: o uso de aditivos plastificantes e aceleradores de pega permite a desforma rápida (em média, entre 7 e 12 horas após o lançamento do concreto, dependendo da temperatura ambiente), respeitando as normas de resistência à compressão mínima prescritas na NBR 16055.',
      'Por fim, a capacitação contínua da equipe em canteiro de obras e o uso de banquetes e escadas de acesso adequadas evitam acidentes que possam paralisar a linha de produção. Com fôrmas robustas de alumínio e processos estruturados, construtoras em todo o Brasil estão economizando milhões de reais e entregando obras meses antes do prazo contratual.'
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    tags: ['Parede de Concreto', 'Modulação 3D', 'Ciclos Rápidos', 'NBR 16055'],
    likes: 42,
    comments: [
      {
        id: 'c1',
        author: 'Eng. Marcelo Albuquerque',
        date: '16 Mai 2026',
        content: 'Excelente artigo. Implementamos a modulação da Fundiferro em nossa última obra em Ribeirão Preto e realmente o ciclo de 24h foi alcançado com facilidade após a curva de aprendizado inicial da equipe.'
      },
      {
        id: 'c2',
        author: 'Juliana Costa (Diretora de Operações)',
        date: '18 Mai 2026',
        content: 'O ponto sobre o concreto com aditivo acelerador de pega é crucial. A interação química correta faz milagres pela produtividade.'
      }
    ]
  },
  {
    id: 'reaproveitamento-reforma-formas-usadas',
    title: 'Reforma de Fôrmas Usadas: Economize até 60% no seu orçamento de obra',
    category: 'reforma',
    categoryLabel: 'Reengenharia & Reforma',
    author: 'Rodrigo Siqueira',
    authorRole: 'Gerente Financeiro',
    date: '02 Jun 2026',
    readTime: '5 min de leitura',
    summary: 'Descubra como a Fundiferro avalia, solda e reaproveita o acervo antigo de painéis de alumínio e aço de construtoras, adaptando-os a novos projetos arquitetônicos.',
    content: [
      'Muitas construtoras possuem milhares de metros quadrados de fôrmas de alumínio ou aço armazenados em seus pátios logísticos após o término de um empreendimento. Freqüentemente, esses materiais são vistos como obsoletos por não coincidirem com as dimensões de novas plantas residenciais. No entanto, descartar ou vender esses painéis como sucata representa um desperdício financeiro enorme.',
      'Na Fundiferro, criamos uma divisão dedicada exclusivamente à Reengenharia e Reforma de Fôrmas Usadas. O processo inicia com a análise tridimensional da geometria do novo empreendimento em paralelo com o inventário físico detalhado das fôrmas disponíveis no acervo do cliente.',
      'Com base nessa análise, nossos projetistas calculam o índice máximo de reaproveitamento, que comumente atinge patamares superiores a 80%. Os painéis antigos passam por um processo industrial de limpeza pesada, correção de empenos, re-soldagem técnica de costelas e troca de perfis desgastados. Em seguida, fabricamos sob medida apenas as peças especiais de fechamento e transição necessárias para a nova planta.',
      'O impacto econômico dessa prática é surpreendente: enquanto o investimento em um jogo de fôrmas totalmente novo pode impactar significativamente o fluxo de caixa, a reforma técnica e adaptação reduzem esse custo em até 60%. Além da economia de capital, essa abordagem contribui ativamente para a economia circular no setor da construção civil.'
    ],
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop',
    tags: ['Reforma de Fôrmas', 'Economia Circular', 'Custo-Benefício', 'Sustentabilidade'],
    likes: 38,
    comments: [
      {
        id: 'c3',
        author: 'Carlos Eduardo Vieira',
        date: '03 Jun 2026',
        content: 'Fizemos a reengenharia de fôrmas com a Fundiferro e economizamos mais de R$ 1 milhão. O suporte de engenharia para validar os painéis adaptados foi impecável.'
      }
    ]
  },
  {
    id: 'seguranca-periferica-nr18-construcao',
    title: 'Guia de Segurança Periférica e Plataformas em Conformidade com a NR-18',
    category: 'seguranca',
    categoryLabel: 'Segurança Operacional',
    author: 'Peter Prudencio',
    authorRole: 'Gerente de Projetos',
    date: '10 Jun 2026',
    readTime: '8 min de leitura',
    summary: 'Um panorama prático sobre consoles de trabalho, guarda-corpos e proteção perimetral para evitar quedas em altura na concretagem de edifícios altos.',
    content: [
      'Trabalhar nas bordas de pavimentos durante a concretagem e montagem de fôrmas em edifícios de múltiplos andares exige sistemas de proteção coletiva robustos e infalíveis. A Norma Regulamentadora 18 (NR-18) estabelece diretrizes extremamente rígidas para garantir que nenhum operário fique exposto a riscos de quedas de altura.',
      'Os sistemas de fôrmas modernas não devem ser encarados apenas como moldes para concreto, mas como plataformas integradas de trabalho seguro. Na Fundiferro, projetamos consoles de trabalho acoplados diretamente às costelas das fôrmas metálicas. Esses consoles vêm com encaixes para guarda-corpo, rodapés metálicos e pisos antiderrapantes, criando um ambiente confinado e seguro para os operadores.',
      'Além dos consoles, o uso de postes de escoramento e postes de periferia (reguláveis ou removíveis) instalados de forma mecânica nas lajes já concretadas garante que a instalação do gradil de proteção ocorra antes mesmo da desforma do nível superior. Dessa maneira, a borda do edifício nunca fica desprotegida.',
      'Investir em segurança de ponta não é um custo, mas uma estratégia de mitigação de riscos extraordinária. Obras sem acidentes são mais dinâmicas, mantêm a moral dos trabalhadores elevada e evitam paralisações de canteiros por órgãos de fiscalização, mantendo a integridade cronológica e financeira da construtora.'
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    tags: ['Segurança', 'NR-18', 'Consoles de Trabalho', 'Prevenção de Quedas'],
    likes: 51,
    comments: [
      {
        id: 'c4',
        author: 'Eng. Roberto Santos',
        date: '12 Jun 2026',
        content: 'A NR-18 é clara e severa. Ter os consoles integrados às fôrmas agiliza muito o processo e nos dá tranquilidade frente às auditorias técnicas.'
      }
    ]
  },
  {
    id: 'sustentabilidade-aluminio-vs-madeira',
    title: 'Alumínio x Madeira: Por que as fôrmas metálicas revolucionaram os canteiros',
    category: 'sustentabilidade',
    categoryLabel: 'Sustentabilidade',
    author: 'Paulo Solcia',
    authorRole: 'Gerente Comercial',
    date: '24 Jun 2026',
    readTime: '5 min de leitura',
    summary: 'Faça o comparativo ecológico e financeiro entre as fôrmas tradicionais de madeira de ciclo curto e os sistemas reutilizáveis de alumínio de alta ciclografia.',
    content: [
      'Durante décadas, as fôrmas de madeira compensada foram a escolha padrão nos canteiros de obras do Brasil. No entanto, com a industrialização acelerada da construção e a urgência por práticas sustentáveis, a madeira tem perdido espaço de forma vertiginosa para os sistemas metálicos de alumínio e aço.',
      'O principal fator de diferenciação é a ciclografia (número de reaproveitamentos). Uma fôrma de compensado resinado de boa qualidade resiste a no máximo 10 a 15 utilizações antes de empenar, lascar ou absorver umidade excessiva, exigindo descarte direto em caçambas de entulho. Em contraste, os painéis de alumínio Fundiferro podem ser utilizados mais de 500 vezes, mantendo a precisão geométrica inalterada.',
      'Sob a ótica ecológica, os canteiros que utilizam fôrmas de alumínio eliminam quase por completo o desmatamento e o acúmulo de madeira residual. A organização espacial do canteiro melhora drasticamente, pois não há necessidade de marcenarias barulhentas montando painéis de forma artesanal sob poeira e detritos.',
      'Sob o aspecto financeiro, embora o custo inicial de aquisição do alumínio seja mais elevado, a amortização ocorre rapidamente. A partir do vigésimo ciclo, o sistema de alumínio se torna consideravelmente mais barato por uso do que a madeira compensada, sem contar a eliminação de retrabalhos com reboco devido à qualidade impecável do concreto acabado (concreto aparente pronto para pintura).'
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    tags: ['Sustentabilidade', 'Alumínio', 'Resíduo Zero', 'Construção Limpa'],
    likes: 67,
    comments: []
  }
];

const initialProducts: Product[] = [
  {
    id: 'formas-parede',
    title: 'Formas para Parede de Concreto',
    description: 'Utilizadas na construção de prédios e casas. Garante construção rápida, eficiente e uma estrutura extremamente resistente e durável.',
    iconName: 'Layers'
  },
  {
    id: 'seguranca-parede',
    title: 'Segurança para Parede de Concreto',
    description: 'Sistemas de segurança e plataformas de trabalho necessárias para obras protegidas e totalmente dentro das normas da legislação brasileira.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'reforma-adaptacao',
    title: 'Reforma e Adaptação de Formas',
    description: 'Reformamos e adaptamos formas usadas de qualquer fabricante para novos projetos, com análise técnica e reengenharia completa.',
    iconName: 'Wrench'
  },
  {
    id: 'acessorios',
    title: 'Acessórios para Parede de Concreto',
    description: 'Linha completa de pinos, cunhas, alinhadores, tensores, espaçadores e outros itens cruciais para a montagem ideal.',
    iconName: 'Nut'
  },
  {
    id: 'formas-pre-moldado',
    title: 'Formas para Concreto Pré-Moldado',
    description: 'Soluções para concretagem de perfis pré-moldados (muros, vigas, pilares). Moldes duráveis que garantem padronização rígida.',
    iconName: 'Grid'
  },
  {
    id: 'equipamentos-construcao',
    title: 'Equipamentos de Construção Civil',
    description: 'Locação e venda de escoras metálicas, andaimes, postes e diversos outros equipamentos robustos para obras em geral.',
    iconName: 'Construction'
  }
];

export function initializeStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem('fundiferro_texts')) {
    localStorage.setItem('fundiferro_texts', JSON.stringify(defaultTexts));
  }
  if (!localStorage.getItem('fundiferro_leads')) {
    localStorage.setItem('fundiferro_leads', JSON.stringify(initialLeads));
  }
  if (!localStorage.getItem('fundiferro_products')) {
    localStorage.setItem('fundiferro_products', JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem('fundiferro_blog_posts')) {
    localStorage.setItem('fundiferro_blog_posts', JSON.stringify(initialBlogPosts));
  }
}

export function triggerUpdateEvent() {
  if (typeof window !== 'undefined') {
    const event = new Event('fundiferro_db_update');
    window.dispatchEvent(event);
  }
}

// TEXTS CMS
export function getTexts(): SiteTexts {
  initializeStorage();
  try {
    const raw = localStorage.getItem('fundiferro_texts');
    if (!raw) return defaultTexts;
    const parsed = JSON.parse(raw);
    return { ...defaultTexts, ...parsed };
  } catch (e) {
    return defaultTexts;
  }
}

export function saveTexts(texts: SiteTexts) {
  localStorage.setItem('fundiferro_texts', JSON.stringify(texts));
  triggerUpdateEvent();
}

// PRODUCTS MANAGER
export function getProducts(): Product[] {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem('fundiferro_products') || JSON.stringify(initialProducts));
  } catch (e) {
    return initialProducts;
  }
}

export function saveProduct(product: Product) {
  const products = getProducts();
  const existingIdx = products.findIndex(p => p.id === product.id);
  if (existingIdx >= 0) {
    products[existingIdx] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem('fundiferro_products', JSON.stringify(products));
  triggerUpdateEvent();
}

export function deleteProduct(productId: string) {
  const products = getProducts().filter(p => p.id !== productId);
  localStorage.setItem('fundiferro_products', JSON.stringify(products));
  triggerUpdateEvent();
}

// LEADS CRM
export function getLeads(): Lead[] {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem('fundiferro_leads') || JSON.stringify(initialLeads));
  } catch (e) {
    return initialLeads;
  }
}

export function addLead(lead: Omit<Lead, 'id' | 'date' | 'status'>) {
  const leads = getLeads();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}`,
    date: formattedDate,
    status: 'Novo'
  };

  leads.unshift(newLead);
  localStorage.setItem('fundiferro_leads', JSON.stringify(leads));
  triggerUpdateEvent();
}

export function updateLeadStatus(leadId: string, status: Lead['status']) {
  const leads = getLeads().map(l => l.id === leadId ? { ...l, status } : l);
  localStorage.setItem('fundiferro_leads', JSON.stringify(leads));
  triggerUpdateEvent();
}

export function deleteLead(leadId: string) {
  const leads = getLeads().filter(l => l.id !== leadId);
  localStorage.setItem('fundiferro_leads', JSON.stringify(leads));
  triggerUpdateEvent();
}

// BLOG CMS
export function getBlogPosts(): BlogPost[] {
  initializeStorage();
  try {
    const parsed: BlogPost[] = JSON.parse(localStorage.getItem('fundiferro_blog_posts') || JSON.stringify(initialBlogPosts));
    // Sanitize any broken legacy image paths
    return parsed.map(post => {
      if (post.id === 'seguranca-periferica-nr18-construcao' && post.image.includes('photo-1581094288338')) {
        return { ...post, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop' };
      }
      return post;
    });
  } catch (e) {
    return initialBlogPosts;
  }
}

export function saveBlogPost(post: BlogPost) {
  const posts = getBlogPosts();
  const existingIdx = posts.findIndex(p => p.id === post.id);
  if (existingIdx >= 0) {
    posts[existingIdx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem('fundiferro_blog_posts', JSON.stringify(posts));
  triggerUpdateEvent();
}

export function deleteBlogPost(postId: string) {
  const posts = getBlogPosts().filter(p => p.id !== postId);
  localStorage.setItem('fundiferro_blog_posts', JSON.stringify(posts));
  triggerUpdateEvent();
}

export function likeBlogPost(postId: string) {
  const posts = getBlogPosts().map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
  localStorage.setItem('fundiferro_blog_posts', JSON.stringify(posts));
  triggerUpdateEvent();
}

export function addBlogComment(postId: string, comment: { author: string; content: string }) {
  const posts = getBlogPosts().map(p => {
    if (p.id === postId) {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')} ${now.toLocaleString('pt-BR', { month: 'short' })} ${now.getFullYear()}`;
      const newComment = {
        id: `comment-${Date.now()}`,
        author: comment.author,
        date: formattedDate,
        content: comment.content
      };
      return {
        ...p,
        comments: [...p.comments, newComment]
      };
    }
    return p;
  });
  localStorage.setItem('fundiferro_blog_posts', JSON.stringify(posts));
  triggerUpdateEvent();
}

