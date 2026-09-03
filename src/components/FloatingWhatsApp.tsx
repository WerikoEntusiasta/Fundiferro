/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X, Send, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { getTexts } from '../utils/storage';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [texts, setTexts] = useState(getTexts());

  useEffect(() => {
    const handleUpdate = () => {
      setTexts(getTexts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  // Show bubble prompt automatically after 8 seconds of engagement if not closed
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartWhatsApp = () => {
    let cleanPhone = (texts.contactWhatsapp || '').replace(/\D/g, '') || '17991812122';
    const targetNumber = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const defaultMsg = texts.contactWhatsappMessage || 'Olá! Estou no site da Fundiferro e gostaria de falar com um engenheiro técnico sobre fôrmas e orçamento para minha obra.';
    
    const message = customNote.trim()
      ? `Olá! Estou no site da Fundiferro e gostaria de atendimento sobre fôrmas e obras:\n\n"${customNote.trim()}"`
      : defaultMsg;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${targetNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* 1. EXPANDABLE CHAT DIALOG */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[330px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
          >
            {/* Dialog Header with Plant Branding */}
            <div className="bg-gradient-to-r from-[#004A99] to-[#002754] text-white p-4 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors cursor-pointer"
                title="Fechar conversa"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm">
                    FF
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Engenharia Comercial
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  </h4>
                  <p className="text-[11px] text-blue-200 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Atendimento Online • Fábrica Catanduva/SP
                  </p>
                </div>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="p-4 bg-slate-50 space-y-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <p className="font-medium text-slate-800 leading-relaxed">
                  Olá! Seja bem-vindo à <strong className="text-brand">Fundiferro</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Precisa de cálculo de modulação para parede de concreto, reforma de fôrmas ou cotação de acessórios?
                </p>
              </div>

              {/* Quick Prompt Field */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Escreva sua dúvida ou tipo de obra:
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ex: Tenho 2 blocos de 12 pavimentos e preciso de fôrmas de alumínio..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </div>

              {/* Quick preset suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setCustomNote('Gostaria de cotar fôrmas de alumínio para parede de concreto.')}
                  className="text-[10px] bg-white hover:bg-blue-50 border border-slate-200 hover:border-brand/30 text-slate-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  🏢 Fôrmas Parede
                </button>
                <button
                  onClick={() => setCustomNote('Tenho fôrmas usadas no pátio e quero avaliar reforma/adaptação.')}
                  className="text-[10px] bg-white hover:bg-blue-50 border border-slate-200 hover:border-brand/30 text-slate-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  🔄 Reforma de Fôrmas
                </button>
                <button
                  onClick={() => setCustomNote('Preciso de pinos, cunhas e tirantes a pronta-entrega.')}
                  className="text-[10px] bg-white hover:bg-blue-50 border border-slate-200 hover:border-brand/30 text-slate-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  🔩 Acessórios
                </button>
              </div>
            </div>

            {/* Dialog Footer Action */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={handleStartWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Conversar no WhatsApp Agora</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PROMPT CHIP (BEFORE USER EXPANDS) */}
      {!isOpen && hasPrompted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-2 bg-white text-slate-800 border border-slate-200 shadow-lg rounded-xl px-3.5 py-2 flex items-center gap-2.5 text-xs max-w-[260px] cursor-pointer hover:border-emerald-500 transition-all group"
          onClick={() => setIsOpen(true)}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-medium text-slate-700 group-hover:text-slate-900 truncate">
            Tire dúvidas de fôrmas no WhatsApp
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHasPrompted(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            title="Ocultar aviso"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}

      {/* 3. MAIN FLOATING BUTTON */}
      <motion.button
        id="btn-floating-whatsapp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all cursor-pointer relative group"
        aria-label="Abrir atendimento no WhatsApp"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <Phone className="h-6 w-6 fill-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 font-mono font-black text-[9px] rounded-full flex items-center justify-center border-2 border-white">
              1
            </span>
          </>
        )}
      </motion.button>

    </div>
  );
}
