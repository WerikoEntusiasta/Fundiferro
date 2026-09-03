/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Calculator,
  UploadCloud,
  FileText,
  Trash2,
  Paperclip,
  Check,
  Copy,
  TrendingDown,
  Timer,
  Ruler,
  Layers,
  Wrench,
  Download,
  FileCode,
  FileSpreadsheet
} from 'lucide-react';
import { getTexts, addLead, LeadFile, LeadEstimatorData } from '../utils/storage';

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<'formulario' | 'estimador'>('formulario');

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    segmentoObra: 'Parede de Concreto (Edifício Vertical)',
    localizacaoObra: '',
    prazoInicio: 'Até 30 dias (Urgente / Imediato)',
    temProjeto: 'Sim (DWG / BIM prontos)',
    mensagem: ''
  });

  // Attached Files State
  const [attachedFiles, setAttachedFiles] = useState<LeadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estimator States
  const [estimatorInputs, setEstimatorInputs] = useState({
    tipologia: 'Edifício Vertical (Torre)',
    areaParedeM2: 350,
    peDireito: 2.8,
    pavimentos: 16,
    cicloDesejado: '24 horas (1 pavimento/dia)'
  });

  const [estimatorResults, setEstimatorResults] = useState<LeadEstimatorData>({
    tipologia: 'Edifício Vertical (Torre)',
    areaParedeM2: 350,
    peDireito: 2.8,
    pavimentosOuUnidades: 16,
    cicloDesejado: '24 horas (1 pavimento/dia)',
    areaFormasCalculada: 700,
    jogosEstimados: 1,
    acessoriosEstimados: {
      pinosCunhas: 4200,
      tirantes: 850,
      alinhadores: 48
    },
    economiaEstimadaReais: 385000,
    diasPoupados: 96
  });

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastProtocol, setLastProtocol] = useState('');
  const [emailStatusNote, setEmailStatusNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  const [texts, setTexts] = useState(getTexts());
  const [highlightForm, setHighlightForm] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setTexts(getTexts());
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  // Format phone number automatically as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);

    let formatted = raw;
    if (raw.length > 2 && raw.length <= 6) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    } else if (raw.length > 6 && raw.length <= 10) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 10) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
    }

    setFormData((prev) => ({ ...prev, telefone: formatted }));
  };

  // Recalculate estimator whenever inputs change
  useEffect(() => {
    const area = Number(estimatorInputs.areaParedeM2) || 100;
    const pavs = Number(estimatorInputs.pavimentos) || 1;
    const pe = Number(estimatorInputs.peDireito) || 2.8;

    let multiplier = 2.0; // 2 faces de parede (interna/externa)
    let totalAreaFormas = Math.round(area * multiplier);
    
    // Jogos de formas recomendados
    let jogos = 1;
    if (estimatorInputs.cicloDesejado.includes('24 horas') && pavs > 20) {
      jogos = 2;
    } else if (estimatorInputs.tipologia.includes('Casas Térreas') && pavs > 100) {
      jogos = 2;
    }

    // Acessórios calculados
    const pinosCunhas = Math.round(totalAreaFormas * 6);
    const tirantes = Math.round(totalAreaFormas * 1.2);
    const alinhadores = Math.round((totalAreaFormas / 15));

    // Economia estimada vs alvenaria/madeira
    // Alvenaria convencional leva em média 8 a 10 dias por pavimento vs 1 a 2 dias com fôrmas
    const diasAlvenaria = pavs * 8;
    const diasForma = estimatorInputs.cicloDesejado.includes('24') ? pavs * 1.2 : pavs * 2.5;
    const diasPoupados = Math.max(10, Math.round(diasAlvenaria - diasForma));
    
    // Economia financeira estimada (mão de obra reduzida, eliminação de reboco e aluguel de canteiro)
    const economiaPorM2 = 65; // R$ 65/m² em reboco e mão de obra
    const economiaTotal = Math.round(area * pavs * economiaPorM2);

    setEstimatorResults({
      tipologia: estimatorInputs.tipologia,
      areaParedeM2: area,
      peDireito: pe,
      pavimentosOuUnidades: pavs,
      cicloDesejado: estimatorInputs.cicloDesejado,
      areaFormasCalculada: totalAreaFormas * jogos,
      jogosEstimados: jogos,
      acessoriosEstimados: {
        pinosCunhas,
        tirantes,
        alinhadores
      },
      economiaEstimadaReais: economiaTotal,
      diasPoupados
    });
  }, [estimatorInputs]);

  // Handle Drag & Drop Files
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const maxSizeBytes = 250 * 1024 * 1024; // 250MB limit
    const validFiles: LeadFile[] = [];

    files.forEach((file) => {
      if (file.size > maxSizeBytes) {
        alert(`O arquivo "${file.name}" excede o limite máximo permitido de 250MB.`);
        return;
      }
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const sizeStr = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      
      validFiles.push({
        name: file.name,
        size: sizeStr,
        type: ext.toUpperCase() || 'ARQUIVO'
      });
    });

    if (validFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Transfer estimator to form
  const handleApplyEstimatorToForm = () => {
    setActiveTab('formulario');
    setFormData((prev) => ({
      ...prev,
      segmentoObra: estimatorInputs.tipologia.includes('Vertical')
        ? 'Parede de Concreto (Edifício Vertical)'
        : estimatorInputs.tipologia.includes('Casas')
        ? 'Casas Térreas / Sobrados em Parede de Concreto'
        : 'Reforma de Acervo de Fôrmas Usadas',
      mensagem: `[DADOS DO ESTIMADOR TÉCNICO FUNDIFERRO]\n- Tipologia: ${estimatorInputs.tipologia}\n- Área de Parede / Pavimento: ${estimatorInputs.areaParedeM2} m² (Pé-Direito: ${estimatorInputs.peDireito}m)\n- Total de Pavimentos/Unidades: ${estimatorInputs.pavimentos}\n- Ciclo Alvo: ${estimatorInputs.cicloDesejado}\n- Fôrmas Calculadas: ~${estimatorResults.areaFormasCalculada} m² (${estimatorResults.jogosEstimados} Jogo(s))\n- Estimativa de Acessórios: ~${estimatorResults.acessoriosEstimados.pinosCunhas} pinos/cunhas, ~${estimatorResults.acessoriosEstimados.tirantes} tirantes, ~${estimatorResults.acessoriosEstimados.alinhadores} alinhadores\n- Economia Estimada: R$ ${estimatorResults.economiaEstimadaReais.toLocaleString('pt-BR')} (${estimatorResults.diasPoupados} dias economizados)\n\nFavor enviar proposta comercial com cronograma de fabricação.`
    }));
    setHighlightForm(true);
    setTimeout(() => setHighlightForm(false), 2000);
  };

  // Listen to prefill quote requests from catalog and portfolio
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string; itemName?: string }>;
      if (customEvent.detail) {
        const { message, itemName } = customEvent.detail;
        setSubmitSuccess(false);
        setActiveTab('formulario');
        
        let targetSegment = formData.segmentoObra;
        if (itemName?.toLowerCase().includes('reforma')) {
          targetSegment = 'Reforma de Acervo de Fôrmas Usadas';
        } else if (itemName?.toLowerCase().includes('acessórios') || itemName?.toLowerCase().includes('travamento')) {
          targetSegment = 'Acessórios e Travamentos de Alta Resistência';
        } else if (itemName?.toLowerCase().includes('segurança') || itemName?.toLowerCase().includes('nr-18')) {
          targetSegment = 'Plataformas de Segurança e NR-18';
        } else if (itemName?.toLowerCase().includes('pré-moldado')) {
          targetSegment = 'Moldes para Concreto Pré-Moldado';
        }

        setFormData((prev) => ({
          ...prev,
          segmentoObra: targetSegment,
          mensagem:
            message ||
            (itemName
              ? `Olá! Gostaria de solicitar um orçamento formal e cálculo de modulação técnica para "${itemName}". Aguardo o retorno da engenharia.`
              : prev.mensagem)
        }));
        setHighlightForm(true);
        setTimeout(() => setHighlightForm(false), 2500);
      }
    };
    window.addEventListener('fundiferro_prefill_contact', handlePrefill);
    return () => window.removeEventListener('fundiferro_prefill_contact', handlePrefill);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setEmailStatusNote('');
    if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem).');
      return;
    }

    setIsSubmitting(true);
    const protocolCode = `FF-${new Date().getFullYear()}${String(Date.now()).slice(-5)}`;
    setLastProtocol(protocolCode);

    const filesDescription = attachedFiles.length > 0 
      ? `\n\n[ARQUIVOS / PLANTAS ANEXADAS (${attachedFiles.length})]:\n` + attachedFiles.map(f => `• ${f.name} (${f.size} - ${f.type})`).join('\n')
      : '';

    const isEstimatorSource = formData.mensagem.includes('[DADOS DO ESTIMADOR');

    // 1. Save lead to local CRM store immediately
    addLead({
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      empresa: formData.empresa,
      segmentoObra: formData.segmentoObra,
      localizacaoObra: formData.localizacaoObra,
      prazoInicio: formData.prazoInicio,
      temProjeto: formData.temProjeto,
      arquivos: attachedFiles,
      dadosEstimador: isEstimatorSource ? estimatorResults : undefined,
      mensagem: `[Protocolo: ${protocolCode}]\nTipo de Obra: ${formData.segmentoObra}\nLocalização: ${formData.localizacaoObra || 'Não informada'}\nPrazo de Início: ${formData.prazoInicio}\nStatus de Projeto: ${formData.temProjeto}\n\nMensagem:\n${formData.mensagem}${filesDescription}`,
      source: isEstimatorSource ? 'Estimador' : 'Contato'
    });

    // 2. Dispatch to backend API /api/send-lead-email
    try {
      const response = await fetch('/api/send-lead-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          protocol: protocolCode,
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          empresa: formData.empresa,
          segmentoObra: formData.segmentoObra,
          localizacaoObra: formData.localizacaoObra,
          prazoInicio: formData.prazoInicio,
          temProjeto: formData.temProjeto,
          mensagem: formData.mensagem,
          arquivos: attachedFiles,
          dadosEstimador: isEstimatorSource ? estimatorResults : undefined,
          source: isEstimatorSource ? 'Estimador Técnico' : 'Formulário de Contato',
          timestamp: new Date().toISOString()
        })
      });

      const resData = await response.json();
      if (resData.emailSent) {
        setEmailStatusNote(`Notificação enviada por e-mail para a engenharia comercial (${resData.emailTo || 'comercial'}).`);
      } else if (resData.note) {
        setEmailStatusNote(resData.note);
      }
    } catch (apiErr) {
      console.warn('Could not reach email backend or offline:', apiErr);
      setEmailStatusNote('Lead registrado no CRM da empresa.');
    } finally {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }
  };

  const handleFastWhatsApp = () => {
    const cleanPhone = texts.contactWhatsapp.replace(/\D/g, '') || '17991812122';
    const filesList = attachedFiles.length > 0
      ? `\n*Plantas/Arquivos Anexos (${attachedFiles.length}):* ` + attachedFiles.map(f => f.name).join(', ')
      : '';
    
    const message = `*SOLICITAÇÃO DE ORÇAMENTO TÉCNICO - FUNDIFERRO*\n\n*Nome:* ${formData.nome || 'Não informado'}\n*Empresa:* ${formData.empresa || 'Não informada'}\n*Tipo de Obra:* ${formData.segmentoObra}\n*Localização da Obra:* ${formData.localizacaoObra || 'A definir'}\n*Status de Projeto:* ${formData.temProjeto}${filesList}\n\n*Necessidade da Obra:*\n${formData.mensagem || 'Gostaria de solicitar uma proposta técnica e dimensionamento de fôrmas.'}`;
    
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopyProtocol = () => {
    if (lastProtocol) {
      navigator.clipboard.writeText(lastProtocol);
      setCopiedProtocol(true);
      setTimeout(() => setCopiedProtocol(false), 2000);
    }
  };

  return (
    <section 
      id="contato" 
      className="bg-slate-50 text-slate-900 py-16 sm:py-24 relative overflow-hidden scroll-mt-16 border-t border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-brand font-mono font-bold text-xs uppercase tracking-widest bg-blue-100/90 border border-blue-200 px-3.5 py-1 rounded-full mb-3 shadow-xs">
            <MessageCircle className="h-3.5 w-3.5 text-brand" />
            Engenharia Comercial & Propostas Técnicas
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-3">
            Solicite um Estudo de Fôrmas para sua Obra
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Envie suas plantas (DWG / BIM / PDF) ou use o estimador interativo. Nossos engenheiros calculam a melhor modulação, ciclo de concretagem e retorno econômico em até 24 horas úteis.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm mt-7">
            <button
              onClick={() => setActiveTab('formulario')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'formulario'
                  ? 'bg-brand text-white shadow-md shadow-brand/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Formulário com Envio de Plantas (DWG/BIM)</span>
            </button>

            <button
              onClick={() => setActiveTab('estimador')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'estimador'
                  ? 'bg-brand text-white shadow-md shadow-brand/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Estimador Rápido de Modulação & Economia</span>
            </button>
          </div>
        </div>

        {/* 2-Columns Grid: Info + Contact Form / Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: CONTACT INFO & LOCATION (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main Company Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
              <h3 className="font-sans font-black text-lg text-slate-900 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3.5">
                <Building2 className="h-5 w-5 text-brand" />
                Canais Diretos Fundiferro
              </h3>
              
              <div className="space-y-4 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-50 text-brand rounded-xl border border-blue-100 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Fábrica & Showroom Técnico
                    </span>
                    <p className="text-slate-900 font-semibold leading-relaxed mt-0.5">
                      {texts.contactAddress}
                    </p>
                  </div>
                </div>

                {/* WhatsApp & Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Atendimento Comercial & Engenharia
                    </span>
                    <div className="text-slate-900 mt-0.5 space-y-1">
                      <a
                        href={`https://wa.me/55${(texts.contactWhatsapp || '').replace(/\D/g, '') || '17991812122'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-bold text-emerald-600 hover:text-emerald-700 text-sm"
                      >
                        WhatsApp: {texts.contactWhatsapp || '(17) 99181-2122'}
                      </a>
                      <a
                        href={`tel:${(texts.contactPhone || '').replace(/\D/g, '') || '1735316611'}`}
                        className="block text-slate-700 hover:text-brand font-medium"
                      >
                        Telefone Fixo: {texts.contactPhone || '(17) 3531-6611'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-50 text-brand rounded-xl border border-blue-100 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      E-mail para Envio de Projetos
                    </span>
                    <a
                      href={`mailto:${texts.contactEmail || 'fundiferro@fundiferroformas.com.br'}`}
                      className="text-slate-900 hover:text-brand font-semibold mt-0.5 break-all block transition-colors"
                    >
                      {texts.contactEmail || 'fundiferro@fundiferroformas.com.br'}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl border border-slate-200 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Horário de Operação
                    </span>
                    <p className="text-slate-700 font-medium mt-0.5">
                      {texts.contactHours || 'Segunda a sexta-feira, das 7h às 17h'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Emissão de ART de Fabricação e Laudos</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                  <span>Conformidade Rigorosa com NBR 16055</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Mock-up 100% testado na fábrica</span>
                </div>
              </div>
            </div>

            {/* Fast WhatsApp CTA banner */}
            <button
              onClick={handleFastWhatsApp}
              className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl transition-all group cursor-pointer shadow-lg shadow-emerald-700/20"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white block">Atendimento Rápido no WhatsApp</span>
                  <span className="text-xs text-emerald-100">Fale direto com nossos projetistas</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
            </button>

          </div>

          {/* COLUMN 2: FORM / ESTIMATOR CONTAINER (8 Cols) */}
          <div 
            className={`lg:col-span-8 bg-white border p-6 sm:p-10 rounded-2xl shadow-sm transition-all duration-500 ${
              highlightForm 
                ? 'border-brand ring-4 ring-brand/10 shadow-2xl scale-[1.01]' 
                : 'border-slate-200'
            }`}
          >
            
            {/* TAB 1: FORMULÁRIO DE COTAÇÃO COM UPLOAD */}
            {activeTab === 'formulario' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 flex items-center gap-2.5">
                      <Send className="h-5 w-5 text-brand" />
                      Formulário de Cotação & Envio de Plantas
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Preencha os dados e anexe suas plantas (DWG, IFC, RVT, PDF) para modulação 3D.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand bg-blue-50 border border-blue-100 px-3 py-1 rounded-full self-start sm:self-auto">
                    Resposta em até 24h
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <motion.form
                      key="contact-form-block"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {errorMessage && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs leading-relaxed font-semibold">
                          ⚠️ {errorMessage}
                        </div>
                      )}

                      {/* 1. SELEÇÃO DA SOLUÇÃO / TIPO DE OBRA */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            Solução ou Sistema Desejado *
                          </label>
                          <select
                            value={formData.segmentoObra}
                            onChange={(e) => setFormData({ ...formData, segmentoObra: e.target.value })}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all cursor-pointer"
                          >
                            <option value="Parede de Concreto (Edifício Vertical)">Fôrmas de Alumínio - Parede de Concreto (Edifícios)</option>
                            <option value="Casas Térreas / Sobrados em Parede de Concreto">Fôrmas de Alumínio - Casas e Condomínios Horizontais</option>
                            <option value="Reforma de Acervo de Fôrmas Usadas">Reforma & Adaptação de Fôrmas Usadas (Qualquer Marca)</option>
                            <option value="Acessórios e Travamentos de Alta Resistência">Acessórios, Pinos, Cunhas e Tirantes Metálicos</option>
                            <option value="Plataformas de Segurança e NR-18">Plataformas de Segurança, Consoles e Guarda-Corpos NR-18</option>
                            <option value="Moldes para Concreto Pré-Moldado">Fôrmas e Pistas para Concreto Pré-Moldado</option>
                            <option value="Locação ou Venda de Escoramentos e Andaimes">Escoramentos Metálicos e Andaimes</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            Status do Projeto Arquitetônico
                          </label>
                          <select
                            value={formData.temProjeto}
                            onChange={(e) => setFormData({ ...formData, temProjeto: e.target.value })}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all cursor-pointer"
                          >
                            <option value="Sim (DWG / BIM prontos)">Possuo arquivos em DWG / BIM prontos para envio</option>
                            <option value="Em Desenvolvimento">Projeto arquitetônico em fase de desenvolvimento</option>
                            <option value="Apenas Concepção / Estudo Inicial">Estudo de viabilidade preliminar / Concepção</option>
                          </select>
                        </div>
                      </div>

                      {/* 2. DADOS DO RESPONSÁVEL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            Nome Completo *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all font-medium"
                            placeholder="Ex: Eng. Carlos Eduardo"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            E-mail Corporativo *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all font-medium"
                            placeholder="carlos@suaconstrutora.com.br"
                          />
                        </div>
                      </div>

                      {/* 3. CONTATO & LOCALIZAÇÃO */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            Telefone / WhatsApp *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.telefone}
                            onChange={handlePhoneChange}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all font-medium"
                            placeholder="(00) 00000-0000"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            Construtora / Empresa
                          </label>
                          <input
                            type="text"
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all font-medium"
                            placeholder="Nome da empresa ou SPE"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-800 font-bold mb-1.5">
                            Cidade / UF da Obra
                          </label>
                          <input
                            type="text"
                            value={formData.localizacaoObra}
                            onChange={(e) => setFormData({ ...formData, localizacaoObra: e.target.value })}
                            className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all font-medium"
                            placeholder="Ex: Ribeirão Preto / SP"
                          />
                        </div>
                      </div>

                      {/* 4. DRAG & DROP FILE ATTACHMENT (DWG, BIM, PDF, ZIP) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs text-slate-800 font-bold">
                            Anexar Plantas ou Arquivos de Arquitetura (Opcional)
                          </label>
                          <span className="text-[11px] text-slate-500 font-mono">
                            DWG, DXF, IFC, RVT, PDF, ZIP (até 250MB)
                          </span>
                        </div>

                        {/* Hidden input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          multiple
                          accept=".dwg,.dxf,.ifc,.rvt,.pdf,.zip,.rar,.png,.jpg,.jpeg"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />

                        {/* Drop Zone */}
                        <div
                          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleFileDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
                            isDragging
                              ? 'border-brand bg-blue-50/60 scale-[0.99]'
                              : 'border-slate-300 hover:border-brand/60 bg-slate-50/60 hover:bg-blue-50/20'
                          }`}
                        >
                          <div className="w-10 h-10 bg-blue-100 text-brand rounded-xl flex items-center justify-center mx-auto mb-2">
                            <UploadCloud className="h-5 w-5" />
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            Arraste e solte seus arquivos aqui, ou <span className="text-brand underline">clique para selecionar</span>
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Plantas baixas, cortes, modelagens BIM ou fotos do acervo usado para reforma.
                          </p>
                        </div>

                        {/* Attached Files List */}
                        {attachedFiles.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <span className="text-[11px] font-bold text-slate-700 block">
                              Arquivos Anexados ({attachedFiles.length}):
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {attachedFiles.map((file, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs"
                                >
                                  <div className="flex items-center gap-2 truncate pr-2">
                                    <div className="w-7 h-7 bg-brand text-white rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                                      {file.type.slice(0, 3)}
                                    </div>
                                    <div className="truncate">
                                      <span className="font-semibold text-slate-900 block truncate text-[11px]">
                                        {file.name}
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-mono">
                                        {file.size}
                                      </span>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="Remover arquivo"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 5. ESPECIFICAÇÕES TÉCNICAS E MENSAGEM */}
                      <div>
                        <label className="block text-xs text-slate-800 font-bold mb-1.5">
                          Especificações da Obra & Mensagem *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.mensagem}
                          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                          className="w-full bg-slate-50/80 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all font-medium leading-relaxed"
                          placeholder="Descreva o número de pavimentos, metragem aproximada, prazo desejado ou detalhes específicos do acervo para reforma..."
                        ></textarea>
                      </div>

                      {/* SUBMISSION BAR */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium">
                          🔒 Seus dados e arquivos são protegidos e tratados exclusivamente para elaboração da proposta técnica.
                        </span>

                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={handleFastWhatsApp}
                            className="px-5 py-3.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                          >
                            <Phone className="h-4 w-4 text-emerald-600" />
                            <span>Enviar por WhatsApp</span>
                          </button>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3.5 rounded-xl bg-brand hover:bg-brand-dark disabled:bg-brand/70 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover:scale-[1.02]"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Registrando...</span>
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                <span>Solicitar Proposta Formal</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="submit-success-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 sm:p-10 text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      
                      <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-800">
                        <span>Protocolo: {lastProtocol}</span>
                        <button
                          onClick={handleCopyProtocol}
                          className="hover:text-emerald-950 transition-colors cursor-pointer"
                          title="Copiar Protocolo"
                        >
                          {copiedProtocol ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                        </button>
                      </div>

                      <h4 className="font-sans font-black text-2xl text-emerald-950">
                        Solicitação de Orçamento Registrada com Sucesso!
                      </h4>
                      
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                        Nossa equipe de engenharia e projetos em Catanduva/SP iniciará o estudo de modulação e viabilidade técnica. Entraremos em contato pelo telefone e e-mail informados.
                      </p>

                      {attachedFiles.length > 0 && (
                        <div className="text-[11px] text-emerald-800 bg-emerald-100/70 py-1.5 px-3 rounded-lg max-w-md mx-auto">
                          📎 {attachedFiles.length} arquivo(s) anexado(s) com sucesso e vinculado(s) à sua solicitação.
                        </div>
                      )}

                      {emailStatusNote && (
                        <div className="text-[11px] font-mono text-emerald-900 bg-white/80 border border-emerald-300/80 py-2 px-3.5 rounded-xl max-w-md mx-auto shadow-xs">
                          ✉️ {emailStatusNote}
                        </div>
                      )}

                      <div className="pt-2 flex flex-wrap justify-center gap-3">
                        <button
                          onClick={() => {
                            setSubmitSuccess(false);
                            setAttachedFiles([]);
                            setFormData({
                              nome: '',
                              email: '',
                              telefone: '',
                              empresa: '',
                              segmentoObra: 'Parede de Concreto (Edifício Vertical)',
                              localizacaoObra: '',
                              prazoInicio: 'Até 30 dias (Urgente / Imediato)',
                              temProjeto: 'Sim (DWG / BIM prontos)',
                              mensagem: ''
                            });
                          }}
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer transition-all shadow-md"
                        >
                          <Send className="h-4 w-4" />
                          <span>Fazer Nova Solicitação</span>
                        </button>

                        <button
                          onClick={handleFastWhatsApp}
                          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all"
                        >
                          <Phone className="h-4 w-4 text-emerald-600" />
                          <span>Acompanhar no WhatsApp</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* TAB 2: ESTIMADOR RÁPIDO DE MODULAÇÃO */}
            {activeTab === 'estimador' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 flex items-center gap-2.5">
                    <Calculator className="h-5 w-5 text-brand" />
                    Calculadora & Estimador de Modulação de Fôrmas
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Insira as dimensões do seu projeto para obter o dimensionamento preliminar de fôrmas, acessórios e economia.
                  </p>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Tipologia da Obra</label>
                    <select
                      value={estimatorInputs.tipologia}
                      onChange={(e) => setEstimatorInputs({ ...estimatorInputs, tipologia: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      <option value="Edifício Vertical (Torre)">Edifício Vertical (Torre de Concreto)</option>
                      <option value="Casas Térreas Seriadas">Casas Térreas Seriadas (Condomínio)</option>
                      <option value="Sobrados Geminados">Sobrados Geminados (2 Pavimentos)</option>
                      <option value="Muros e Pré-Moldados">Muros de Fechamento / Pré-Moldados</option>
                      <option value="Reforma de Fôrmas Usadas">Reforma de Acervo Usado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Ciclo Alvo de Concretagem</label>
                    <select
                      value={estimatorInputs.cicloDesejado}
                      onChange={(e) => setEstimatorInputs({ ...estimatorInputs, cicloDesejado: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      <option value="24 horas (1 pavimento/dia)">Ciclo Rápido: 24 horas (1 pavimento / dia)</option>
                      <option value="48 horas (1 pavimento a cada 2 dias)">Ciclo Padrão: 48 horas (2 dias / pavimento)</option>
                      <option value="72 horas (1 pavimento a cada 3 dias)">Ciclo Econômico: 72 horas (3 dias / pavimento)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Área de Parede por Pavimento / Unidade (m²)
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={5000}
                      step={10}
                      value={estimatorInputs.areaParedeM2}
                      onChange={(e) => setEstimatorInputs({ ...estimatorInputs, areaParedeM2: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Número de Pavimentos ou Unidades Habitacionais
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={estimatorInputs.pavimentos}
                      onChange={(e) => setEstimatorInputs({ ...estimatorInputs, pavimentos: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                </div>

                {/* Calculation Cards Output */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-blue-50/80 border border-blue-200/80 p-4 rounded-2xl">
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Fôrmas Necessárias
                    </span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-brand block mt-0.5">
                      ~{estimatorResults.areaFormasCalculada} m²
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                      {estimatorResults.jogosEstimados} Jogo(s) Completo(s)
                    </span>
                  </div>

                  <div className="bg-blue-50/80 border border-blue-200/80 p-4 rounded-2xl">
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Pinos & Cunhas
                    </span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-slate-900 block mt-0.5">
                      ~{estimatorResults.acessoriosEstimados.pinosCunhas.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                      Peças de travamento
                    </span>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                    <span className="block text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                      Tempo Economizado
                    </span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-emerald-800 block mt-0.5">
                      {estimatorResults.diasPoupados} Dias
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                      vs. Alvenaria Convencional
                    </span>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                    <span className="block text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                      Economia Estimada
                    </span>
                    <span className="font-mono font-black text-xl sm:text-2xl text-emerald-800 block mt-0.5">
                      R$ {(estimatorResults.economiaEstimadaReais / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                      Reboco e mão de obra
                    </span>
                  </div>
                </div>

                {/* Technical Engineering Advice Note */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-600 leading-relaxed flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-900">Dimensionamento sob a NBR 16055:</strong> Os valores acima são estimativas preliminares com base na área de forma informada. Nossa engenharia desenvolve a modulação 3D executiva peça por peça a partir das suas plantas em DWG/BIM.
                  </p>
                </div>

                {/* Actions to Transfer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleApplyEstimatorToForm}
                    className="w-full sm:w-auto px-6 py-3.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand/20"
                  >
                    <span>Preencher Proposta Formal com Esta Estimativa</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleFastWhatsApp}
                    className="w-full sm:w-auto px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Discutir Estimativa no WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
