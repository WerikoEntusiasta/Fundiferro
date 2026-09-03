/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Award,
  Leaf,
  Target,
  ShieldCheck,
  History,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Factory,
  Wrench,
  Users,
  Compass,
  FileCheck,
  Truck,
  Layers,
  ArrowRight,
  PhoneCall,
  MapPin,
  Cpu,
  Boxes,
  Clock,
  HardHat,
  Scale,
  Cog,
  Microscope,
  Phone
} from 'lucide-react';
import { getTexts } from '../utils/storage';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export default function AboutPage({ onBackToHome, onNavigateToSection }: AboutPageProps) {
  const [texts, setTexts] = useState(getTexts());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handleUpdate = () => {
      setTexts(getTexts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  const stats = [
    { label: 'Anos de Tradição', value: '20+', detail: 'Pioneirismo em sistemas para concreto' },
    { label: 'Obras Atendidas', value: '1.200+', detail: 'Empreendimentos em todo o Brasil' },
    { label: 'Precisão Dimensional', value: '±0,5mm', detail: 'Usinagem e corte CNC robotizado' },
    { label: 'Economia com Reengenharia', value: 'Até 60%', detail: 'Na reforma de acervos usados' }
  ];

  const fullPillars = [
    {
      icon: History,
      title: 'Nossa História',
      tag: 'Tradição & Origem',
      description: texts.aboutHistory || 'Fundada em Catanduva/SP, a Fundiferro é pioneira e referência nacional em soluções de engenharia para fôrmas de parede de concreto e sistemas metálicos de escoramento.',
      details: [
        'Mais de duas décadas de atuação ininterrupta atendendo as maiores construtoras do país.',
        'Desenvolvimento contínuo de patentes, perfis estruturais de alumínio 6061-T6 e travas de alta tenacidade.',
        'Evolução tecnológica da carpintaria tradicional para sistemas industrializados de ciclo diário de 24h.'
      ]
    },
    {
      icon: Factory,
      title: 'Estrutura & Parque Fabril',
      tag: 'Catanduva / SP',
      description: 'Dispomos de uma moderna planta industrial com pátio de montagem teste, estoque permanente de perfis e acessórios e maquinário especializado.',
      details: [
        'Pátio de pré-montagem integral: 100% dos conjuntos são testados em fábrica antes da expedição.',
        'Células robotizadas de corte CNC e soldagem MIG/TIG com controle térmico anti-deformação.',
        'Capacidade de atendimento rápido para reposição de peças e acessórios em tempo recorde.'
      ]
    },
    {
      icon: Target,
      title: 'Nossa Missão',
      tag: 'Compromisso Técnico',
      description: texts.aboutMission || 'Garantir que cada obra de parede de concreto atinja ciclos de desforma ultra rápidos e seguros por meio de produtos engenheirados e assistência técnica integral.',
      details: [
        'Transformar canteiros de obras em linhas de montagem industrializadas, limpas e previsíveis.',
        'Oferecer suporte técnico de engenharia de ponta a ponta, da planta à concretagem final.',
        'Reduzir custos globais da construção civil com soluções duradouras e de alta ciclografia.'
      ]
    },
    {
      icon: Award,
      title: 'Nossa Visão',
      tag: 'Liderança Nacional',
      description: texts.aboutVision || 'Ser reconhecida como a maior e mais eficiente parceira de reengenharia, reforma e desenvolvimento de fôrmas metálicas do mercado brasileiro.',
      details: [
        'Manter-se na vanguarda da tecnologia construtiva em paredes de concreto armado.',
        'Expandir a rede de atendimento para canteiros de todas as regiões com logística expressa.',
        'Ser sinônimo absoluto de confiabilidade geométrica e respaldo técnico para incorporadoras.'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Nossos Valores',
      tag: 'Segurança & Rigor',
      description: texts.aboutValues || 'Segurança Operacional Absoluta (NR-18), Racionalização de Recursos, Qualidade Geométrica Milimétrica e Atendimento Pró-Ativo.',
      details: [
        'Rigor absoluto no atendimento às normas técnicas vigentes (NBR 16055, NR-18 e NR-35).',
        'Ética transparente em medições, ensaios de resistência e orçamentação técnica sem custos ocultos.',
        'Valorização contínua do capital humano e dos profissionais de campo.'
      ]
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade & ESG',
      tag: 'Eco-Eficiência',
      description: 'Buscamos constantemente práticas sustentáveis em toda a cadeia fabril. O uso de sistemas de alumínio reutilizáveis diminui drasticamente a geração de entulhos.',
      details: [
        'Eliminação do descarte massivo de madeira e compensados nos canteiros modernos.',
        'Reciclabilidade total do alumínio e do aço após centenas de ciclos construtivos.',
        'Processos industriais com baixo consumo de insumos e destinação correta de resíduos metálicos.'
      ]
    }
  ];

  const infrastructureSectors = [
    {
      icon: Cpu,
      title: 'Engenharia Digital & Modulação BIM/CAD',
      desc: 'Departamento técnico dedicado à compatibilização de projetos estruturais, hidrossanitários e elétricos, gerando mapas de montagem em 3D codificados por cômodo.'
    },
    {
      icon: Cog,
      title: 'Corte CNC & Usinagem de Perfis',
      desc: 'Centros de usinagem com controle numérico para perfis extrudados de liga nobre de alumínio 6061-T6, garantindo esquadros e furações milimétricas.'
    },
    {
      icon: Microscope,
      title: 'Soldagem MIG/TIG de Alta Integridade',
      desc: 'Células de solda automatizadas com inspeção visual de cordão e alívio de tensões para evitar empenamentos durante as solicitações de concretagem.'
    },
    {
      icon: Layers,
      title: 'Pátio de Pré-Montagem & Mock-up 1:1',
      desc: 'Área fabril onde montamos o apartamento-tipo ou paredes-piloto antes do despacho para validar estanqueidade, pinagem e alinhamento real.'
    },
    {
      icon: Wrench,
      title: 'Centro de Reengenharia & Recuperação',
      desc: 'Linha exclusiva para desamasso hidráulico, jateamento, troca de perfis perimetrais e readequação de painéis usados multimarcas.'
    },
    {
      icon: Boxes,
      title: 'Almoxarifado & Estoque de Reposição',
      desc: 'Mais de 100.000 itens a pronta-entrega entre pinos cônicos, cunhas forjadas, tirantes de alta tração, porcas borboleta e tubos PVC.'
    }
  ];

  const manufacturingSteps = [
    {
      number: '01',
      title: 'Compatibilização & Modulação BIM',
      desc: 'Nossa engenharia recebe os projetos executivos em DWG/Revit e elabora o plano de fôrmas, definindo cada painel, canto, viga e compensador.'
    },
    {
      number: '02',
      title: 'Usinagem Industrial & Solda Homologada',
      desc: 'Corte computadorizado de perfis estruturais de alumínio 6061-T6 e soldagem com rígido controle térmico para tolerâncias de ±0,5mm.'
    },
    {
      number: '03',
      title: 'Mock-up & Montagem Teste em Fábrica',
      desc: 'Montagem completa dos jogos em nosso pátio em Catanduva/SP para validação de encaixes, pinos, cunhas e prumo antes do frete.'
    },
    {
      number: '04',
      title: 'Expedição Identificada com ART & Treinamento',
      desc: 'Envio paletizado com código de cores por ambiente, Anotação de Responsabilidade Técnica (ART) e manual ilustrado passo a passo.'
    }
  ];

  const handleOpenContact = () => {
    onBackToHome();
    setTimeout(() => {
      const el = document.getElementById('contato');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleWhatsApp = () => {
    const cleanPhone = (texts.contactWhatsapp || '').replace(/\D/g, '') || '17991812122';
    const targetNumber = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const message = `Olá! Gostaria de agendar uma visita técnica à fábrica da Fundiferro em Catanduva/SP ou solicitar uma apresentação corporativa.`;
    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
              Quem Somos • Infraestrutura Industrial
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner with Corporate Depth */}
      <section className="bg-gradient-to-br from-[#004A99] via-[#003875] to-[#00224b] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-blue-200 font-mono font-bold text-xs uppercase tracking-widest bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-4 shadow-xs">
              <Factory className="h-3.5 w-3.5 text-blue-300" />
              Parque Fabril & Engenharia em Catanduva/SP
            </span>
            <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Fundiferro: Engenharia, Precisão e Alta Performance em Fôrmas
            </h1>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
              Mais de duas décadas transformando canteiros de obras em indústrias produtivas por meio de sistemas de fôrmas de alumínio, escoramentos metálicos e reengenharia de acervos.
            </p>
          </div>

          {/* Stats Grid */}
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
                  {stat.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* 1. History & Industrial Trajectory */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full inline-block">
              Nossa Trajetória
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Mais de Duas Décadas de Pioneirismo em Parede de Concreto
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Com sede no polo industrial metalmecânico de <strong>Catanduva/SP</strong>, a Fundiferro consolidou-se como um dos principais centros brasileiros de desenvolvimento de moldes e escoramentos de alta precisão para a construção civil.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Acompanhamos e impulsionamos a evolução dos métodos construtivos racionalizados no Brasil, fornecendo fôrmas que viabilizam o <strong>ciclo diário de concretagem em 24 horas</strong> em edifícios verticais, sobrados e conjuntos habitacionais em todo o território nacional.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <MapPin className="h-3.5 w-3.5 text-brand" /> Catanduva / SP • Sede Fabril
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <FileCheck className="h-3.5 w-3.5 text-emerald-600" /> Conformidade NBR 16055 & NR-18
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Truck className="h-3.5 w-3.5 text-blue-600" /> Logística Integrada para Todo o País
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-[#002754] text-white p-7 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
            <h3 className="font-mono font-bold text-sm text-blue-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" /> Rigor Técnico e Garantias
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Calibração em Fábrica:</strong> 100% dos painéis e travas passam por teste de encaixe e gabarito antes da expedição.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Reengenharia sob Medida:</strong> Modulações adaptadas para qualquer tipologia arquitetônica com economia de até 60%.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Assistência de Campo:</strong> Treinamento prático de montagem para encarregados e mestres de obra.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Manufacturing Methodology (4 Steps) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-2.5 inline-block">
              Metodologia de Fabricação
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Processo Industrial do Projeto à Obra
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Controle rigoroso de qualidade em cada etapa da produção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {manufacturingSteps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-brand/30 transition-all flex flex-col justify-between">
                <div>
                  <span className="font-mono font-black text-2xl text-brand block mb-2">{step.number}.</span>
                  <h3 className="font-sans font-bold text-sm text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Controle Homologado
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Industrial Infrastructure & Capacity (6 Sectors) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-2.5 inline-block">
              Capacidade Produtiva
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Infraestrutura Fabril & Setores Industriais
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Planta instalada em Catanduva/SP estruturada para atender demandas de grande porte simultaneamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureSectors.map((sector) => {
              const SecIcon = sector.icon;
              return (
                <div key={sector.title} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-brand/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-brand flex items-center justify-center mb-4 border border-blue-100">
                      <SecIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-sans font-bold text-base text-slate-900 mb-2">{sector.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sector.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Fábrica Catanduva/SP</span>
                    <span className="text-brand font-semibold">100% Nacional</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Strategic Pillars (6 Cards) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-2.5 inline-block">
              Nossos Pilares Estratégicos
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              A Filosofia que Conduz a Engenharia da Fundiferro
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullPillars.map((p, idx) => {
              const IconComponent = p.icon;
              return (
                <div
                  key={p.title}
                  className="group relative bg-white rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-900/10 border border-slate-200/90 hover:border-brand/40 flex flex-col justify-between transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#004A99] via-blue-500 to-[#002754] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#004A99] to-[#002754] text-white flex items-center justify-center shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="h-5 w-5 text-blue-100" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-brand bg-blue-50/90 border border-blue-200/70 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {p.tag}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-slate-900 tracking-tight group-hover:text-brand transition-colors mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {p.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {p.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Pilar 0{idx + 1}</span>
                    <span className="text-brand font-semibold">Fundiferro</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Bottom Corporate CTA */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#002754] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 inline-block">
              Parceria & Visita Técnica
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-white">
              Deseja conhecer nossa fábrica em Catanduva/SP ou cotar seu projeto?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Nossos engenheiros estão prontos para receber sua equipe técnica, apresentar nossos centros de usinagem e elaborar um estudo de modulação sob medida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleOpenContact}
              className="px-6 py-4 bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand/30 transition-all cursor-pointer"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Falar no WhatsApp</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
