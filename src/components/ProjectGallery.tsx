/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Building, 
  MapPin, 
  Layers, 
  X, 
  ExternalLink, 
  Grid, 
  Maximize2,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Sparkles,
  Phone
} from 'lucide-react';
import { allProjects, Project } from './PortfolioPage';
import { getTexts } from '../utils/storage';

interface ProjectGalleryProps {
  onOpenPortfolioPage?: () => void;
}

export default function ProjectGallery({ onOpenPortfolioPage }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const texts = getTexts();
  
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax calculations using motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Background offsets for layered parallax elements
  const yBgGrid = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const yBgBlueprint1 = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const yBgBlueprint2 = useTransform(scrollYProgress, [0, 1], ['25%', '-25%']);
  const opacityBlueprint = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.2, 0.1]);

  // Strictly display 1 row with 3 top cards (Vertical Tower, Reengineering and Subdivision)
  const displayedProjects = allProjects.slice(0, 3);

  const handleWhatsAppCase = (project: Project) => {
    const cleanPhone = texts.contactWhatsapp.replace(/\D/g, '') || '17991812122';
    const message = `Olá! Vi o case "${project.title}" no site da Fundiferro e gostaria de uma solução similar para minha obra.`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section 
      id="galeria-projetos" 
      ref={sectionRef}
      className="py-16 sm:py-20 bg-white relative overflow-hidden scroll-mt-16 border-b border-slate-100"
    >
      {/* PARALLAX BLUEPRINT BACKGROUND LAYERS */}
      <motion.div 
        id="parallax-blueprint-grid"
        style={{ y: yBgGrid }}
        className="absolute inset-0 pointer-events-none opacity-[0.06] select-none z-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c7_1.5px,transparent_1.5px),linear-gradient(to_bottom,#0284c7_1.5px,transparent_1.5px)] bg-[size:60px_60px]"></div>
      </motion.div>

      {/* Parallax Blueprint Shape 1 */}
      <motion.div
        id="parallax-blueprint-shape-1"
        style={{ y: yBgBlueprint1, opacity: opacityBlueprint }}
        className="absolute -right-24 top-12 w-96 h-96 pointer-events-none z-0 text-brand/10 select-none"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="30" x2="170" y2="170" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </motion.div>

      {/* Parallax Blueprint Shape 2 */}
      <motion.div
        id="parallax-blueprint-shape-2"
        style={{ y: yBgBlueprint2, opacity: opacityBlueprint }}
        className="absolute -left-32 bottom-20 w-80 h-80 pointer-events-none z-0 text-brand/10 select-none"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="1" />
          <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* CONTENT INNER WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-3.5 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Engenharia em Prática nos Canteiros
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-3">
              Projetos & Estudos de Caso em Destaque
            </h2>
            <p className="font-sans text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Obras verticais, condomínios habitacionais e reengenharias estruturais executadas com sistemas Fundiferro.
            </p>
          </motion.div>
        </div>

        {/* EXACTLY 1 ROW OF 3 CARDS */}
        <div 
          id="gallery-grid" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
        >
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-brand/30 transition-all duration-300 flex flex-col h-full group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Card Image Wrapper */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                
                {/* Blueprint Graphic Grid Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5 z-10">
                  <span className="text-white text-xs font-medium leading-relaxed mb-3 line-clamp-2">
                    {project.shortDescription}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-blue-300 font-bold uppercase tracking-wider">
                    <span>Ver Ficha Técnica</span>
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Top Location Tag */}
                <div className="absolute top-3.5 left-3.5 bg-slate-900/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <MapPin className="h-3 w-3 text-brand" />
                  <span>{project.location.split('/')[0]}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3.5 right-3.5 bg-white/95 text-brand backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm border border-brand/10">
                  {project.category === 'residencial' ? 'Residencial' : project.category === 'infraestrutura' ? 'Infraestrutura' : 'Reforma'}
                </div>

                {/* Highlight Metric Badge */}
                {project.badgeHighlight && (
                  <div className="absolute bottom-3 left-3 bg-brand text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-md z-10">
                    ⭐ {project.badgeHighlight}
                  </div>
                )}
              </div>

              {/* Card content text */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-brand transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="font-sans text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-[11px] text-slate-600 truncate max-w-[170px]">
                    <Building className="h-3.5 w-3.5 text-brand shrink-0" /> 
                    {project.specs['Sistema Utilizado'] ? project.specs['Sistema Utilizado'].split(' ')[0] : 'Estrutura'}
                  </span>
                  <span className="text-brand font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    Detalhes <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Portfolio Page Action Button */}
        {onOpenPortfolioPage && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPortfolioPage}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-5 bg-gradient-to-r from-[#004A99] via-[#005bbd] to-[#003B7C] hover:from-[#003B7C] hover:to-[#002754] text-white rounded-2xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-blue-900/50 border-2 border-blue-400/40 ring-4 ring-blue-500/20 cursor-pointer group select-none"
            >
              <Sparkles className="h-4 w-4 text-blue-300 group-hover:rotate-12 transition-transform duration-300" />
              <span>Ver Portfólio Completo de Obras & Estudos de Caso</span>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-brand transition-all">
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          </div>
        )}

      </div>

      {/* DETAIL MODAL DRAWER / DIALOG */}
      <AnimatePresence>
        {selectedProject && (
          <div id="project-detail-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Modal Backdrop */}
            <motion.div
              id="project-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Body Card */}
            <motion.div
              id="project-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                id="close-modal-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-900/80 hover:bg-brand text-white rounded-full backdrop-blur-md transition-all cursor-pointer"
                aria-label="Fechar detalhes"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Contents Scrollable Container */}
              <div className="overflow-y-auto flex-grow">
                
                {/* Top Image Hero Banner */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-100">
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
                      <span className="bg-slate-800/80 text-white backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
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

                {/* Technical Specifications Grid Layout */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Extensive technical narrative */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-slate-900 font-sans font-bold text-sm uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
                        Descrição do Caso Técnico
                      </h4>
                      <p className="font-sans text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {selectedProject.detailedDescription}
                      </p>
                    </div>

                    {/* Challenge vs Solution vs Result */}
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

                    <div className="bg-blue-50/70 border border-blue-100 p-5 rounded-xl">
                      <h5 className="font-sans font-bold text-brand text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Cpu className="h-4 w-4" /> Metodologia de Modulação Fundiferro
                      </h5>
                      <p className="font-sans text-slate-600 text-xs leading-relaxed">
                        Nossos projetos utilizam modelagem 3D proprietária para realizar o mapeamento milimétrico de cada fôrma. Isto reduz consideravelmente as sobras físicas, garantindo uma montagem padronizada, rápida e estruturalmente impecável nas diretrizes das normas NBR 16055.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Key technical datasheet */}
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
                          id="btn-modal-request"
                          onClick={() => {
                            const projectTitle = selectedProject.title;
                            setSelectedProject(null);
                            window.dispatchEvent(
                              new CustomEvent('fundiferro_prefill_contact', {
                                detail: {
                                  itemName: projectTitle,
                                  message: `Olá! Vi o projeto "${projectTitle}" no portfólio da Fundiferro e gostaria de solicitar uma proposta técnica de modulação/fôrmas para uma obra similar.`
                                }
                              })
                            );
                            const contatoEl = document.getElementById('contato');
                            if (contatoEl) {
                              contatoEl.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand/10"
                        >
                          <span>Solicitar Solução Similar</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleWhatsAppCase(selectedProject)}
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
              
              {/* Modal footer detailing */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Fundiferro Formas Metálicas</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Engenharia Homologada
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
