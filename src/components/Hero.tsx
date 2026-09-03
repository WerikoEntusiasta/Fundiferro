/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getTexts } from '../utils/storage';

interface HeroProps {
  onExplore: (sectionId: string) => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const [texts, setTexts] = useState(getTexts());

  useEffect(() => {
    const handleUpdate = () => {
      setTexts(getTexts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);
  
  // Parallax transform variables for subtle, smooth scrolling adjustments
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], ['0%', '-8%']);
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section
      ref={targetRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-slate-900 pt-28 pb-16 border-b border-slate-100"
    >
      {/* PARALLAX BLUEPRINT BACKGROUND LAYERS - Identical to Project Gallery */}
      <motion.div 
        id="hero-parallax-blueprint-grid"
        className="absolute inset-0 pointer-events-none opacity-[0.06] select-none z-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c7_1.5px,transparent_1.5px),linear-gradient(to_bottom,#0284c7_1.5px,transparent_1.5px)] bg-[size:60px_60px]"></div>
      </motion.div>

      {/* Blueprint Shape 1 - Architectural Grid Circle */}
      <div className="absolute -right-24 top-12 w-96 h-96 pointer-events-none z-0 text-brand/10 select-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="30" x2="170" y2="170" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Blueprint Shape 2 - Technical Grid Rectangle */}
      <div className="absolute -left-32 bottom-20 w-80 h-80 pointer-events-none z-0 text-brand/10 select-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="1" />
          <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          style={{ y: textY, opacity: fadeOut }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column: Headline, Description and Minimalist Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Minimal Badge */}
            <span className="inline-block bg-brand/10 text-brand px-3 py-1 rounded text-xs font-bold mb-6 uppercase tracking-wider">
              DESDE 2003 • TRADIÇÃO & TECNOLOGIA
            </span>

            {/* Main Title */}
            <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95] text-slate-900 mb-6 max-w-2xl">
              {texts.heroTitle}
            </h1>

            {/* Concise Summary Description */}
            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
              {texts.heroSubtitle}
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10 w-full">
              <button
                id="hero-cta-primary"
                onClick={() => onExplore('produtos')}
                className="group flex items-center justify-center space-x-2 bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-900/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Nossas Soluções</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="hero-cta-secondary"
                onClick={() => onExplore('contato')}
                className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Fazer Orçamento</span>
              </button>
            </div>

            {/* Minimalist Left-Bordered Stats */}
            <div className="flex flex-wrap gap-8 border-t border-slate-100 pt-8 w-full max-w-xl">
              <div className="flex flex-col border-l-4 border-brand pl-4 min-w-[120px]">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">+20 Anos</span>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">De História</span>
              </div>
              
              <div className="flex flex-col border-l-4 border-slate-200 pl-4 min-w-[120px]">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">100%</span>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Homologação</span>
              </div>

              <div className="flex flex-col border-l-4 border-slate-200 pl-4 min-w-[120px]">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono">NBR 16055</span>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Segurança Máxima</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cascading High-Contrast Cards from Design HTML */}
          <div className="lg:col-span-5 flex flex-col gap-4 py-4 relative w-full mt-8 lg:mt-0">
            {/* Card 1: Formas */}
            <motion.div
              id="hero-card-formas"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 shadow-2xl border-l-8 border-brand cursor-pointer rounded-sm"
              onClick={() => onExplore('formas-detalhe')}
            >
              <h3 className="font-bold text-lg mb-1 text-slate-900">Formas de Alumínio</h3>
              <p className="text-xs text-slate-500 leading-snug">
                Sistemas de perfis extrusados de alta precisão para um acabamento liso e excelente durabilidade.
              </p>
            </motion.div>

            {/* Card 2: Reforma & Adaptação */}
            <motion.div
              id="hero-card-reforma"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-slate-900 p-6 text-white shadow-xl cursor-pointer rounded-sm"
              onClick={() => onExplore('reforma-detalhe')}
            >
              <h3 className="font-bold text-lg mb-1">Reforma & Adaptação</h3>
              <p className="text-xs text-slate-400 leading-snug">
                Renovamos e adaptamos formas de qualquer fabricante para novos projetos com reengenharia completa.
              </p>
            </motion.div>

            {/* Card 3: Segurança */}
            <motion.div
              id="hero-card-seguranca"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-brand p-6 text-white shadow-xl cursor-pointer rounded-sm"
              onClick={() => onExplore('seguranca-detalhe')}
            >
              <h3 className="font-bold text-lg mb-1">Segurança NR-18</h3>
              <p className="text-xs text-blue-100 leading-snug">
                Sistemas completos de proteção coletiva, passarelas de trabalho seguro e acessos em altura.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
