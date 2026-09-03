/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Zap,
  Sparkles,
  Truck,
  Wrench,
  ChevronRight,
  PhoneCall,
  FileText,
  Building2,
  Clock,
  Award,
  Send,
  ExternalLink,
  Info,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';
import { detailedProducts, ProductDetailData } from '../data/productData';
import { getTexts } from '../utils/storage';

interface ProductPageProps {
  productSlugOrId: string;
  onBackToHome: () => void;
  onSelectOtherProduct: (productId: string) => void;
  onOpenContactWithProduct: (productName: string) => void;
}

export default function ProductPage({
  productSlugOrId,
  onBackToHome,
  onSelectOtherProduct,
  onOpenContactWithProduct
}: ProductPageProps) {
  // Find product by id or slug
  const productKey = Object.keys(detailedProducts).find(
    (k) => k === productSlugOrId || detailedProducts[k].slug === productSlugOrId || detailedProducts[k].id === productSlugOrId
  ) || 'formas-parede';

  const product: ProductDetailData = detailedProducts[productKey] || detailedProducts['formas-parede'];

  const [activeMediaTab, setActiveMediaTab] = useState<'fotos' | 'especificacoes' | 'processo'>('fotos');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>(product.galleryImages[0]?.url || product.heroImage);
  const [texts, setTexts] = useState(getTexts());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setSelectedGalleryImg(product.galleryImages[0]?.url || product.heroImage);
    setActiveMediaTab('fotos');
  }, [productSlugOrId, product]);

  const allProductKeys = Object.keys(detailedProducts);
  const otherProducts = allProductKeys.filter((k) => k !== product.id).map((k) => detailedProducts[k]);

  const handleRequestQuote = () => {
    onOpenContactWithProduct(product.title);
  };

  const handleWhatsApp = () => {
    const phone = texts.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Olá! Estou na página do produto "${product.title}" no site da Fundiferro e gostaria de solicitar uma proposta técnica de fôrmas e orçamento para minha obra.`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      
      {/* 1. TOP BREADCRUMB & QUICK BACK BAR */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={onBackToHome}
              className="hover:text-brand font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              Início
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <button
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  const el = document.getElementById('produtos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-brand font-medium transition-colors cursor-pointer"
            >
              Catálogo
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <span className="font-bold text-slate-900 truncate">{product.title}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar ao Site</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* 2. HERO HEADER SECTION */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Product Headings & Quick Actions */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-100 text-brand font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="bg-amber-100 text-amber-900 font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                {product.title}
              </h1>

              <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {product.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  id="btn-product-page-quote"
                  onClick={handleRequestQuote}
                  className="px-7 py-3.5 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Solicitar Cotação Técnica</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/15 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Falar com Engenheiro</span>
                </button>
              </div>

              {/* Security badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  100% Homologado em Fábrica
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  Emissão de ART e Laudos
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Truck className="h-4 w-4 text-slate-700" />
                  Entrega em Todo o Brasil
                </span>
              </div>
            </div>

            {/* Right: Featured Main Image / Cover Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group aspect-4/3 bg-slate-900">
                <img
                  src={selectedGalleryImg}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                  Foto Real de Fabricação e Canteiro Fundiferro
                </div>
              </div>
            </div>
          </div>

          {/* 3. HIGHLIGHT METRICS BANNER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-150">
            {product.highlightStats.map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5">
                <span className="font-sans font-black text-2xl sm:text-3xl text-brand block mb-1">
                  {stat.value}
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MAIN CONTENT TABS & DEEP DIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 8 COLS: DETAILED EXPLANATION, GALLERY, METHODOLOGY */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview & Engineering Deep-Dive */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
              <h2 className="font-sans font-black text-2xl text-slate-900 flex items-center gap-2">
                <Layers className="h-6 w-6 text-brand" />
                Visão Geral & Engenharia do Sistema
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {product.overviewParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Key Advantages Grid */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-sans font-bold text-base text-slate-900 mb-4 uppercase tracking-wider text-brand">
                  Diferenciais Competitivos para sua Construtora
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.keyAdvantages.map((adv, i) => (
                    <div key={i} className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{adv.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Media & Image Gallery */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                <div>
                  <h3 className="font-sans font-black text-xl text-slate-900">
                    Galeria de Fotos & Instalação
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Registros reais de canteiros de obra e processos de fabricação.
                  </p>
                </div>

                <span className="font-mono text-xs font-bold text-brand bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  {product.galleryImages.length} Fotos Técnicas
                </span>
              </div>

              {/* Main Expanded View */}
              <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-900 relative shadow-inner">
                <img
                  src={selectedGalleryImg}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs sm:text-sm">
                  {product.galleryImages.find((img) => img.url === selectedGalleryImg)?.caption || product.title}
                </div>
              </div>

              {/* Thumbnail Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImg(img.url)}
                    className={`rounded-lg overflow-hidden aspect-4/3 border-2 transition-all cursor-pointer relative ${
                      selectedGalleryImg === img.url
                        ? 'border-brand ring-2 ring-brand/30 scale-102'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.caption} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Step-by-Step Methodology (When available) */}
            {product.methodologySteps && product.methodologySteps.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-150 pb-4">
                  <span className="text-brand font-mono text-xs font-bold uppercase tracking-wider">
                    Metodologia Passo a Passo
                  </span>
                  <h3 className="font-sans font-black text-xl text-slate-900 mt-1">
                    Como a Fundiferro executa o fornecimento
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {product.methodologySteps.map((st, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-brand/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand text-white font-mono font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                        {st.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-0.5">{st.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accessories and Items included */}
            {product.accessoriesIncluded && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="font-sans font-bold text-base text-slate-900 uppercase tracking-wider text-brand">
                  Itens e Acessórios Integrados ao Sistema
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
                  {product.accessoriesIncluded.map((acc, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 4 COLS: TECHNICAL SPECS SHEET, FAST QUOTE CARD & CROSS-PRODUCTS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Technical Specifications Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 sticky top-[136px]">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                <h3 className="font-sans font-black text-base text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand" />
                  Ficha Técnica Resumida
                </h3>
                <span className="text-[10px] font-mono text-slate-500 font-bold">NBR 16055</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {Object.entries(product.technicalSpecs).map(([key, val], idx) => (
                  <div key={idx} className="py-2.5 flex flex-col gap-1">
                    <span className="font-mono font-semibold text-slate-500 text-[11px] uppercase tracking-wider">
                      {key}
                    </span>
                    <span className="font-bold text-slate-900 text-xs leading-tight">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Quote Card */}
              <div className="bg-gradient-to-br from-[#004A99] to-[#002754] text-white p-5 rounded-xl shadow-md space-y-3 mt-4">
                <span className="font-mono text-[10px] font-bold text-blue-200 uppercase tracking-widest block">
                  Atendimento Comercial & Engenharia
                </span>
                <h4 className="font-bold text-base text-white">
                  Precisa deste produto para sua obra?
                </h4>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Envie sua planta arquitetônica para cálculo exato de modulação e proposta técnica em até 24 horas.
                </p>
                <button
                  onClick={handleRequestQuote}
                  className="w-full bg-white hover:bg-blue-50 text-brand font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Pedir Orçamento Deste Item</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Other Products Cross-Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h4 className="font-sans font-bold text-sm text-slate-900 uppercase tracking-wider text-slate-700">
                Outras Soluções do Catálogo
              </h4>
              <div className="space-y-2.5">
                {otherProducts.map((other) => (
                  <button
                    key={other.id}
                    onClick={() => onSelectOtherProduct(other.id)}
                    className="w-full text-left p-3 rounded-xl border border-slate-150 hover:border-brand/40 bg-slate-50/70 hover:bg-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 group-hover:text-brand block transition-colors">
                        {other.title}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">
                        {other.category}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
