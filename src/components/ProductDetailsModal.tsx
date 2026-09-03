/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Wrench,
  Package,
  Grid,
  Construction,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  Send
} from 'lucide-react';
import { accessoriesList, processSteps } from '../data';
import { getProducts, getTexts } from '../utils/storage';

interface ProductDetailsModalProps {
  productId: string | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export default function ProductDetailsModal({ productId, onClose, onRequestQuote }: ProductDetailsModalProps) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [accessorySearch, setAccessorySearch] = useState('');
  const [safetyTab, setSafetyTab] = useState<'kit' | 'individual'>('kit');

  if (!productId) return null;

  const products = getProducts();
  const product = products.find((p) => p.id === productId) || products[0];

  const categories = ['Todas', 'Fixação', 'Alinhamento', 'Nivelamento & Ajuste', 'Acesso & Segurança', 'Suporte'];

  const filteredAccessories = accessoriesList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(accessorySearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(accessorySearch.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#004A99] via-[#003B7C] to-[#002754] text-white p-6 sm:p-8 relative flex items-start justify-between shrink-0">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold tracking-widest text-blue-200 uppercase bg-white/10 border border-white/15 px-3 py-1 rounded-full mb-3">
                <Sparkles className="h-3 w-3 text-blue-300" />
                Especificação Técnica de Produto
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                {product.title}
              </h2>
              <p className="text-blue-100/90 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar detalhes"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body with Product-Specific Technical Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">

            {/* 1. FORMAS PARA PAREDE DE CONCRETO */}
            {product.id === 'formas-parede' && (
              <div className="space-y-8">
                {/* Highlights grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl">
                    <span className="font-bold text-sm text-brand block mb-1">⚡ Ciclo de 24 Horas</span>
                    <p className="text-xs text-slate-600">Desforma e remontagem acelerada sem perda de geometria ou esquadro.</p>
                  </div>
                  <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl">
                    <span className="font-bold text-sm text-brand block mb-1">✨ Acabamento Liso</span>
                    <p className="text-xs text-slate-600">Dispensa chapisco e reboco pesado, pronta para pintura direta ou gesso fino.</p>
                  </div>
                  <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl">
                    <span className="font-bold text-sm text-brand block mb-1">📐 Norma NBR 16055</span>
                    <p className="text-xs text-slate-600">Projetadas com alta rigidez estrutural para suportar pressões de até 60 kN/m².</p>
                  </div>
                </div>

                {/* Blueprint Diagram Box */}
                <div className="bg-slate-950 rounded-xl p-6 text-white shadow-md border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-4 pb-3 border-b border-slate-800">
                    <span className="flex items-center gap-2">
                      <Layers className="h-4 w-4" /> Modulação & Travamento Industrial
                    </span>
                    <span className="text-slate-400 font-semibold">NBR 16055 • Precisão Milimétrica</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px] font-mono text-center mb-3">
                    <div className="bg-slate-800 border border-slate-700 py-3 rounded-lg text-slate-200">Painel A1</div>
                    <div className="bg-slate-800 border border-amber-500/60 py-3 rounded-lg text-slate-200 relative">Painel A2</div>
                    <div className="bg-slate-800 border border-slate-700 py-3 rounded-lg text-slate-200">Painel A3</div>
                    <div className="bg-slate-800 border border-amber-500/60 py-3 rounded-lg text-slate-200 relative">Painel A4</div>
                  </div>
                  <div className="bg-amber-500/20 text-amber-300 text-xs font-mono p-2 rounded-lg text-center font-bold mb-3 border border-amber-500/30">
                    ALINHAMENTO HORIZONTAL TRAVADO POR ACESSÓRIOS FUNDIFERRO
                  </div>
                  <p className="text-xs text-slate-400">
                    100% dos conjuntos são pré-montados e calibrados em fábrica antes do envio para canteiro.
                  </p>
                </div>

                {/* Steps of Supply */}
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider text-brand">
                    Etapas do Fornecimento Fundiferro
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {processSteps.slice(0, 4).map((s) => (
                      <div key={s.number} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-brand font-mono font-black text-xs block mb-1">0{s.number}.</span>
                        <h5 className="font-bold text-xs text-slate-900 mb-1">{s.title}</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. SEGURANÇA PARA PAREDE DE CONCRETO (NR-18) */}
            {product.id === 'seguranca-parede' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                  <div>
                    <span className="text-brand font-mono text-xs font-bold uppercase">Conformidade e Proteção Coletiva</span>
                    <h3 className="font-sans font-bold text-xl text-slate-900">Sistemas de Segurança e Plataformas NR-18</h3>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setSafetyTab('kit')}
                      className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                        safetyTab === 'kit' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Kits Completos
                    </button>
                    <button
                      onClick={() => setSafetyTab('individual')}
                      className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                        safetyTab === 'individual' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Componentes Avulsos
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                    <p>
                      Sistemas integrados de passarelas técnicas, guarda-corpos duplos e linhas de vida adaptáveis a formas de qualquer fabricante para assegurar zero acidentes em altura.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700">
                      <li className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Passarelas antiderrapantes com rodapés de retenção.
                      </li>
                      <li className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Ancoragem direta nos furos de tirantes das formas.
                      </li>
                      <li className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Acompanha ART de fabricação e laudos de ensaio de carga.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
                    {safetyTab === 'kit' ? (
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase">Kit Integrado</span>
                        <h4 className="font-bold text-base text-slate-900 mt-2">Plataforma + Guarda-Corpo de Montagem Rápida</h4>
                        <p className="text-xs text-slate-500 mt-1">Pronto para içamento e encaixe imediato no canteiro de obras.</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] font-mono font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full uppercase">Componentes Avulsos</span>
                        <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800 mt-3">
                          <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">🔗 Linhas de Vida</div>
                          <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">🪜 Escadas de Acesso</div>
                          <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">🔩 Suportes Metálicos</div>
                          <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">🧱 Postes de Periferia</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. REFORMA E ADAPTAÇÃO DE FORMAS */}
            {product.id === 'reforma-adaptacao' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-brand font-mono text-xs font-bold uppercase">Reengenharia & Economia</span>
                    <h3 className="font-sans font-bold text-xl text-slate-900">
                      Reforma e Adequação de Fôrmas Usadas
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Reaproveite o seu estoque de fôrmas antigas em novos projetos arquitetônicos. Recuperamos perfis, trocamos chapas desgastadas e fabricamos apenas as peças complementares.
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span><strong>Economia de até 60%:</strong> Reduz drasticamente o custo inicial da obra mantendo o padrão construtivo original.</span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { step: '01', title: 'Inspeção & Mapeamento', desc: 'Avaliação física e compatibilização com a nova planta.' },
                      { step: '02', title: 'Solda & Correção', desc: 'Desempeno de perfis e troca de chapas avariadas.' },
                      { step: '03', title: 'Montagem Prévia', desc: 'Homologação física na fábrica antes do despacho.' },
                      { step: '04', title: 'Garantia Fundiferro', desc: 'Entrega calibrada e higienizada pronta para uso.' }
                    ].map((st) => (
                      <div key={st.step} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="font-mono font-bold text-brand text-xs block mb-1">{st.step}</span>
                        <h4 className="font-bold text-xs text-slate-900 mb-1">{st.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. ACESSÓRIOS PARA PAREDE DE CONCRETO */}
            {product.id === 'acessorios' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
                  <div>
                    <span className="text-brand font-mono text-xs font-bold uppercase">Suprimentos para Obra</span>
                    <h3 className="font-sans font-bold text-xl text-slate-900">
                      Catálogo Completo de Acessórios & Travamentos
                    </h3>
                  </div>
                  <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar acessório..."
                      value={accessorySearch}
                      onChange={(e) => setAccessorySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                        activeCategory === cat
                          ? 'bg-brand text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Accessories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[360px] overflow-y-auto pr-1">
                  {filteredAccessories.map((item, idx) => (
                    <div key={item.name} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand font-bold mb-1">
                          <span>{item.category}</span>
                          <span className="text-slate-400">#{idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 mb-1">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FORMAS PARA PRÉ-MOLDADO & EQUIPAMENTOS */}
            {(product.id === 'formas-pre-moldado' || product.id === 'equipamentos-construcao') && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="space-y-4">
                    <span className="text-brand font-mono text-xs font-bold uppercase">Soluções Especiais & Locação</span>
                    <h3 className="font-sans font-bold text-xl text-slate-900">
                      {product.id === 'formas-pre-moldado' ? 'Formas de Alta Precisão para Pré-Moldados' : 'Equipamentos e Escoramentos para Obras'}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {product.id === 'formas-pre-moldado'
                        ? 'Fôrmas sob medida para muros, vigas, pilares e mourões com repetibilidade garantida de milhares de ciclos e precisão dimensional milimétrica.'
                        : 'Locação e venda de escoras metálicas telescópicas, andaimes tubulares, aprumadores e suportes de alto desempenho para obras comerciais, residenciais e industriais.'}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-xs font-mono font-bold text-brand uppercase">Vantagens & Disponibilidade</span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">Pronta Entrega</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">🏗️ Escoras & Andaimes</span>
                        <p className="text-[10px] text-slate-500">Capacidade testada com regulagem milimétrica.</p>
                      </div>
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">📐 Formas Especiais</span>
                        <p className="text-[10px] text-slate-500">Muros, mourões, pilares e vigas sob medida.</p>
                      </div>
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">🚚 Logística Rápida</span>
                        <p className="text-[10px] text-slate-500">Despacho para canteiros de todo o Brasil.</p>
                      </div>
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">📑 Laudo e ART</span>
                        <p className="text-[10px] text-slate-500">Conformidade total com a norma NR-18.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer with Direct Quotation CTA */}
          <div className="bg-slate-50 border-t border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-xs text-slate-500">
              Precisa de consultoria técnica para sua obra? Fale diretamente com nossa engenharia.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                Voltar ao Catálogo
              </button>

              <button
                onClick={() => {
                  onRequestQuote(product.title);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand/20 transition-all cursor-pointer"
              >
                <span>Solicitar Orçamento Deste Item</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
