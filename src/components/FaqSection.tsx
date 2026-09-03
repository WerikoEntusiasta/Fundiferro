/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Send,
  Sparkles,
  ShieldCheck,
  Layers,
  Wrench,
  Clock,
  DollarSign
} from 'lucide-react';
import { faqList } from '../data';
import { getTexts } from '../utils/storage';

interface FaqSectionProps {
  onOpenContact?: () => void;
}

export default function FaqSection({ onOpenContact }: FaqSectionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const texts = getTexts();

  // Categorized FAQs with additional technical questions
  const fullFaqList = [
    {
      question: 'Qual é o objetivo e funcionamento das formas para parede de concreto?',
      answer: 'O objetivo das formas para parede de concreto é criar uma estrutura temporária estanque e de altíssima precisão que confine o concreto fluido em sua geometria exata até que atinja a resistência de desforma. Elas garantem prumo, nivelamento milimétrico e esquadro perfeito das paredes e lajes em ciclos acelerados.',
      category: 'Paredes de Concreto'
    },
    {
      question: 'Quanto tempo leva para o concreto endurecer antes de desformar?',
      answer: 'O tempo necessário para a desforma varia entre 7 a 15 horas dependendo do traço do concreto, tipo de cimento (CP-V ARI), temperatura ambiente e aditivos aceleradores. Com os sistemas Fundiferro e concreto autoadensável, atinge-se o ciclo padrão de 24 horas para desforma e remontagem no pavimento seguinte.',
      category: 'Processo & Ciclo'
    },
    {
      question: 'Quais são as principais vantagens econômicas frente à alvenaria tradicional?',
      answer: 'A produtividade é multiplicada em até 4x, eliminando etapas demoradas de assentamento de blocos e cortes para conduítes elétricos/hidráulicos (já embutidos na concretagem). O acabamento liso dispensa chapisco e reboco grosso, reduzindo expressivamente o desperdício de materiais e a folha de pagamento.',
      category: 'Economia & Vantagens'
    },
    {
      question: 'É possível reaproveitar ou reformar formas antigas para novos projetos?',
      answer: 'Sim! As formas de alumínio e metálicas possuem vida útil superior a centenas de ciclos. A Fundiferro é especialista nacional em reforma e reengenharia de formas usadas de qualquer fabricante, adequando seus painéis existentes para uma nova planta arquitetônica com economia de até 60%.',
      category: 'Reforma & Reuso'
    },
    {
      question: 'Quais são os cuidados técnicos essenciais durante a concretagem?',
      answer: 'Recomenda-se: 1) Checar a estanqueidade e aperto de todos os pinos e cunhas; 2) Aplicar desmoldante adequado de base vegetal; 3) Conferir prumo e alinhadores reguláveis; 4) Respeitar a velocidade máxima de lançamento e pressão hidrostática conforme a norma NBR 16055; 5) Inspecionar as plataformas e linhas de vida NR-18.',
      category: 'Segurança & Normas'
    },
    {
      question: 'Os sistemas de segurança atendem integralmente à NR-18 e acompanham ART?',
      answer: 'Sim, 100% dos kits de plataformas, passarelas e guarda-corpos Fundiferro são fabricados em total conformidade com a NR-18 e NR-35, acompanhados de ART (Anotação de Responsabilidade Técnica) assinada por engenheiro mecânico/estrutural habilitado.',
      category: 'Segurança & Normas'
    },
    {
      question: 'Como funciona o envio de projetos e a elaboração do orçamento?',
      answer: 'Basta nos enviar a planta baixa e os arquivos DWG/CAD/BIM da sua obra pelo formulário de contato ou WhatsApp. Nossa equipe de engenharia modula o projeto, calcula os painéis e acessórios necessários e entrega uma proposta técnica completa em até 24 a 48 horas.',
      category: 'Processo & Ciclo'
    },
    {
      question: 'A Fundiferro realiza entregas em quais estados do Brasil?',
      answer: 'A partir do nosso parque fabril em Catanduva/SP, enviamos formas, acessórios e equipamentos para construtoras e canteiros de obras em todo o território nacional, com embalagens organizadas e rastreabilidade total.',
      category: 'Logística & Suporte'
    }
  ];

  const categories = ['Todas', 'Paredes de Concreto', 'Processo & Ciclo', 'Economia & Vantagens', 'Reforma & Reuso', 'Segurança & Normas', 'Logística & Suporte'];

  const filteredFaqs = fullFaqList.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleWhatsApp = () => {
    const rawPhone = texts.contactWhatsapp || '5517997720919';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    const message = encodeURIComponent('Olá! Estava consultando a seção de Dúvidas Técnicas no site da Fundiferro e gostaria de tirar uma dúvida sobre o meu projeto.');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-slate-50/70 border-t border-b border-slate-200 relative overflow-hidden scroll-mt-16">
      
      {/* Blueprint grid background subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-3.5 shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-brand" />
            Dúvidas & FAQ Técnico
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
            Perguntas Frequentes & Engenharia
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Respostas detalhadas sobre sistemas de fôrmas, ciclos de concretagem, normas NR-18, reforma de painéis e orçamento para seu canteiro.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: ciclo de 24h, reforma, NR-18, desforma, custos...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Categories Pill List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-3.5 mb-14">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${
                    isOpen
                      ? 'border-brand/40 shadow-md ring-2 ring-brand/10'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? 'bg-brand' : 'bg-slate-300'}`} />
                      <span>{faq.question}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'bg-brand text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          <p className="mb-3">{faq.answer}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-[11px] font-mono font-semibold text-brand bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                              #{faq.category}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Fundiferro Engenharia
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-sm text-slate-800 mb-1">Nenhuma dúvida encontrada para "{searchQuery}"</p>
              <p className="text-xs text-slate-500 mb-4">Tente usar outros termos ou fale diretamente com a equipe técnica.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Ver todas as perguntas
              </button>
            </div>
          )}
        </div>

        {/* Technical Support Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#004A99] via-[#003B7C] to-[#002754] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block mb-3">
              Engenharia ao seu dispor
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
              Ainda tem dúvidas técnicas sobre sua obra?
            </h3>
            <p className="text-blue-100/90 text-xs sm:text-sm max-w-xl">
              Nossa equipe de engenheiros em Catanduva/SP analisa plantas arquitetônicas e orienta a melhor solução construtiva sem compromisso.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chamar no WhatsApp</span>
            </button>

            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/15 hover:bg-white text-white hover:text-brand font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/30 hover:border-white transition-all cursor-pointer"
              >
                Enviar Planta
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
