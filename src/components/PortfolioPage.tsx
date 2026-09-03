/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building,
  MapPin,
  Calendar,
  Layers,
  X,
  ExternalLink,
  Grid,
  Maximize2,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  Filter,
  Check,
  Send,
  Phone,
  ShieldCheck,
  Timer,
  Ruler,
  TrendingDown,
  Building2,
  Award,
  Factory,
  Wrench
} from 'lucide-react';
import { getTexts } from '../utils/storage';

export interface ProjectSpec {
  [key: string]: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'residencial' | 'infraestrutura' | 'reforma';
  location: string;
  shortDescription: string;
  detailedDescription: string;
  desafio?: string;
  solucao?: string;
  resultado?: string;
  badgeHighlight?: string;
  image: string;
  specs: ProjectSpec;
}

export const allProjects: Project[] = [
  {
    id: 'residencial-alto-serra',
    title: 'Residencial Alto da Serra - 18 Pavimentos',
    category: 'residencial',
    location: 'Ribeirão Preto / SP',
    shortDescription: 'Modulação integrada de fôrmas de alumínio com ciclo diário de 24h por pavimento.',
    detailedDescription: 'Desenvolvimento de projeto logístico e modulação sob medida de fôrmas metálicas de alumínio 6061-T6 para paredes de concreto e lajes integradas. A estrutura de 18 andares foi executada com um ciclo recorde de 24 horas por pavimento, reduzindo o cronograma original em 35% e garantindo acabamento pronto para pintura direta.',
    desafio: 'Garantir ciclo diário contínuo de concretagem sem interrupções e com tolerância dimensional inferior a 2mm em toda a prumada de 18 andares.',
    solucao: 'Engenharia da Fundiferro projetou fôrmas de alumínio com sistema de desforma rápida antecipada de laje e travamentos cônicos auto-alinhantes.',
    resultado: 'Redução de 35% no prazo global da estrutura e eliminação de 100% dos rebocos tradicionais.',
    badgeHighlight: 'Ciclo 24h / Pavimento',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Área de Fôrmas': '4.200 m²',
      'Ciclo por Laje': '24 horas',
      'Sistema Utilizado': 'Fôrmas de Alumínio 6061-T6',
      'Tipologia': 'Torre Vertical (18 Pavimentos)',
      'Engenheiro Líder': 'Peter Prudencio',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'reengenharia-alianca',
    title: 'Reengenharia & Reforma de Acervo - Edifício Aliança',
    category: 'reforma',
    location: 'São José do Rio Preto / SP',
    shortDescription: 'Reaproveitamento e readequação geométrica de fôrmas usadas com economia de R$ 1,2 milhão.',
    detailedDescription: 'Reaproveitamento técnico de 85% do acervo antigo de fôrmas despadronizadas do próprio cliente. Nossa engenharia redesenhou todas as modulações, desempenou painéis hidraulicamente, soldou novas costelas de reforço e fabricou os painéis de fechamento complementares, gerando economia expressiva.',
    desafio: 'A construtora possuía fôrmas usadas de outro projeto paradas no pátio com danos geométricos e layout incompatível com a nova torre.',
    solucao: 'Mapeamento tridimensional dos painéis existentes, recuperação estrutural em fábrica e fabricação cirúrgica apenas das peças de transição.',
    resultado: 'Economia de 58% em relação à compra de um jogo novo e entrega das fôrmas 40 dias mais rápida.',
    badgeHighlight: 'Economia de R$ 1.200.000',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Fôrmas Reaproveitadas': '85% do acervo existente',
      'Economia Gerada': 'R$ 1.200.000 (58%)',
      'Sistema Utilizado': 'Reforma & Reengenharia Multimarcas',
      'Garantia Estrutural': '12 Meses com ART',
      'Engenheiro Líder': 'Peter Prudencio',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'residencial-viver-bem',
    title: 'Residencial Viver Bem - 450 Casas Térreas',
    category: 'residencial',
    location: 'Catanduva / SP',
    shortDescription: 'Produção seriada com fôrmas auto-portantes atingindo a marca de 2 casas concretadas por dia.',
    detailedDescription: 'Modulação otimizada para habitação de interesse social. O projeto permitiu a montagem e desforma rápida por apenas 4 operários por equipe, concretando paredes e lajes monoliticamente com resíduo zero de madeira no canteiro.',
    desafio: 'Alta velocidade de entrega necessária para cumprir o cronograma contratual de 450 unidades habitacionais.',
    solucao: 'Conjuntos modulares leves de fácil manuseio manual sem necessidade de grua, com inserts embutidos para instalações elétricas e hidráulicas.',
    resultado: '2 residências completamente desformadas e concretadas por dia útil, com estanqueidade perfeita.',
    badgeHighlight: '2 Casas / Dia',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Unidades Totais': '450 residências térreas',
      'Produtividade': '2 casas completas / dia',
      'Sistema Utilizado': 'Fôrmas Leves de Alumínio Fundiferro',
      'Mão de Obra': '4 montadores por conjunto',
      'Engenheiro Líder': 'Paulo Solcia',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'complexo-logistico-rodoanel',
    title: 'Complexo Logístico RodoAnel - Vigas & Pilares',
    category: 'infraestrutura',
    location: 'Barueri / SP',
    shortDescription: 'Fôrmas metálicas reforçadas de seção regulável para vigas protendidas de 25 metros.',
    detailedDescription: 'Mapeamento e fabricação de moldes metálicos pesados de alta rigidez para escoramento e moldagem de vigas com mais de 25 metros de comprimento. O sistema regulável permitiu o reaproveitamento das mesmas fôrmas para diferentes seções transversais.',
    desafio: 'Vigas de grandes vãos com seções variáveis exigiam fôrmas com capacidade de suportar alta vibração e pressão sem flexão.',
    solucao: 'Estruturas em chapa de aço estrutural reforçada com perfis I e travamentos duplos por tirantes de 5/8" e porcas fundidas.',
    resultado: 'Concretagem contínua de 120 vigas de alta precisão com reaproveitamento integral do molde.',
    badgeHighlight: 'Vigas de 25m sem Deformação',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Área de Fôrmas': '2.800 m²',
      'Vigas Concretadas': '120 unidades',
      'Sistema Utilizado': 'Moldes Metálicos Reguláveis de Aço',
      'Pressão Nominal': '75 kN/m²',
      'Engenheiro Líder': 'Rodrigo Siqueira',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'condominio-morada-nobre',
    title: 'Condomínio Morada Nobre - 320 Sobrados',
    category: 'residencial',
    location: 'São José dos Campos / SP',
    shortDescription: 'Fôrmas para sobrados geminados com shafts e eletrodutos magnéticos pré-posicionados.',
    detailedDescription: 'Engenharia completa para execução seriada de sobrados geminados de 2 pavimentos com paredes estruturais em concreto. A modulação incluiu inserts magnéticos para caixas elétricas e shafts hidráulicos pré-posicionados, eliminando 100% dos rasgos em alvenaria.',
    desafio: 'Execução de paredes duplas de divisa acústica entre sobrados mantendo alinhamento vertical e prumo impecáveis.',
    solucao: 'Painéis acopláveis com alinhadores de prumo telescópicos Fundiferro e gabaritos de fixação rápida.',
    resultado: 'Redução de 40% no prazo total de construção e entrega dos sobrados com acabamento classe A.',
    badgeHighlight: 'Zero Rasgos de Tubulação',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Total de Unidades': '320 sobrados geminados',
      'Redução de Prazo': '40% em relação à alvenaria',
      'Sistema Utilizado': 'Fôrmas de Alumínio com Inserts',
      'Engenheiro Líder': 'Paulo Solcia',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'retrofit-torre-comercial',
    title: 'Retrofit & Elevação de Pé-Direito - Torre San Marino',
    category: 'reforma',
    location: 'Sorocaba / SP',
    shortDescription: 'Readequação estrutural de fôrmas existentes de 2,60m para novo padrão de 3,10m.',
    detailedDescription: 'Extensão de altura de painéis metálicos de 2,60m para 3,10m com soldagem de costelas estruturais e acoplamento rápido. A construtora reaproveitou 100% da sua estrutura base, economizando mais de R$ 850 mil.',
    desafio: 'O novo projeto arquitetônico exigia pé-direito livre de 3,10m, tornando as fôrmas antigas de 2,60m inutilizáveis sem modificação.',
    solucao: 'Criação de sobre-painéis padronizados de 50cm com travamento de alta rigidez soldados e calibrados em Catanduva/SP.',
    resultado: 'Aproveitamento total do jogo de fôrmas com garantia estrutural e emissão de laudo técnico com ART.',
    badgeHighlight: 'Pé-Direito Estendido para 3,10m',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Pé-Direito Final': '3,10 metros',
      'Economia de Custo': '58% vs. Jogo Novo',
      'Sistema Utilizado': 'Reengenharia de Painéis Fundiferro',
      'Engenheiro Líder': 'Peter Prudencio',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'corporativo-horizon',
    title: 'Edifício Corporativo Horizon - Plataformas NR-18',
    category: 'residencial',
    location: 'Campinas / SP',
    shortDescription: 'Sistema de consoles suspensos e guarda-corpos perimétricos para torre de 24 andares.',
    detailedDescription: 'Desenvolvimento de consoles de trabalho e bandejas de proteção perimetral integradas aos painéis de concreto. Garantia de segurança total para os operários na periferia do edifício de 24 pavimentos, em plena conformidade com as normas federais NR-18 e NR-35.',
    desafio: 'Montagem de fôrmas externas em grandes alturas exigia plataforma perimetral resistente a ventos fortes e quedas.',
    solucao: 'Consoles de alumínio e aço galvanizado com assoalho antiderrapante e fixação direta nos furos de tirante dos painéis.',
    resultado: 'Zero acidentes de trabalho registrados durante toda a fase de estrutura dos 24 pavimentos.',
    badgeHighlight: '100% Norma NR-18 / NR-35',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Plataformas': 'Consoles Suspensos NR-18',
      'Total de Pavimentos': '24 andares',
      'Capacidade de Carga': '150 kgf/m²',
      'Engenheiro Líder': 'Peter Prudencio',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'canalizacao-corrego-agudo',
    title: 'Canalização e Galerias - Córrego do Agudo',
    category: 'infraestrutura',
    location: 'Catanduva / SP',
    shortDescription: 'Moldes de aço de alta rigidez para aduelas e contenção de macrodrenagem urbana.',
    detailedDescription: 'Projeto de fôrmas robustas sob medida para resistir à altíssima pressão hidrostática durante a concretagem in-loco das paredes do canal de macrodrenagem. O sistema de travamento rápido por pinos e cunhas garantiu precisão milimétrica nas juntas de dilatação.',
    desafio: 'Concretagem contínua de paredes de contenção expostas a fluxo hídrico com alta solicitação de empuxo.',
    solucao: 'Pórticos metálicos treliçados com fôrmas pesadas de aço carbono e alinhadores de base reforçados.',
    resultado: '2,4 km de canal executados rigorosamente dentro do cronograma municipal.',
    badgeHighlight: 'Pressão 80 kN/m²',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Extensão do Canal': '2,4 quilômetros',
      'Pressão de Trabalho': '80 kN/m²',
      'Sistema Utilizado': 'Fôrmas Pesadas de Aço Estrutural',
      'Engenheiro Líder': 'Rodrigo Siqueira',
      'Status': 'Concluído com Sucesso'
    }
  },
  {
    id: 'viaduto-parque-linear',
    title: 'Viaduto Parque Linear Central - Pilares Circulares',
    category: 'infraestrutura',
    location: 'Bauru / SP',
    shortDescription: 'Fôrmas circulares metálicas especiais para pilares de 14m com acabamento aparente classe A.',
    detailedDescription: 'Execução de conjuntos metálicos curvos de alta precisão para pilares estruturais de viaduto com 14 metros de altura. O projeto garantiu encaixe hermético evitando vazamento de nata de cimento e assegurando acabamento aparente classe A sem retoques.',
    desafio: 'Pilares curvos de grande altura com requisitos estéticos rigorosos de concreto aparente sem juntas salientes.',
    solucao: 'Fôrmas calandradas em chapa de 4,75mm com nervuras circulares de travamento e vedação com borracha EPDM.',
    resultado: 'Desforma imediata revelando superfícies lisas, uniformes e sem bicheiras ou falhas de estanqueidade.',
    badgeHighlight: 'Concreto Aparente Classe A',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    specs: {
      'Altura dos Pilares': '14 metros',
      'Acabamento': 'Concreto Aparente Classe A',
      'Diâmetro Nominal': '1.200 mm',
      'Sistema Utilizado': 'Fôrmas Circulares Metálicas',
      'Engenheiro Líder': 'Rodrigo Siqueira',
      'Status': 'Concluído com Sucesso'
    }
  }
];

