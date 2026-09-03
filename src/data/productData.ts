/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductDetailData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  category: string;
  badge: string;
  heroImage: string;
  galleryImages: { url: string; caption: string }[];
  videoEmbedUrl?: string;
  isFlagship?: boolean;
  highlightStats: { label: string; value: string; sub: string }[];
  overviewParagraphs: string[];
  keyAdvantages: { title: string; desc: string; icon: string }[];
  technicalSpecs: { [key: string]: string };
  methodologySteps?: { step: string; title: string; desc: string }[];
  accessoriesIncluded?: string[];
  faqs?: { q: string; a: string }[];
}

export const detailedProducts: Record<string, ProductDetailData> = {
  'formas-parede': {
    id: 'formas-parede',
    slug: 'formas-para-parede-de-concreto',
    title: 'Fôrmas de Alumínio para Parede de Concreto',
    subtitle: 'Sistema modular industrializado de alta produtividade para ciclo de concretagem de 24 horas.',
    shortDescription: 'Desenvolvidas em liga de alumínio estrutural de alta rigidez para garantir esquadro, prumo e acabamento liso perfeito que dispensa reboco.',
    category: 'Sistemas Construtivos Industrializados',
    badge: 'Produto Carro-Chefe Fundiferro',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    isFlagship: true,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
        caption: 'Canteiro vertical com montagem de painéis de parede e laje integrados'
      },
      {
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1000&auto=format&fit=crop',
        caption: 'Fabricação industrial e calibração de perfis de alumínio na planta Fundiferro'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
        caption: 'Desforma acelerada com acabamento liso pronto para pintura'
      },
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
        caption: 'Pré-montagem 100% calibrada com esquadros e alinhadores em fábrica'
      }
    ],
    highlightStats: [
      { value: '24 Horas', label: 'Ciclo por Pavimento', sub: 'Desforma e remontagem no mesmo dia' },
      { value: '60 kN/m²', label: 'Pressão Admissível', sub: 'Suporta concreto fluido e autoadensável' },
      { value: '+1.000', label: 'Reutilizações', sub: 'Durabilidade extrema com liga estrutural' },
      { value: 'NBR 16055', label: 'Conformidade Rigorosa', sub: 'Garantia de esquadro e prumo milimétrico' }
    ],
    overviewParagraphs: [
      'O sistema de fôrmas de alumínio da Fundiferro é a solução definitiva para construtoras que buscam industrialização, velocidade recorde de entrega e previsibilidade orçamentária máxima em edifícios residenciais, comerciais e condomínios horizontais.',
      'Projetadas sob medida a partir das plantas em CAD e BIM da sua obra, nossas fôrmas integram paredes e lajes em uma única concretagem monolítica. Isso elimina juntas frias, vedações imperfeitas e problemas crônicos de fissuras e infiltrações.',
      'A alta precisão dimensional dos painéis Fundiferro proporciona paredes perfeitamente lisas e aprumadas, eliminando a necessidade de chapisco, emboço e reboco pesado. A parede concretada recebe diretamente massa corrida, gesso fino ou pintura, gerando uma redução de até 80% nos custos de acabamento e resíduos de canteiro.'
    ],
    keyAdvantages: [
      {
        title: 'Velocidade Construtiva Incomparável',
        desc: 'Permite desforma em prazos a partir de 12 horas e subida de 1 pavimento a cada 24 a 48 horas.',
        icon: 'Zap'
      },
      {
        title: 'Acabamento Facial Superior',
        desc: 'Chapa de contato usinada que confere superfície espelhada ao concreto, sem bolhas superficiais.',
        icon: 'Sparkles'
      },
      {
        title: 'Pré-Montagem 100% Homologada',
        desc: 'Montamos o apartamento ou casa inteira em nossa fábrica em Catanduva/SP antes do despacho para o cliente.',
        icon: 'CheckCircle2'
      },
      {
        title: 'Leveza e Ergonomia de Canteiro',
        desc: 'Painéis leves (peso médio de 22 a 25 kg/m²) que dispensam o uso constante de grua para transporte interno.',
        icon: 'ShieldCheck'
      }
    ],
    technicalSpecs: {
      'Material da Estrutura': 'Liga especial de alumínio estrutural 6061-T6 / 6005-T5',
      'Espessura da Chapa de Contato': '4,0 mm a 4,5 mm de alta resistência mecânica',
      'Pressão Máxima de Concretagem': '60 kN/m² conforme norma NBR 16055',
      'Peso Médio do Sistema': '22 a 25 kg/m² (totalmente manuseável por 1 operador)',
      'Tolerância Dimensional': '± 1,0 mm em esquadro e planicidade',
      'Compatibilidade de Concreto': 'Concreto convencional, bombeável e autoadensável (CAA)',
      'Ciclo de Vida Útil': 'Superior a 1.000 reutilizações com manutenção preventiva'
    },
    methodologySteps: [
      { step: '01', title: 'Estudo de Modulação & BIM', desc: 'Nossa equipe de engenharia analisa a planta arquitetônica e calcula a modulação ideal com o menor número de peças e maior índice de reaproveitamento.' },
      { step: '02', title: 'Usinagem e Corte Robotizado', desc: 'Perfis e chapas de alumínio são cortados e usinados em centros CNC industriais de alta precisão.' },
      { step: '03', title: 'Soldagem Especializada TIG/MIG', desc: 'Soldadores certificados realizam a união estrutural das nervuras com controle rigoroso de penetração e acabamento.' },
      { step: '04', title: 'Montagem Teste (Mock-up Fábrica)', desc: 'Montamos a casa ou apartamento tipo completo na fábrica. O cliente pode inspecionar e aprovar presencialmente ou por vídeo.' },
      { step: '05', title: 'Logística e Treinamento em Canteiro', desc: 'Despacho paletizado e identificado por cômodo, acompanhado de instrutor técnico para capacitar sua equipe de montagem.' }
    ],
    accessoriesIncluded: [
      'Pinos de travamento rápido e cunhas reforçadas',
      'Tirantes de alta resistência e porcas fundidas flangeadas',
      'Alinhadores reguláveis tubulares duplos',
      'Aprumadores telescópicos com sapatas de fixação',
      'Banqueta de montagem e extratores de desforma ergonômicos'
    ],
    faqs: [
      {
        q: 'Quantas repetições reais a forma de alumínio aguenta?',
        a: 'Com manuseio correto e aplicação do desmoldante apropriado, nosso sistema em alumínio estrutural 6061 ultrapassa facilmente 1.000 ciclos de concretagem.'
      },
      {
        q: 'É fornecido projeto executivo de modulação?',
        a: 'Sim. Todo fornecimento acompanha projeto completo em 2D/3D com codificação de cada painel (ex.: Sala, Quarto 1, Cozinha), manual de montagem e ART de fabricação.'
      }
    ]
  },

  'reforma-adaptacao': {
    id: 'reforma-adaptacao',
    slug: 'reforma-e-adaptacao-de-formas',
    title: 'Reforma e Reengenharia de Fôrmas de Parede',
    subtitle: 'Recuperação, adaptação geométrica e modernização de acervos usados de qualquer fabricante.',
    shortDescription: 'Economize até 60% do custo de um jogo novo reutilizando suas fôrmas antigas em novos projetos arquitetônicos com garantia de fábrica.',
    category: 'Engenharia & Sustentabilidade',
    badge: 'Diferencial Exclusivo Fundiferro',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    isFlagship: true,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
        caption: 'Mapeamento e higienização mecânica de fôrmas recebidas de obras finalizadas'
      },
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
        caption: 'Corte e emenda de perfis para adaptação de pé-direito e novos vãos de porta'
      },
      {
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1000&auto=format&fit=crop',
        caption: 'Alinhamento em gabarito hidráulico para recuperação de esquadro'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
        caption: 'Fôrmas reformadas com aspecto e desempenho de novas entregues no canteiro'
      }
    ],
    highlightStats: [
      { value: 'Até 60%', label: 'Economia Financeira', sub: 'Comparado à aquisição de um conjunto 100% novo' },
      { value: 'Qualquer Marca', label: 'Compatibilidade Multimarcas', sub: 'Forsa, Lumicad, SH, Rohr, Ulma, Outsystems' },
      { value: '100% Calibrado', label: 'Homologação em Gabarito', sub: 'Devolvido ao prumo e esquadro de fábrica' },
      { value: '12 Meses', label: 'Garantia Estrutural', sub: 'Total segurança e respaldo de engenharia' }
    ],
    overviewParagraphs: [
      'Construtoras que possuem fôrmas paradas em seus pátios não precisam arcar com o investimento integral de um jogo novo a cada novo lançamento imobiliário. O serviço de Reforma e Reengenharia da Fundiferro transforma seu estoque existente na geometria exata do seu próximo projeto.',
      'Recebemos fôrmas de qualquer marca do mercado nacional ou internacional. Nosso time de engenharia faz a triagem completa: desempeno de perfis com gabaritos de precisão, substituição de chapas de contato gastas, ressoldagem de nervuras e fabricação cirúrgica apenas dos painéis de transição necessários.',
      'O resultado é um conjunto de fôrmas perfeitamente compatibilizado, higienizado, etiquetado e calibrado para rodar com a mesma eficiência de um sistema recém-fabricado, gerando economia expressiva de capital de giro para a construtora.'
    ],
    keyAdvantages: [
      {
        title: 'Redução Drástica do Custo de Entrada',
        desc: 'Aproveitamento de até 85% do material existente, minimizando o desembolso financeiro da obra.',
        icon: 'Coins'
      },
      {
        title: 'Engenharia de Compatibilização',
        desc: 'Readequaremos vãos de esquadrias, pés-direitos maiores/menores e novas disposições de cômodos.',
        icon: 'Layers'
      },
      {
        title: 'Recuperação Geométrica Certificada',
        desc: 'Eliminação de empenamentos, amassados e rebarbas que causam dentes e desalinhamentos no concreto.',
        icon: 'Wrench'
      },
      {
        title: 'Sustentabilidade ESG Real',
        desc: 'Evita o descarte de centenas de toneladas de alumínio e aço, reduzindo a pegada de carbono da construtora.',
        icon: 'Leaf'
      }
    ],
    technicalSpecs: {
      'Marcas Atendidas': 'Todas as marcas do mercado (alumínio ou aço estrutural)',
      'Processo de Limpeza': 'Limpeza mecânica e química para remoção total de crostas de concreto',
      'Desempeno': 'Prensas hidráulicas de precisão e gabaritos milimétricos',
      'Solda Aplicada': 'TIG/MIG industrial com teste de líquido penetrante',
      'Chapas de Substituição': 'Alumínio de liga estrutural de primeira linha',
      'Controle de Qualidade': 'Montagem piloto em fábrica antes da entrega técnica'
    },
    methodologySteps: [
      { step: '01', title: 'Diagnóstico & Inventário no Pátio', desc: 'Contagem, classificação do estado físico e quantificação das peças aproveitáveis.' },
      { step: '02', title: 'Engenharia Reversa & Compatibilização', desc: 'Cruzamento do inventário com o novo projeto executivo para definir o mapa de corte e peças extras.' },
      { step: '03', title: 'Restauração Industrial na Fábrica', desc: 'Higienização, desempeno térmico/mecânico, troca de chapas e reforço de costelas de solda.' },
      { step: '04', title: 'Fabricação das Peças Complementares', desc: 'Usinagem das fôrmas especiais e transições de canto necessárias para o novo layout.' },
      { step: '05', title: 'Pré-Montagem e Liberação', desc: 'Montagem completa para conferência de prumo e entrega paletizada com novo manual de montagem.' }
    ]
  },

  'acessorios': {
    id: 'acessorios',
    slug: 'acessorios-para-parede-de-concreto',
    title: 'Acessórios e Travamentos de Alta Resistência',
    subtitle: 'Linha completa de pinos, cunhas, tirantes, alinhadores e tensores com pronta-entrega.',
    shortDescription: 'Componentes forjados e usinados para garantir travamento ultra rígido, vedação perfeita e durabilidade em centenas de ciclos.',
    category: 'Acessórios & Suprimentos',
    badge: 'Pronta-Entrega Nacional',
    heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
    isFlagship: false,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
        caption: 'Pinos, cunhas e espaçadores metálicos forjados para travamento rápido'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
        caption: 'Alinhadores duplos e esquadros reguláveis de precisão'
      }
    ],
    highlightStats: [
      { value: '+50.000', label: 'Itens em Estoque', sub: 'Pronta entrega para todo o Brasil' },
      { value: 'Aço 1045 / Forjado', label: 'Matéria-Prima Nobre', sub: 'Alta tenacidade mecânica' },
      { value: '100% Compatível', label: 'Padrão Universal', sub: 'Compatível com qualquer sistema de formas' }
    ],
    overviewParagraphs: [
      'A qualidade dos acessórios de travamento é o fator determinante para evitar vazamentos de nata de concreto, barrigamento de paredes e perdas de prumo durante a concretagem.',
      'A Fundiferro fabrica e distribui uma linha completa de acessórios forjados em aços de alta tenacidade. Nossos pinos e cunhas possuem tratamento térmico que suporta o impacto diário de marretas sem deformação plástica.',
      'Contamos com grande estoque a pronta-entrega em Catanduva/SP, com capacidade de envio expresso para canteiros em todo o território nacional.'
    ],
    keyAdvantages: [
      {
        title: 'Alta Resistência ao Desgaste',
        desc: 'Tratamento superficial e ligas forjadas que evitam trincas e quebras por fadiga.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Geometria de Encaixe Perfeito',
        desc: 'Cunhas com conicidade calibrada que garantem pressão de fechamento ideal com esforço mínimo do montador.',
        icon: 'CheckCircle2'
      },
      {
        title: 'Despacho Imediato',
        desc: 'Logística integrada para reposição rápida durante o andamento da sua concretagem.',
        icon: 'Truck'
      }
    ],
    technicalSpecs: {
      'Pinos e Cunhas': 'Aço carbono forjado com tratamento térmico anti-deformação',
      'Tirantes de Ancoragem': 'Aço laminado de alta resistência com rosca redonda autolimpante',
      'Porcas de Ancoragem': 'Ferro fundido nodular de alta ductilidade com flange de 100 mm a 120 mm',
      'Alinhadores': 'Tubos retangulares de parede reforçada com pintura anticorrosiva',
      'Espaçadores (Faqueta)': 'Aço mola calibrado para espessuras de 10, 12, 14, 15 e 20 cm'
    }
  },

  'seguranca-parede': {
    id: 'seguranca-parede',
    slug: 'seguranca-para-parede-de-concreto-nr18',
    title: 'Sistemas de Segurança e Plataformas NR-18',
    subtitle: 'Proteção coletiva integrada, consoles de trabalho em balanço e guarda-corpos acoplados.',
    shortDescription: 'Soluções completas para trabalho em altura e concretagem segura, em conformidade estrita com as exigências da NR-18 e NR-35.',
    category: 'Segurança do Trabalho & NR-18',
    badge: 'Conformidade NR-18 Certificada',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    isFlagship: false,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
        caption: 'Consoles de trabalho suspensos acoplados diretamente aos painéis de fôrma'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
        caption: 'Guarda-corpos periféricos com rodapé metálico de contenção de ferramentas'
      }
    ],
    highlightStats: [
      { value: 'NR-18 & NR-35', label: 'Normas Atendidas', sub: 'Laudos de ensaio e ART de fabricação' },
      { value: 'Zero Quedas', label: 'Proteção Coletiva', sub: 'Concretagem 100% protegida em altura' },
      { value: 'Acoplamento Rápido', label: 'Montagem Ágil', sub: 'Fixação nos próprios furos de tirante' }
    ],
    overviewParagraphs: [
      'A concretagem de paredes em edifícios altos exige plataformas seguras para os vibradores e operadores de mangote. Nossos consoles de trabalho metálicos são desenvolvidos para acoplar diretamente nas fôrmas.',
      'Isso dispensa a montagem de andaimes de fachada complexos, permitindo que a plataforma suba junto com o ciclo diário de concretagem da laje.',
      'Todos os itens acompanham memorial de cálculo estrutural, teste de carga estática e Anotação de Responsabilidade Técnica (ART).'
    ],
    keyAdvantages: [
      {
        title: 'Subida Automática com a Forma',
        desc: 'A plataforma acompanha o ritmo da desforma sem necessidade de desmontagem externa.',
        icon: 'ArrowUpCircle'
      },
      {
        title: 'Piso Antiderrapante',
        desc: 'Pranchões metálicos perfurados que evitam acúmulo de água e nata de concreto.',
        icon: 'ShieldCheck'
      }
    ],
    technicalSpecs: {
      'Carga Admissível de Trabalho': '150 kgf/m² (conforme requisitos de plataforma de trabalho NR-18)',
      'Fixação': 'Pinos cônicos e tirantes roscados de ancoragem passante',
      'Estrutura': 'Tubos de aço estrutural SAE 1020 com solda MIG contínua',
      'Proteção Superficial': 'Galvanização eletrolítica ou pintura industrial eletrostática'
    }
  },

  'formas-pre-moldado': {
    id: 'formas-pre-moldado',
    slug: 'formas-para-concreto-pre-moldado',
    title: 'Fôrmas para Concreto Pré-Moldado',
    subtitle: 'Moldes metálicos de alta rigidez para pistas de protensão, mourões, vigas e lajes.',
    shortDescription: 'Projetadas para indústrias de pré-fabricados que exigem tolerância dimensional estrita e desmoldagem rápida.',
    category: 'Pré-Moldados & Pré-Fabricação',
    badge: 'Alta Rigidez Estrutural',
    heroImage: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1200&auto=format&fit=crop',
    isFlagship: false,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1000&auto=format&fit=crop',
        caption: 'Pistas e fôrmas de grande porte para vigas e pilares pré-moldados'
      }
    ],
    highlightStats: [
      { value: '± 0,5 mm', label: 'Tolerância', sub: 'Precisão milimétrica em pistas longas' },
      { value: 'Aço Carbono', label: 'Chapa Grossa', sub: 'Resistência extrema a vibradores de alta frequência' }
    ],
    overviewParagraphs: [
      'Fabricamos moldes e pistas metálicas completas para indústrias de pré-fabricados de concreto em todo o país. Nossos projetos contemplam sistemas de abertura rápida por gaveta ou articulação basculante.',
      'Garantem milhares de desformas sem alteração nas dimensões do produto final, reduzindo o tempo de preparação da pista de moldagem.'
    ],
    keyAdvantages: [
      {
        title: 'Abertura Basculante / Gaveta',
        desc: 'Permite desmoldar a peça pré-moldada em segundos sem danificar as quinas.',
        icon: 'Layers'
      }
    ],
    technicalSpecs: {
      'Estrutura': 'Chapas de aço estrutural ASTM A36 espessura 4,75 mm a 8,0 mm',
      'Reforços': 'Perfis dobrados e cantoneiras de travamento contra vibração severa'
    }
  },

  'equipamentos-construcao': {
    id: 'equipamentos-construcao',
    slug: 'equipamentos-de-construcao-civil',
    title: 'Equipamentos e Escoramentos para Construção Civil',
    subtitle: 'Escoras metálicas reguláveis, torres de carga e andaimes tubulares para locação e venda.',
    shortDescription: 'Equipamentos robustos inspecionados para suporte de cargas pesadas em lajes, vigas e canteiros de obra.',
    category: 'Escoramento & Locação',
    badge: 'Locação & Venda',
    heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
    isFlagship: false,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
        caption: 'Escoras metálicas telescópicas e torres de escoramento de laje'
      }
    ],
    highlightStats: [
      { value: '2 a 4,5 m', label: 'Regulagem de Altura', sub: 'Escoras telescópicas de ajuste fino' },
      { value: 'Até 3.000 kgf', label: 'Carga por Poste', sub: 'Segurança comprovada em lajes maciças' }
    ],
    overviewParagraphs: [
      'Disponibilizamos sistemas de escoramento metálico e andaimes para locação e venda rápida. Nossas escoras possuem regulagem telescópica com anel de ajuste milimétrico, permitindo desforma e reescoramento com agilidade.'
    ],
    keyAdvantages: [
      {
        title: 'Regulagem Rápida e Segura',
        desc: 'Gancho forjado e rosca autolimpante com proteção contra emperramento de massa.',
        icon: 'Wrench'
      }
    ],
    technicalSpecs: {
      'Capacidade de Carga': '1.200 a 3.000 kgf conforme abertura',
      'Acabamento': 'Pintura por imersão anticorrosiva ou galvanização a fogo'
    }
  }
};
