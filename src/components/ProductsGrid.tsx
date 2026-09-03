/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { getProducts } from '../utils/storage';
import { detailedProducts } from '../data/productData';

interface ProductsGridProps {
  onSelectProduct?: (productKeyOrPage: string) => void;
}

export default function ProductsGrid({ onSelectProduct }: ProductsGridProps) {
  const [products, setProducts] = useState(getProducts());

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(getProducts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  const handleOpenProductPage = (productId: string) => {
    if (onSelectProduct) {
      onSelectProduct(`produto-${productId}`);
    }
  };

  const handleRequestQuote = (productName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('fundiferro_prefill_contact', {
        detail: {
          itemName: productName,
          message: `Olá! Gostaria de solicitar uma cotação e especificações técnicas para "${productName}". Aguardo o retorno da equipe de engenharia.`
        }
      })
    );
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="produtos" 
      className="py-20 sm:py-24 bg-white border-t border-b border-slate-100 relative overflow-hidden scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/80 border border-blue-200/80 px-3.5 py-1 rounded-full mb-3.5 shadow-sm">
            <LucideIcons.Sparkles className="h-3.5 w-3.5 text-brand" />
            Catálogo de Soluções & Engenharia
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-3">
            Sistemas Industrializados para Alta Produtividade
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Fabricação, reforma e locação de sistemas completos de fôrmas, acessórios de travamento e segurança em conformidade com a norma NBR 16055.
          </p>
        </div>

        {/* Fixed 6-Card Grid (No rotating carousel - immediate comparison) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const IconComponent = (LucideIcons as any)[product.iconName] || LucideIcons.Layers;
            const detailed = detailedProducts[product.id];
            const isFlagship = product.id === 'formas-parede' || product.id === 'reforma-adaptacao';

            return (
              <motion.div
                key={product.id}
                id={`product-card-${product.id}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleOpenProductPage(product.id)}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl cursor-pointer ${
                  isFlagship 
                    ? 'border-blue-200 ring-1 ring-brand/10 hover:border-brand' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Card Top Banner / Visual Header */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={detailed?.heroImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-brand text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                      {detailed?.category || 'Sistema Técnico'}
                    </span>

                    {isFlagship && (
                      <span className="bg-amber-400 text-amber-950 font-mono text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
                        <LucideIcons.Sparkles className="h-3 w-3" />
                        Carro-Chefe
                      </span>
                    )}
                  </div>

                  {/* Icon and Quick Spec over image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/95 text-brand flex items-center justify-center shadow-lg shrink-0">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-white">
                      <span className="font-mono text-[10px] text-blue-200 uppercase font-semibold block">
                        Item {index + 1} de {products.length}
                      </span>
                      <span className="font-bold text-xs text-white line-clamp-1">
                        {detailed?.highlightStats?.[0]?.value ? `${detailed.highlightStats[0].value} • ${detailed.highlightStats[0].label}` : 'Conformidade NBR 16055'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Middle: Content & Highlights */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-sans font-black text-xl text-slate-900 mb-2 group-hover:text-brand transition-colors">
                      {product.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Quick Advantage Bullets */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {detailed?.keyAdvantages?.slice(0, 2).map((adv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <LucideIcons.CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium truncate">{adv.title}</span>
                      </div>
                    ))}
                    {(!detailed?.keyAdvantages || detailed.keyAdvantages.length === 0) && (
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <LucideIcons.CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium">Homologação e Testes em Fábrica</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand group-hover:translate-x-0.5 transition-transform">
                    <span>Ver Ficha Técnica</span>
                    <LucideIcons.ArrowRight className="h-3.5 w-3.5" />
                  </span>

                  <button
                    onClick={(e) => handleRequestQuote(product.title, e)}
                    className="px-3.5 py-1.5 bg-white hover:bg-brand hover:text-white text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    Cotar Item
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Fast Info Banner */}
        <div className="mt-14 p-6 bg-slate-50 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shrink-0 shadow-sm">
              <LucideIcons.Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Precisa de um projeto sob medida para a arquitetura da sua obra?
              </h4>
              <p className="text-xs text-slate-500">
                Nossa engenharia modula paredes, lajes e detalhes arquitetônicos a partir das suas plantas em DWG/BIM.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contato');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-md shadow-brand/10"
          >
            Fazer Avaliação Técnica Gratuita
          </button>
        </div>

      </div>
    </section>
  );
}