interface PortfolioPageProps {
  onBackToHome: () => void;
  onRequestQuote?: (projectName?: string) => void;
}

export default function PortfolioPage({ onBackToHome, onRequestQuote }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'residencial' | 'infraestrutura' | 'reforma'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const texts = getTexts();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const counts = {
    todos: allProjects.length,
    residencial: allProjects.filter(p => p.category === 'residencial').length,
    infraestrutura: allProjects.filter(p => p.category === 'infraestrutura').length,
    reforma: allProjects.filter(p => p.category === 'reforma').length
  };

  const categories = [
    { id: 'todos', label: 'Todos os Projetos', count: counts.todos },
    { id: 'residencial', label: 'Residencial (Parede de Concreto)', count: counts.residencial },
    { id: 'infraestrutura', label: 'Infraestrutura & Pré-Moldados', count: counts.infraestrutura },
    { id: 'reforma', label: 'Reforma & Reengenharia', count: counts.reforma }
  ] as const;

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = activeFilter === 'todos' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.badgeHighlight && project.badgeHighlight.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (project.specs['Sistema Utilizado'] && project.specs['Sistema Utilizado'].toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { value: '1.200+', label: 'Obras Atendidas', sub: 'Em todo o território nacional' },
    { value: '450.000m²', label: 'Fôrmas Entregues', sub: 'Alumínio 6061-T6 e aço estrutural' },
    { value: '24 Horas', label: 'Ciclo por Pavimento', sub: 'Desforma rápida e produtividade' },
    { value: 'Até 60%', label: 'Economia com Reengenharia', sub: 'Na recuperação de acervos usados' }
  ];

  const handleOpenContact = (projectTitle?: string) => {
    if (projectTitle) {
      window.dispatchEvent(
        new CustomEvent('fundiferro_prefill_contact', {
          detail: {
            itemName: projectTitle,
            message: `Olá! Vi o estudo de caso "${projectTitle}" no portfólio da Fundiferro e gostaria de solicitar uma proposta técnica de modulação/fôrmas para uma obra similar.`
          }
        })
      );
    }
    onBackToHome();
    setTimeout(() => {
      const el = document.getElementById('contato');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleWhatsAppCase = (project: Project) => {
    const cleanPhone = texts.contactWhatsapp.replace(/\D/g, '') || '17991812122';
    const message = `Olá! Estava analisando o case "${project.title}" (${project.location}) no site da Fundiferro e gostaria de tirar dúvidas sobre a modulação utilizada para aplicar em minha obra.`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 text-slate-900">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand bg-slate-100 hover:bg-blue-50 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-brand" />
            <span>Voltar ao Início</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span className="hidden sm:inline font-semibold">Fundiferro</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-bold text-brand bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
              Portfólio de Obras & Cases de Engenharia
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#004A99] via-[#003875] to-[#00224b] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-blue-200 font-mono font-bold text-xs uppercase tracking-widest bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Building2 className="h-3.5 w-3.5 text-blue-300" />
              Engenharia em Prática nos Canteiros
            </span>
            <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Portfólio de Obras & Estudos de Caso Reais
            </h1>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
              Conheça como a tecnologia de modulação, fabricação industrial e reengenharia de fôrmas da Fundiferro viabiliza recordes de produtividade em obras de todo o Brasil.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/15">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 rounded-2xl"
              >
                <span className="font-mono font-black text-2xl sm:text-3xl text-white block mb-1">
                  {stat.value}
                </span>
                <span className="font-sans font-bold text-xs sm:text-sm text-blue-100 block">
                  {stat.label}
                </span>
                <span className="font-sans text-[11px] text-blue-200/80 mt-1 block">
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Filter & Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Search & Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === cat.id
                    ? 'bg-brand text-white shadow-md shadow-brand/20 border border-brand'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-brand'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeFilter === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por obra, cidade ou sistema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-16 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-200 px-2 py-0.5 rounded cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-brand/40 transition-all duration-300 flex flex-col h-full group cursor-pointer"
              >
                {/* Image Wrapper with Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-5 z-10">
                    <span className="text-white text-xs font-medium leading-relaxed mb-3 line-clamp-2">
                      {project.shortDescription}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-blue-300 font-bold uppercase tracking-wider">
                      <span>Ver Estudo de Caso Completo</span>
                      <Maximize2 className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Location badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <MapPin className="h-3 w-3 text-brand" />
                    <span>{project.location.split('/')[0]}</span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 right-3 bg-white/95 text-brand backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm border border-brand/10">
                    {project.category === 'residencial' ? 'Residencial' : project.category === 'infraestrutura' ? 'Infraestrutura' : 'Reforma'}
                  </div>

                  {/* Highlight Metric Badge */}
                  {project.badgeHighlight && (
                    <div className="absolute bottom-3 left-3 bg-brand text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-md">
                      ⭐ {project.badgeHighlight}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-brand transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold truncate max-w-[170px]">
                      <Building className="h-3.5 w-3.5 text-brand shrink-0" />
                      {project.specs['Sistema Utilizado'] ? project.specs['Sistema Utilizado'].split(' ')[0] : 'Estrutura'}
                    </span>
                    <span className="text-brand font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                      Ver detalhes <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm my-6">
            <Building className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="font-bold text-base text-slate-800 mb-1">Nenhum projeto encontrado</p>
            <p className="text-xs text-slate-500 mb-4">Tente buscar por outro termo ou selecione uma categoria diferente.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('todos'); }}
              className="px-4 py-2 bg-brand text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Ver todos os projetos
            </button>
          </div>
        )}

        {/* Bottom Call to Action Card */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 via-[#002754] to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 inline-block">
              Engenharia sob Medida
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-white">
              Quer planejar a modulação de sua próxima obra com a Fundiferro?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Envie suas plantas em DWG/BIM para receber a modulação 3D completa e o dimensionamento técnico de fôrmas em até 24 horas úteis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => handleOpenContact()}
              className="px-6 py-4 bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand/30 transition-all cursor-pointer"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Project Detail Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-900/80 hover:bg-brand text-white rounded-full backdrop-blur-md transition-all cursor-pointer"
                aria-label="Fechar detalhes"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Content Scroll */}
              <div className="overflow-y-auto flex-grow">
                {/* Top Image Hero */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-brand text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                        {selectedProject.category === 'residencial' ? 'Projeto Residencial' : selectedProject.category === 'infraestrutura' ? 'Obra de Infraestrutura' : 'Reforma & Reengenharia'}
                      </span>
                      <span className="bg-slate-800/90 text-white backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-brand" /> {selectedProject.location}
                      </span>
                      {selectedProject.badgeHighlight && (
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                          ⭐ {selectedProject.badgeHighlight}
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Technical Description and Datasheet */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Narrative & Challenge/Solution */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-slate-900 font-sans font-bold text-sm uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
                        Descrição do Caso Técnico
                      </h4>
                      <p className="font-sans text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {selectedProject.detailedDescription}
                      </p>
                    </div>

                    {/* Challenge vs Solution vs Result Breakdown */}
                    {(selectedProject.desafio || selectedProject.solucao || selectedProject.resultado) && (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                        {selectedProject.desafio && (
                          <div>
                            <span className="font-bold text-slate-900 block mb-0.5">⚠️ Desafio da Obra:</span>
                            <span className="text-slate-600 leading-relaxed">{selectedProject.desafio}</span>
                          </div>
                        )}
                        {selectedProject.solucao && (
                          <div>
                            <span className="font-bold text-brand block mb-0.5">💡 Solução de Engenharia Fundiferro:</span>
                            <span className="text-slate-600 leading-relaxed">{selectedProject.solucao}</span>
                          </div>
                        )}
                        {selectedProject.resultado && (
                          <div>
                            <span className="font-bold text-emerald-700 block mb-0.5">🏆 Resultado Alcançado:</span>
                            <span className="text-slate-600 leading-relaxed">{selectedProject.resultado}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-xl">
                      <h5 className="font-sans font-bold text-brand text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Cpu className="h-4 w-4" /> Metodologia de Modulação Fundiferro
                      </h5>
                      <p className="font-sans text-slate-600 text-xs leading-relaxed">
                        Nossos projetos utilizam modelagem 3D proprietária para realizar o mapeamento milimétrico de cada fôrma. Isto reduz consideravelmente sobras físicas, garantindo uma montagem padronizada, rápida e estruturalmente impecável conforme a NBR 16055.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Datasheet and CTAs */}
                  <div className="md:col-span-5">
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
                      <h4 className="text-slate-900 font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-3">
                        <Grid className="h-4 w-4 text-brand" /> Ficha Técnica da Obra
                      </h4>

                      <div className="space-y-3">
                        {Object.entries(selectedProject.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2">
                            <span className="font-sans text-slate-500 font-medium">
                              {key}
                            </span>
                            <span className="font-sans font-bold text-slate-800 text-right">
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 space-y-2.5">
                        <button
                          onClick={() => {
                            const title = selectedProject.title;
                            setSelectedProject(null);
                            handleOpenContact(title);
                          }}
                          className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand/20"
                        >
                          <span>Solicitar Solução Similar</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            handleWhatsAppCase(selectedProject);
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Dúvidas Técnicas no WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Fundiferro Formas Metálicas • Catanduva/SP</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Engenharia Homologada
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
