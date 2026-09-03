/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building2, Award, Leaf, Target, ShieldCheck, History, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getTexts } from '../utils/storage';

interface AboutSectionProps {
  onOpenAboutPage?: () => void;
}

export default function AboutSection({ onOpenAboutPage }: AboutSectionProps) {
  const [texts, setTexts] = useState(getTexts());

  useEffect(() => {
    const handleUpdate = () => {
      setTexts(getTexts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  const pillars = [
    {
      icon: History,
      title: 'Nossa História',
      text: 'Pioneira em soluções de engenharia para fôrmas de parede de concreto e sistemas metálicos de escoramento com mais de 20 anos de atuação.',
      tag: 'Tradição & Solidez'
    },
    {
      icon: Building2,
      title: 'Nossa Estrutura',
      text: 'Parque fabril amplo em Catanduva/SP com pré-montagem, estoque técnico permanente e modelagem 3D CAD/BIM de alta precisão.',
      tag: 'Parque Fabril SP'
    },
    {
      icon: Target,
      title: 'Nossa Missão',
      text: 'Garantir que cada canteiro de obras atinja ciclos de desforma rápidos de 24 horas com máxima segurança e acabamento pronto.',
      tag: 'Ciclo 24h & Produtividade'
    },
    {
      icon: Award,
      title: 'Nossa Visão',
      text: 'Ser a principal referência nacional em desenvolvimento, fabricação e reengenharia inteligente de fôrmas metálicas.',
      tag: 'Liderança Nacional'
    },
    {
      icon: ShieldCheck,
      title: 'Nossos Valores',
      text: 'Segurança operacional absoluta (NR-18), precisão dimensional milimétrica (NBR 16055) e atendimento técnico consultivo.',
      tag: 'Normas & Rigor'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      text: 'Painéis metálicos reutilizáveis centenas de vezes que eliminam o consumo de madeira e geram resíduo zero na sua obra.',
      tag: 'Eco-Eficiência'
    }
  ];

  return (
    <section id="quem-somos" className="py-16 sm:py-20 bg-slate-50/70 relative overflow-hidden border-b border-slate-200 scroll-mt-16">
      {/* Background blueprint subtle mesh pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#004A99_1.5px,transparent_1.5px),linear-gradient(to_bottom,#004A99_1.5px,transparent_1.5px)] bg-[size:48px_48px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-3.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Engenharia e Solidez
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
              {texts.aboutTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Estabelecida em Catanduva/SP, a <strong className="text-brand font-bold">Fundiferro</strong> desenvolve soluções estruturais de alta tecnologia para parede de concreto e suprimentos em todo o território nacional.
            </p>
          </motion.div>
        </div>

        {/* High-End Modern Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                id={`pillar-card-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ y: -5 }}
                onClick={onOpenAboutPage}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-900/10 border border-slate-200/90 hover:border-brand/40 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Top Accent Gradient Border on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#004A99] via-blue-500 to-[#002754] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Subtle light background glow on hover */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />

                <div>
                  {/* Card Header: Distinctive Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#004A99] to-[#002754] text-white flex items-center justify-center shadow-md shadow-blue-900/15 group-hover:scale-105 group-hover:shadow-blue-900/25 transition-all duration-300">
                      <IconComp className="h-5 w-5 text-blue-100 group-hover:text-white" />
                    </div>

                    <span className="text-[10px] font-mono font-bold text-brand bg-blue-50/90 border border-blue-200/70 px-2.5 py-1 rounded-md uppercase tracking-wider shadow-2xs">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Pillar Title */}
                  <h3 className="font-sans font-bold text-lg text-slate-900 tracking-tight group-hover:text-brand transition-colors mb-2.5">
                    {pillar.title}
                  </h3>

                  {/* Clean, Full Description without truncation */}
                  <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {pillar.text}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-200">
                    <span>Ver detalhes</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>

                  <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Fundiferro
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full About Page Button */}
        {onOpenAboutPage && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenAboutPage}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-blue-50 text-brand border-2 border-brand/20 hover:border-brand rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>Conheça a História e Estrutura Completa da Fundiferro</span>
              <div className="w-6 h-6 rounded-full bg-blue-100 group-hover:bg-brand group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
