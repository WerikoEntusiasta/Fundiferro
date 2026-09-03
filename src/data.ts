/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeamMember, Product, FAQ, Accessory, ProcessStep } from './types';

export const teamMembers: TeamMember[] = [
  { name: 'Paulo Solcia', role: 'Gerente Comercial' },
  { name: 'Rodrigo Siqueira', role: 'Gerente Financeiro' },
  { name: 'Peter Prudencio', role: 'Gerente de Projetos' }
];

export const productsList: Product[] = [
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

export const faqList: FAQ[] = [
  {
    question: 'Qual é o objetivo das formas para parede de concreto?',
    answer: 'O objetivo das formas para parede de concreto é criar uma estrutura temporária que confine o concreto em sua forma desejada até que ele endureça e adquira resistência. As formas também ajudam a manter o alinhamento e o nivelamento das paredes durante o processo de concretagem.'
  },
  {
    question: 'Quanto tempo leva para o concreto endurecer antes de remover as formas?',
    answer: 'O tempo necessário para o concreto endurecer antes de remover as formas pode variar dependendo de diversos fatores, como o tipo de cimento utilizado, a temperatura ambiente e a umidade. Geralmente, leva de 7 a 15 horas, mas é recomendado seguir as orientações do fabricante do concreto.'
  },
  {
    question: 'Quais são as vantagens das formas para parede de concreto em comparação com outros métodos de construção?',
    answer: 'As vantagens incluem a rapidez de execução, a possibilidade de repetição das formas e a obtenção de superfícies lisas e uniformes. Oferecem maior flexibilidade de design, mantêm a padronização de medidas e vãos, e podem ser muito mais econômicas, especialmente em projetos com repetição de formas, reduzindo drasticamente os custos com mão de obra. Além disso, elimina-se o desperdício de material e a geração de entulho, garantindo previsibilidade financeira absoluta no projeto.'
  },
  {
    question: 'É possível reutilizar as formas para outras obras?',
    answer: 'Sim, é perfeitamente possível reutilizar as formas em outras obras, especialmente no caso de formas de alumínio e metálicas, desde que estejam em boas condições e adequadamente armazenadas. Caso haja necessidade de reformar ou adaptar as suas formas para uma nova geometria de projeto, nós realizamos todo o serviço de reengenharia e adaptação.'
  },
  {
    question: 'Quais são os cuidados necessários durante o processo de concretagem?',
    answer: 'Alguns dos cuidados mais importantes incluem: verificar a integridade estrutural das formas antes do lançamento; utilizar espaçadores corretos para garantir a espessura da parede; garantir adequada compactação para evitar vazios; controlar a cura (temperatura e umidade); seguir rigorosamente a norma NBR 16055; conferir o prumo; verificar o aperto de pinos e cunhas; checar todos os acessórios e respeitar rigorosamente a velocidade máxima de lançamento recomendada.'
  },
  {
    question: 'Quais são os custos envolvidos na utilização das formas para parede de concreto?',
    answer: 'Os custos são variáveis e dependem do tamanho do projeto, repetições previstas e da região. Porém, o custo-benefício se destaca pela alta velocidade, redução extrema de desperdício, menor necessidade de reboco (acabamento liso direto) e economia massiva na folha de pagamento de mão de obra.'
  }
];

export const accessoriesList: Accessory[] = [
  {
    name: 'Pinos',
    description: 'Fabricamos pinos e acessórios para formas dos mais diversos fabricantes de sistemas de parede de concreto.',
    category: 'Fixação'
  },
  {
    name: 'Cunha',
    description: 'Desenvolvidas sob medida para garantir o travamento rápido e seguro entre os painéis de formas.',
    category: 'Fixação'
  },
  {
    name: 'Espaçadores (Faqueta)',
    description: 'Espaçadores metálicos de alta resistência fabricados em diversas medidas para garantir a espessura exata da parede.',
    category: 'Fixação'
  },
  {
    name: 'Cone para Painel de Ciclo',
    description: 'Solução inteligente e reutilizável para o travamento seguro do painel de ciclo e subida segura da forma em pavimentos superiores.',
    category: 'Fixação'
  },
  {
    name: 'Alinhadores e Esquadros Fixos',
    description: 'Peças em cantoneiras ou tubos retangulares projetadas para garantir o alinhamento e esquadrejamento perfeito das formas.',
    category: 'Alinhamento'
  },
  {
    name: 'Alinhadores e Esquadros Reguláveis',
    description: 'Tubos retangulares duplos com tirantes e porcas, ideais para o ajuste fino e alinhamento milimétrico das frentes de concretagem.',
    category: 'Alinhamento'
  },
  {
    name: 'Tensor de Portas',
    description: 'Estabilizadores mecânicos que travam e garantem o vão e abertura exata das portas durante a pressão do concreto.',
    category: 'Nivelamento & Ajuste'
  },
  {
    name: 'Porca de Ancoragem',
    description: 'Porcas robustas rosqueáveis de alta resistência para ancoragem firme de tirantes e tensores das formas.',
    category: 'Fixação'
  },
  {
    name: 'Aprumador',
    description: 'Equipamento ajustável essencial para garantir o prumo vertical perfeito das frentes de parede de concreto.',
    category: 'Nivelamento & Ajuste'
  },
  {
    name: 'Suporte de Alinhador Regulável',
    description: 'Suporte metálico específico para a ancoragem e estabilização dos alinhadores ajustáveis.',
    category: 'Suporte'
  },
  {
    name: 'Escada de Acesso',
    description: 'Estruturas de escada de acesso externo robustas, permitindo que operadores acessem o pavimento superior com total segurança.',
    category: 'Acesso & Segurança'
  },
  {
    name: 'Esquadro Simples',
    description: 'Função de garantir que os painéis de quinas e cantos permaneçam no esquadro exato de 90° durante a concretagem.',
    category: 'Alinhamento'
  },
  {
    name: 'Esquadro Duplo',
    description: 'Garante o alinhamento duplo de cantos internos e externos, suportando pressões elevadas.',
    category: 'Alinhamento'
  },
  {
    name: 'Banqueta de Montagem',
    description: 'Plataforma leve e estável para auxiliar os montadores nas etapas superiores de encaixe das formas e acessórios.',
    category: 'Acesso & Segurança'
  },
  {
    name: 'Suporte de Alinhador Fixo',
    description: 'Dispositivo metálico de ancoragem fixa para garantir que as barras alinhadoras fiquem perfeitamente travadas.',
    category: 'Suporte'
  },
  {
    name: 'Estronca Regulável',
    description: 'Peça telescópica regulável de alta capacidade de carga para ajuste fino de posicionamento e suporte de paredes.',
    category: 'Nivelamento & Ajuste'
  },
  {
    name: 'Poste Fixo',
    description: 'Elemento de suporte fixo projetado para ancorar com rigidez o gradil de periferia na borda das lajes.',
    category: 'Acesso & Segurança'
  },
  {
    name: 'Poste Regulável',
    description: 'Suporte de gradil com regulagem de altura e alcance, adaptando-se a diferentes perfis de laje.',
    category: 'Acesso & Segurança'
  },
  {
    name: 'Poste Removível',
    description: 'Item de suporte permanente que pode ser facilmente desacoplado e reutilizado em etapas subsequentes da obra.',
    category: 'Acesso & Segurança'
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Contato',
    description: 'O cliente inicia o contato por telefone, WhatsApp ou e-mail detalhando suas metas construtivas.'
  },
  {
    number: 2,
    title: 'Envio do Projeto',
    description: 'Envio das plantas baixas e projetos arquitetônicos pelo cliente para nossa avaliação de viabilidade.'
  },
  {
    number: 3,
    title: 'Alinhamento Técnico',
    description: 'Reunião estratégica entre engenheiros para definir o cronograma, modulações e necessidades de segurança.'
  },
  {
    number: 4,
    title: 'Orçamento',
    description: 'Elaboração de orçamento ultra detalhado, mapeando cada painel de alumínio, acessório e sistema de proteção.'
  },
  {
    number: 5,
    title: 'Assinatura de Contrato',
    description: 'Assinatura do contrato de fabricação ou locação com prazos, garantias e cronogramas assegurados.'
  },
  {
    number: 6,
    title: 'Fabricação / Customização',
    description: 'Início da produção industrial ou adaptação de formas com materiais certificados e conformidade técnica.'
  },
  {
    number: 7,
    title: 'Homologação (Pré-Montagem)',
    description: 'Montamos a estrutura 100% em nossa fábrica antes do envio. O cliente inspeciona e homologa o projeto finalizado.'
  },
  {
    number: 8,
    title: 'Entrega Técnica',
    description: 'Transporte seguro e entrega técnica em canteiro de obras com fornecimento de ART (Anotação de Responsabilidade Técnica).'
  }
];
