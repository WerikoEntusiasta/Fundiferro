/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Construction, Instagram, Facebook, Linkedin, ArrowUp, MapPin, Phone, Mail, Clock, Lock } from 'lucide-react';
import { getTexts } from '../utils/storage';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onNavigate, onOpenAdmin }: FooterProps) {
  const [texts, setTexts] = useState(getTexts());

  useEffect(() => {
    const handleUpdate = () => {
      setTexts(getTexts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsapp = (texts.contactWhatsapp || '').replace(/\D/g, '');
  const cleanPhone = (texts.contactPhone || '').replace(/\D/g, '');

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900 text-xs">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
              <div className="p-2.5 bg-brand text-white rounded-sm shadow-md">
                <Construction className="h-5 w-5" />
              </div>
              <div>
                <span className="font-sans font-black text-xl tracking-tight text-white block">
                  {texts.companyName || 'FUNDIFERRO'}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand block font-bold">
                  {texts.companyTagline || 'Engenharia de Fôrmas & Concreto'}
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Especialistas em sistemas construtivos de parede de concreto armado, fôrmas modulares de alumínio 6061-T6, plataformas de segurança NR-18 e reengenharia de acervos usados.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-2 pt-2">
              {texts.instagramUrl && (
                <a
                  href={texts.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 border border-slate-800 rounded-sm hover:bg-brand hover:text-white hover:border-brand transition-all text-slate-300"
                  aria-label="Instagram Fundiferro Formas"
                  title="Instagram Oficial"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {texts.facebookUrl && (
                <a
                  href={texts.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 border border-slate-800 rounded-sm hover:bg-brand hover:text-white hover:border-brand transition-all text-slate-300"
                  aria-label="Facebook Fundiferro Formas"
                  title="Facebook Oficial"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {texts.linkedinUrl && (
                <a
                  href={texts.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 border border-slate-800 rounded-sm hover:bg-brand hover:text-white hover:border-brand transition-all text-slate-300"
                  aria-label="LinkedIn Fundiferro Formas"
                  title="LinkedIn Oficial"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold border-b border-slate-800 pb-2">
              Navegação Rápida
            </h4>
            {onNavigate && (
              <div className="flex flex-col space-y-2 text-xs">
                <button onClick={() => onNavigate('inicio')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Início / Apresentação
                </button>
                <button onClick={() => onNavigate('produtos')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Catálogo de Fôrmas & Acessórios
                </button>
                <button onClick={() => onNavigate('quem-somos')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Quem Somos / Parque Fabril
                </button>
                <button onClick={() => onNavigate('portfolio')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Portfólio de Obras & Cases
                </button>
                <button onClick={() => onNavigate('contato')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Solicitar Orçamento Técnico
                </button>
                <button onClick={() => onNavigate('faq')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Perguntas Frequentes (FAQ)
                </button>
                <button onClick={() => onNavigate('blog')} className="text-left text-slate-400 hover:text-brand transition-colors cursor-pointer">
                  • Blog & Artigos Técnicos
                </button>
              </div>
            )}
          </div>

          {/* Column 3: Official Contact Data (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Informações de Contato</span>
              <span className="text-[10px] text-brand lowercase">Catanduva/SP</span>
            </h4>

            <div className="space-y-3 text-xs">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Fábrica & Sede</span>
                  <span className="text-slate-300 font-medium leading-relaxed">
                    {texts.contactAddress || 'Av. Dona Engrácia | Agudo Romão, 891 - Catanduva/SP — CEP 15.802-200'}
                  </span>
                </div>
              </div>

              {/* WhatsApp & Phones */}
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Telefones Diretos</span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a
                      href={`https://wa.me/55${cleanWhatsapp || '17991812122'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      WhatsApp: {texts.contactWhatsapp || '(17) 99181-2122'}
                    </a>
                    <span className="text-slate-600">|</span>
                    <a
                      href={`tel:${cleanPhone || '1735316611'}`}
                      className="text-slate-300 hover:text-white"
                    >
                      Fixo: {texts.contactPhone || '(17) 3531-6611'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">E-mail Oficial</span>
                  <a
                    href={`mailto:${texts.contactEmail || 'fundiferro@fundiferroformas.com.br'}`}
                    className="text-slate-300 hover:text-brand transition-colors font-medium break-all"
                  >
                    {texts.contactEmail || 'fundiferro@fundiferroformas.com.br'}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Horário de Atendimento</span>
                  <span className="text-slate-400">
                    {texts.contactHours || 'Segunda a sexta-feira, das 7h às 17h'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Fundiferro — Todos os direitos reservados. Catanduva/SP.</p>

          <div className="flex items-center gap-4">
            <a
              href="/adminfundiferro"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenAdmin) {
                  onOpenAdmin();
                } else {
                  window.history.pushState(null, '', '/adminfundiferro');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-[11px]"
              title="Acesso Administrativo CMS"
            >
              <Lock className="h-3 w-3" />
              <span>Painel Admin (/adminfundiferro)</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-brand hover:border-brand/40 rounded-sm transition-all cursor-pointer"
              title="Voltar ao topo"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
