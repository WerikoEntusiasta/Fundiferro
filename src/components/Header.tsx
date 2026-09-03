/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Construction, Phone, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export default function Header({ activeSection, onNavigate, onOpenAdmin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'produtos', label: 'Catálogo' },
    { id: 'quem-somos', label: 'Quem Somos' },
    { id: 'portfolio', label: 'Portfólio / Obras' },
    { id: 'contato', label: 'Contato' },
    { id: 'faq', label: 'Dúvidas / FAQ' },
    { id: 'blog', label: 'Blog' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-blue-50 py-3'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="logo-button"
            onClick={() => handleLinkClick('inicio')}
            className="flex items-center space-x-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 bg-brand flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <div>
              <span className="block font-sans font-bold text-xl tracking-tighter leading-none text-slate-900">
                FUNDIFERRO
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-brand font-bold uppercase mt-0.5">
                Formas Metálicas
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'portfolio' && (activeSection === 'portfolio' || activeSection === 'galeria-projetos'));
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`py-2 text-sm font-semibold transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-brand'
                      : 'text-slate-650 hover:text-brand'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Contact Action button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              id="header-cta"
              onClick={() => handleLinkClick('contato')}
              className="px-6 py-2 rounded-full font-bold text-sm bg-brand text-white hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg shadow-blue-900/10"
            >
              <span>ORÇAMENTO</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none transition-colors text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id || (item.id === 'portfolio' && (activeSection === 'portfolio' || activeSection === 'galeria-projetos'));
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleLinkClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-brand'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-brand'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleLinkClick('contato')}
                  className="w-full py-3 rounded-md font-bold text-center bg-brand text-white hover:bg-brand-dark transition-colors shadow-md"
                >
                  SOLICITAR ORÇAMENTO
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
