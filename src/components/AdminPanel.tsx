/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  User, 
  Key, 
  X, 
  TrendingUp, 
  Users, 
  Layers, 
  BookOpen, 
  Activity, 
  Settings, 
  Trash2, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Save, 
  Eye, 
  ArrowRight,
  Database,
  RefreshCw,
  Search,
  FileText,
  Smartphone,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Download,
  Send,
  Server,
  Check,
  Copy,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  getLeads, 
  addLead, 
  updateLeadStatus, 
  deleteLead, 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  getBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  getTexts, 
  saveTexts,
  Lead,
  BlogPost,
  SiteTexts
} from '../utils/storage';
import { Product } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'produtos' | 'blog' | 'textos' | 'email' | 'logs'>('dashboard');

  // Email Config & Diagnostic State
  const [emailStatus, setEmailStatus] = useState<{
    isConfigured: boolean;
    smtpHost: string | null;
    smtpPort: string;
    smtpUser: string | null;
    emailTo: string;
    emailFrom: string;
    provider: string;
  }>({
    isConfigured: false,
    smtpHost: null,
    smtpPort: '587',
    smtpUser: null,
    emailTo: 'werikplaystore@gmail.com',
    emailFrom: 'Fundiferro Formas <no-reply@fundiferro.com.br>',
    provider: 'Pendente'
  });
  const [testEmailRecipient, setTestEmailRecipient] = useState('werikplaystore@gmail.com');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);

  // DB Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [siteTexts, setSiteTexts] = useState<SiteTexts | null>(null);
  
  // System Logs State
  const [systemLogs, setSystemLogs] = useState<string[]>([]);

  // Modals & Form Edits States
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<Lead | null>(null);
  const [isManualLeadModalOpen, setIsManualLeadModalOpen] = useState(false);
  const [searchLeadTerm, setSearchLeadTerm] = useState('');
  const [filterLeadStatus, setFilterLeadStatus] = useState<string>('Todos');

  // Manual Lead Form
  const [manualLeadForm, setManualLeadForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: '',
    source: 'Contato' as Lead['source']
  });

  // Product Form
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Product>({
    id: '',
    title: '',
    description: '',
    iconName: 'Layers'
  });

  // Blog Post Form
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    id: '',
    title: '',
    category: 'engenharia' as BlogPost['category'],
    author: '',
    authorRole: '',
    summary: '',
    contentString: '',
    image: '',
    tagsString: ''
  });

  // Texts CMS Form
  const [cmsForm, setCmsForm] = useState<SiteTexts | null>(null);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState(false);

  // Load Data
  const loadAllData = () => {
    setLeads(getLeads());
    setProducts(getProducts());
    setBlogPosts(getBlogPosts());
    const texts = getTexts();
    setSiteTexts(texts);
    setCmsForm(texts);

    // Fetch Email API status
    fetch('/api/email-status')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setEmailStatus(data);
          if (data.emailTo) setTestEmailRecipient(data.emailTo.split(',')[0].trim());
        }
      })
      .catch(err => console.warn('Could not fetch email status:', err));
  };

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingEmail(true);
    setTestEmailResult(null);

    try {
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: testEmailRecipient })
      });
      const data = await res.json();
      if (data.success) {
        setTestEmailResult({ success: true, message: data.message || 'E-mail de teste enviado com sucesso!' });
        addLog(`E-mail de teste disparado com sucesso para ${testEmailRecipient}.`);
      } else {
        setTestEmailResult({ success: false, message: data.error || 'Falha ao enviar e-mail de teste.' });
        addLog(`Erro ao testar envio de e-mail: ${data.error}`);
      }
    } catch (err: any) {
      setTestEmailResult({ success: false, message: err.message || 'Erro de conexão com o servidor.' });
      addLog(`Falha na requisição de teste de e-mail: ${err.message}`);
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleCopyEnvExample = () => {
    const envContent = `# Configurações de SMTP Fundiferro
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-aplicativo
EMAIL_FROM="Fundiferro Formas <no-reply@fundiferro.com.br>"
EMAIL_TO=werikplaystore@gmail.com`;

    navigator.clipboard.writeText(envContent);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
      addLog('Sessão administrativa inicializada.');
    }
  }, [isOpen]);

  // Sync state if external changes happen
  useEffect(() => {
    const handleUpdate = () => {
      loadAllData();
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString('pt-BR');
    setSystemLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 49)]);
  };

  // Auth Action
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
      addLog('Administrador autenticado com sucesso.');
    } else {
      setLoginError('Credenciais inválidas. Use usuario "admin" e senha "admin123".');
    }
  };

  // Simulate Lead Action (Fascinating testing utility)
  const handleSimulateLead = () => {
    const randomLeads = [
      {
        nome: 'Eng. Guilherme Mendes',
        email: 'guilherme@gomesconstrutora.com.br',
        telefone: '(11) 97722-1133',
        empresa: 'Gomes Construtora S/A',
        mensagem: 'Solicitação de orçamento técnico de painéis de alumínio para obra de casas térreas em Sorocaba/SP.',
        source: 'Contato' as const
      },
      {
        nome: 'Dra. Patricia Lima',
        email: 'patricia@limaurbanismo.com',
        telefone: '(19) 99114-8844',
        empresa: 'Lima & Associados Empreendimentos',
        mensagem: 'Fiz a simulação no site para a locação de escoras metálicas e andaimes tubulares. Gostaria de receber uma proposta de contrato.',
        source: 'Estimador' as const
      },
      {
        nome: 'Sérgio Nogueira',
        email: 'sergio@nogueirametais.com.br',
        telefone: '(21) 98345-6712',
        empresa: 'Nogueira Estruturas',
        mensagem: 'Li o artigo de vocês sobre reforma de formas usadas. Tenho interesse em enviar um lote de 150m² de painéis para avaliação.',
        source: 'Blog' as const
      }
    ];

    const chosen = randomLeads[Math.floor(Math.random() * randomLeads.length)];
    addLead(chosen);
    addLog(`Simulado recebimento de novo lead: ${chosen.nome}`);
    loadAllData();
  };

  // Leads CRM Actions
  const handleStatusChange = (leadId: string, status: Lead['status']) => {
    updateLeadStatus(leadId, status);
    addLog(`Lead #${leadId} status alterado para "${status}".`);
    loadAllData();
    if (selectedLeadDetail && selectedLeadDetail.id === leadId) {
      setSelectedLeadDetail(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDeleteLead = (leadId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
      deleteLead(leadId);
      addLog(`Lead #${leadId} excluído do banco de dados.`);
      loadAllData();
      if (selectedLeadDetail && selectedLeadDetail.id === leadId) {
        setSelectedLeadDetail(null);
      }
    }
  };

  const handleManualLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      nome: manualLeadForm.nome,
      email: manualLeadForm.email,
      telefone: manualLeadForm.telefone,
      empresa: manualLeadForm.empresa,
      mensagem: manualLeadForm.mensagem,
      source: manualLeadForm.source
    });
    addLog(`Lead manual adicionado: ${manualLeadForm.nome}`);
    setIsManualLeadModalOpen(false);
    setManualLeadForm({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      mensagem: '',
      source: 'Contato'
    });
    loadAllData();
  };

  // Products CRM Actions
  const handleOpenProductModal = (prod: Product | null) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({ ...prod });
    } else {
      setEditingProduct(null);
      setProductForm({
        id: `prod-${Date.now()}`,
        title: '',
        description: '',
        iconName: 'Layers'
      });
    }
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProduct(productForm);
    addLog(`Produto salvo/atualizado: ${productForm.title}`);
    setIsProductModalOpen(false);
    loadAllData();
  };

  const handleDeleteProduct = (prodId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto? Isso removerá a exibição no site.')) {
      deleteProduct(prodId);
      addLog(`Produto #${prodId} removido do catálogo.`);
      loadAllData();
    }
  };

  // Blog CMS Actions
  const handleOpenBlogModal = (post: BlogPost | null) => {
    if (post) {
      setEditingBlogPost(post);
      setBlogForm({
        id: post.id,
        title: post.title,
        category: post.category,
        author: post.author,
        authorRole: post.authorRole,
        summary: post.summary,
        contentString: post.content.join('\n\n'),
        image: post.image,
        tagsString: post.tags.join(', ')
      });
    } else {
      setEditingBlogPost(null);
      setBlogForm({
        id: `blog-${Date.now()}`,
        title: '',
        category: 'engenharia',
        author: 'Paulo Solcia',
        authorRole: 'Gerente Comercial',
        summary: '',
        contentString: '',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
        tagsString: 'Parede de Concreto, Fundiferro, Engenharia'
      });
    }
    setIsBlogModalOpen(true);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPost: BlogPost = {
      id: blogForm.id,
      title: blogForm.title,
      category: blogForm.category,
      categoryLabel: 
        blogForm.category === 'engenharia' ? 'Engenharia de Fôrmas' :
        blogForm.category === 'reforma' ? 'Reengenharia & Reforma' :
        blogForm.category === 'seguranca' ? 'Segurança Operacional' : 'Sustentabilidade',
      author: blogForm.author,
      authorRole: blogForm.authorRole,
      date: editingBlogPost ? editingBlogPost.date : 'Hoje',
      readTime: '5 min de leitura',
      summary: blogForm.summary,
      content: blogForm.contentString.split('\n\n').filter(p => p.trim() !== ''),
      image: blogForm.image,
      tags: blogForm.tagsString.split(',').map(t => t.trim()).filter(t => t !== ''),
      likes: editingBlogPost ? editingBlogPost.likes : 0,
      comments: editingBlogPost ? editingBlogPost.comments : []
    };

    saveBlogPost(formattedPost);
    addLog(`Artigo do blog salvo/atualizado: ${blogForm.title}`);
    setIsBlogModalOpen(false);
    loadAllData();
  };

  const handleDeleteBlog = (postId: string) => {
    if (confirm('Deseja realmente remover este artigo do blog?')) {
      deleteBlogPost(postId);
      addLog(`Artigo #${postId} removido do blog.`);
      loadAllData();
    }
  };

  // CMS Site Texts Actions
  const handleTextsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsForm) return;
    saveTexts(cmsForm);
    addLog('Textos principais do site atualizados.');
    setCmsSuccessMessage(true);
    setTimeout(() => setCmsSuccessMessage(false), 4000);
    loadAllData();
  };

  const handleResetTexts = () => {
    if (confirm('Deseja resetar todos os textos editados de volta ao padrão de fábrica?')) {
      localStorage.removeItem('fundiferro_texts');
      loadAllData();
      addLog('Textos resetados para os padrões.');
    }
  };

  // Export to CSV Simulated function
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Nome,Email,Telefone,Empresa,Segmento,Localizacao,Prazo,Projeto,Status,Origem,Data,Mensagem"].join(",") + "\n"
      + leads.map(l => `"${l.nome}","${l.email}","${l.telefone}","${l.empresa || ''}","${l.segmentoObra || ''}","${l.localizacaoObra || ''}","${l.prazoInicio || ''}","${l.temProjeto || ''}","${l.status}","${l.source}","${l.date}","${l.mensagem.replace(/"/g, '""')}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fundiferro_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog('Exportação de leads em CSV gerada com dados de engenharia.');
  };

  // CRM Filters
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.nome.toLowerCase().includes(searchLeadTerm.toLowerCase()) || 
                          l.empresa.toLowerCase().includes(searchLeadTerm.toLowerCase()) ||
                          l.mensagem.toLowerCase().includes(searchLeadTerm.toLowerCase());
    const matchesStatus = filterLeadStatus === 'Todos' || l.status === filterLeadStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate Dashboard Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'Novo').length;
  const inProgressLeads = leads.filter(l => l.status === 'Em Atendimento').length;
  const closedLeads = leads.filter(l => l.status === 'Fechado').length;
  const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

  if (!isOpen) return null;

  return (
    <div id="admin-panel-overlay" className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-0 md:p-6 lg:p-12">
      
      {/* PANEL CONTAINER */}
      <motion.div
        id="admin-panel-container"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        className="bg-slate-900 border border-slate-800 w-full h-full md:rounded-sm shadow-2xl flex flex-col overflow-hidden max-w-7xl relative"
      >
        
        {/* TOP SYSTEM NAV BAR */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand/10 text-brand border border-brand/20 rounded-sm">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest block">Painel Gerencial</span>
              <h1 className="font-sans font-black text-white text-base tracking-tight leading-none">
                Fundiferro Control Engine v2.6
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-sm font-mono flex items-center gap-1.5">
                <CheckCircle className="h-3 w-3 animate-pulse" /> SESSÃO ATIVA (ADMIN)
              </span>
            )}
            <button
              id="close-admin-panel"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-sm transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION SHIELD */}
        {!isLoggedIn ? (
          <div className="flex-grow flex items-center justify-center p-6 bg-slate-950/50">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-sm p-8 max-w-sm w-full shadow-xl"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-brand/10 text-brand border border-brand/20 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="font-sans font-bold text-white text-xl">Acesso Restrito</h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Insira as credenciais de administrador da Fundiferro para acessar as tabelas de leads, configurações e CMS.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-sm text-[11px] leading-normal">
                    ⚠️ {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Usuário</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                    />
                    <User className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Senha</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                    />
                    <Key className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-500" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm mt-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Autenticar Terminal</span>
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* CORE ADMIN DASHBOARD INTERFACE */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            
            {/* SIDE NAVIGATION PANEL */}
            <div className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
              {/* Menu links list */}
              <div className="p-4 space-y-1">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Módulos do Sistema</span>
                
                {/* 1. Dashboard */}
                <button
                  id="admin-nav-dashboard"
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Dashboard Analítico</span>
                </button>

                {/* 2. Leads CRM */}
                <button
                  id="admin-nav-leads"
                  onClick={() => setActiveTab('leads')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4" />
                    <span>Leads e Orçamentos</span>
                  </div>
                  {newLeads > 0 && (
                    <span className="bg-rose-500 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                      {newLeads}
                    </span>
                  )}
                </button>

                {/* 3. Products CMS */}
                <button
                  id="admin-nav-produtos"
                  onClick={() => setActiveTab('produtos')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'produtos'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>Catálogo de Produtos</span>
                </button>

                {/* 4. Blog CMS */}
                <button
                  id="admin-nav-blog"
                  onClick={() => setActiveTab('blog')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'blog'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Gerenciar Blog</span>
                </button>

                {/* 5. CMS Textos */}
                <button
                  id="admin-nav-textos"
                  onClick={() => setActiveTab('textos')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'textos'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Alterar Textos (CMS)</span>
                </button>

                {/* 6. Email & SMTP Integration */}
                <button
                  id="admin-nav-email"
                  onClick={() => setActiveTab('email')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'email'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4" />
                    <span>Configuração de E-mail</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    emailStatus.isConfigured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {emailStatus.isConfigured ? 'Ativo' : 'Pendente'}
                  </span>
                </button>

                {/* 7. System Logs */}
                <button
                  id="admin-nav-logs"
                  onClick={() => setActiveTab('logs')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'logs'
                      ? 'bg-brand text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4" />
                    <span>Logs e Auditoria</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Live</span>
                </button>
              </div>

              {/* Simulation bottom panel */}
              <div className="p-4 bg-slate-900/60 border-t border-slate-800 space-y-3">
                <div className="bg-brand/10 border border-brand/20 p-3 rounded-sm">
                  <span className="text-[10px] font-mono text-brand font-bold uppercase block mb-1">Simular Atividades</span>
                  <p className="text-[10px] text-slate-400 leading-normal mb-2.5">
                    Envie solicitações de teste para simular a captação de clientes.
                  </p>
                  <button
                    onClick={handleSimulateLead}
                    className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-brand/40 text-white font-mono font-bold text-[10px] uppercase tracking-wider py-2 rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="h-3 w-3 text-brand" />
                    <span>Simular Lead</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Operador: Admin</span>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      addLog('Administrador desconectado.');
                    }}
                    className="text-rose-400 hover:underline hover:text-rose-300"
                  >
                    Sair da Conta
                  </button>
                </div>
              </div>

            </div>

            {/* MAIN CONTENT SPACE WITH SCROLLBAR */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-slate-950/20 custom-scrollbar">
              
              {/* TAB 1: DASHBOARD SUMMARY */}
              {activeTab === 'dashboard' && (
                <div id="admin-tab-dashboard" className="space-y-8">
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-sans font-black text-2xl text-white tracking-tight">Metas e Performance Comercial</h2>
                      <p className="text-xs text-slate-400 mt-1">Dados agregados em tempo real de contatos, estimativas de preços e leads ativos.</p>
                    </div>
                    <button
                      onClick={() => {
                        loadAllData();
                        addLog('Atualização manual das estatísticas forçada.');
                      }}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white px-3 py-2 rounded-sm text-xs font-mono transition-all cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-brand" />
                      <span>Atualizar Estatísticas</span>
                    </button>
                  </div>

                  {/* METRIC BOXES ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Leads */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Total de Leads</span>
                        <span className="font-sans font-black text-3xl text-white block mt-1">{totalLeads}</span>
                        <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">Contatos coletados</span>
                      </div>
                      <div className="p-3.5 bg-brand/10 text-brand border border-brand/20 rounded-sm">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>

                    {/* New leads pending */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Pendentes (Novos)</span>
                        <span className="font-sans font-black text-3xl text-rose-400 block mt-1">{newLeads}</span>
                        <span className="text-[10px] text-rose-500/80 block mt-1.5 font-mono font-bold">Aguardando contato</span>
                      </div>
                      <div className="p-3.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-sm">
                        <Clock className="h-6 w-6" />
                      </div>
                    </div>

                    {/* In treatment */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Em Atendimento</span>
                        <span className="font-sans font-black text-3xl text-amber-400 block mt-1">{inProgressLeads}</span>
                        <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">Negociações ativas</span>
                      </div>
                      <div className="p-3.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-sm">
                        <Activity className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Conversion conversion rate */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Taxa de Fechamento</span>
                        <span className="font-sans font-black text-3xl text-emerald-400 block mt-1">{conversionRate}%</span>
                        <span className="text-[10px] text-emerald-500/80 block mt-1.5 font-mono font-bold">Taxa de conversão</span>
                      </div>
                      <div className="p-3.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-sm">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* VISUAL CHARTS SECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* SVG Linear Lead Chart flow */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm lg:col-span-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-sans font-bold text-base text-white">Fluxo Mensal de Oportunidades</h3>
                          <span className="text-[10px] font-mono text-slate-500">Curva de captação de leads e cotações nos últimos 6 meses</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-sm">+32% Trimestre</span>
                      </div>

                      {/* SVG Line Chart simulation */}
                      <div className="h-60 relative w-full flex items-end">
                        <svg className="w-full h-full text-brand/20" viewBox="0 0 600 200" preserveAspectRatio="none">
                          {/* Grid Lines */}
                          <line x1="0" y1="50" x2="600" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1="100" x2="600" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1="150" x2="600" y2="150" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                          
                          {/* Shaded area */}
                          <path
                            d="M 50,180 Q 150,130 250,150 T 450,70 T 550,40 L 550,180 Z"
                            fill="url(#gradient-chart)"
                          />
                          {/* Chart line */}
                          <path
                            d="M 50,180 Q 150,130 250,150 T 450,70 T 550,40"
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="3.5"
                          />

                          {/* Data points */}
                          <circle cx="50" cy="180" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                          <circle cx="150" cy="130" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                          <circle cx="250" cy="150" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                          <circle cx="350" cy="100" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                          <circle cx="450" cy="70" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                          <circle cx="550" cy="40" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />

                          {/* Gradient definition */}
                          <defs>
                            <linearGradient id="gradient-chart" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.00" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Chart X axis text labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[35px] text-[10px] font-mono text-slate-500 pt-3">
                          <span>Jan</span>
                          <span>Fev</span>
                          <span>Mar</span>
                          <span>Abr</span>
                          <span>Mai</span>
                          <span>Jun (Atual)</span>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown by lead source */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm lg:col-span-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-sans font-bold text-base text-white mb-1">Origem dos Contatos</h3>
                        <span className="text-[10px] font-mono text-slate-500 block mb-6">De qual canal vêm as cotações</span>
                        
                        <div className="space-y-4">
                          {/* Contato Direct Form */}
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="text-slate-300 font-medium">Formulário de Contato</span>
                              <span className="font-mono text-slate-400 font-bold">
                                {leads.filter(l => l.source === 'Contato').length} leads
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-brand h-full rounded-full transition-all duration-500" 
                                style={{ width: `${totalLeads > 0 ? (leads.filter(l => l.source === 'Contato').length / totalLeads) * 100 : 0}%` }}
                              />
                            </div>
                          </div>

                          {/* Calculator Estimate Form */}
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="text-slate-300 font-medium">Estimador de Orçamento</span>
                              <span className="font-mono text-slate-400 font-bold">
                                {leads.filter(l => l.source === 'Estimador').length} leads
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${totalLeads > 0 ? (leads.filter(l => l.source === 'Estimador').length / totalLeads) * 100 : 0}%` }}
                              />
                            </div>
                          </div>

                          {/* Technical Blog inquiries */}
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="text-slate-300 font-medium">Artigos do Blog / Dúvidas</span>
                              <span className="font-mono text-slate-400 font-bold">
                                {leads.filter(l => l.source === 'Blog').length} leads
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-purple-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${totalLeads > 0 ? (leads.filter(l => l.source === 'Blog').length / totalLeads) * 100 : 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-950/50 p-3 rounded-sm border border-slate-800/80 mt-6 flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                        <span className="text-[10px] font-mono text-slate-400">Banco de dados sincronizado localmente.</span>
                      </div>
                    </div>

                  </div>

                  {/* MINI LATEST LEADS TABLE */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-sans font-bold text-base text-white">Últimas Atividades de Leads</h3>
                      <button 
                        onClick={() => setActiveTab('leads')}
                        className="text-xs text-brand hover:underline flex items-center gap-1"
                      >
                        Ver todos os leads <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[9px] tracking-wider pb-3">
                            <th className="py-3 font-bold">Data</th>
                            <th className="py-3 font-bold">Cliente</th>
                            <th className="py-3 font-bold">Empresa</th>
                            <th className="py-3 font-bold">Origem</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {leads.slice(0, 5).map(lead => (
                            <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 font-mono text-slate-400">{lead.date}</td>
                              <td className="py-3 font-bold text-white">{lead.nome}</td>
                              <td className="py-3 text-slate-300">{lead.empresa || '-'}</td>
                              <td className="py-3">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold ${
                                  lead.source === 'Estimador' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                  lead.source === 'Blog' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                  'bg-brand/10 text-brand border border-brand/20'
                                }`}>
                                  {lead.source}
                                </span>
                              </td>
                              <td className="py-3">
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm ${
                                  lead.status === 'Novo' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25' :
                                  lead.status === 'Em Atendimento' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' :
                                  lead.status === 'Fechado' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' :
                                  'bg-slate-700/30 text-slate-400 border border-slate-700/50'
                                }`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => setSelectedLeadDetail(lead)}
                                  className="text-[10px] bg-slate-800 hover:bg-brand text-slate-200 hover:text-white font-mono uppercase tracking-wider px-2.5 py-1 rounded-sm transition-all cursor-pointer"
                                >
                                  Ver Ficha
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: LEADS CRM & CONTACTS */}
              {activeTab === 'leads' && (
                <div id="admin-tab-leads" className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-sans font-black text-2xl text-white tracking-tight">Gerenciamento de Leads e Propostas</h2>
                      <p className="text-xs text-slate-400 mt-1">Consulte informações detalhadas, altere status de vendas e adicione cotações tomadas por telefone.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>Exportar CSV</span>
                      </button>
                      
                      <button
                        onClick={() => setIsManualLeadModalOpen(true)}
                        className="bg-brand hover:bg-brand-dark text-white text-xs font-extrabold px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Adicionar Lead</span>
                      </button>
                    </div>
                  </div>

                  {/* FILTER AND SEARCH BAR FOR LEADS */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                    <div className="relative flex-grow max-w-md">
                      <input
                        type="text"
                        placeholder="Buscar por nome, empresa, e-mail ou mensagem..."
                        value={searchLeadTerm}
                        onChange={(e) => setSearchLeadTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-sm pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                      />
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase shrink-0">Filtrar Status:</span>
                      <select
                        value={filterLeadStatus}
                        onChange={(e) => setFilterLeadStatus(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                      >
                        <option value="Todos">Todos os Status</option>
                        <option value="Novo">Novo</option>
                        <option value="Em Atendimento">Em Atendimento</option>
                        <option value="Fechado">Fechado</option>
                        <option value="Descartado">Descartado</option>
                      </select>
                    </div>
                  </div>

                  {/* LEADS LIST ACCORDION */}
                  {filteredLeads.length > 0 ? (
                    <div className="space-y-3">
                      {filteredLeads.map(lead => (
                        <div
                          key={lead.id}
                          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                        >
                          {/* Left Column details */}
                          <div className="space-y-1.5 max-w-2xl">
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="font-sans font-extrabold text-sm text-white">{lead.nome}</span>
                              {lead.empresa && (
                                <span className="bg-slate-850 text-slate-300 text-[10px] px-2 py-0.5 border border-slate-800 font-medium rounded-sm">
                                  {lead.empresa}
                                </span>
                              )}
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold ${
                                lead.source === 'Estimador' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                lead.source === 'Blog' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                'bg-brand/10 text-brand border border-brand/20'
                              }`}>
                                {lead.source}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs">
                              <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-brand" /> {lead.email}</span>
                              {lead.telefone && <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-brand" /> {lead.telefone}</span>}
                              <span className="text-[10px] font-mono text-slate-500">{lead.date}</span>
                            </div>

                            <p className="text-slate-300 text-xs line-clamp-2 mt-1 font-sans italic leading-relaxed">
                              "{lead.mensagem}"
                            </p>
                          </div>

                          {/* Right Column controls */}
                          <div className="flex items-center gap-3 self-end md:self-auto pt-4 md:pt-0 border-t border-slate-800/80 md:border-none">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                              className={`bg-slate-950 border text-xs font-bold rounded-sm px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand ${
                                lead.status === 'Novo' ? 'border-rose-500/50 text-rose-400' :
                                lead.status === 'Em Atendimento' ? 'border-amber-500/50 text-amber-400' :
                                lead.status === 'Fechado' ? 'border-emerald-500/50 text-emerald-400' :
                                'border-slate-700 text-slate-400'
                              }`}
                            >
                              <option value="Novo">Novo</option>
                              <option value="Em Atendimento">Em Atendimento</option>
                              <option value="Fechado">Fechado</option>
                              <option value="Descartado">Descartado</option>
                            </select>

                            <button
                              onClick={() => setSelectedLeadDetail(lead)}
                              className="p-2 bg-slate-800 hover:bg-brand text-slate-200 hover:text-white rounded-sm border border-slate-750 hover:border-brand transition-colors cursor-pointer"
                              title="Visualizar detalhado"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              onClick={(e) => handleDeleteLead(lead.id, e)}
                              className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white rounded-sm border border-slate-750 hover:border-rose-600 transition-colors cursor-pointer"
                              title="Excluir lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-sm">
                      <Users className="h-10 w-10 text-slate-700 mx-auto mb-3" />
                      <h4 className="text-white font-bold text-sm">Nenhum lead encontrado</h4>
                      <p className="text-slate-500 text-xs mt-1">Tente trocar o filtro ou limpe o campo de busca.</p>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: PRODUCTS CMS MANAGER */}
              {activeTab === 'produtos' && (
                <div id="admin-tab-produtos" className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-sans font-black text-2xl text-white tracking-tight">Catálogo de Produtos e Sistemas</h2>
                      <p className="text-xs text-slate-400 mt-1">Edite a descrição das fôrmas, segurança, acessórios e adicione novas linhas industriais.</p>
                    </div>

                    <button
                      onClick={() => handleOpenProductModal(null)}
                      className="bg-brand hover:bg-brand-dark text-white text-xs font-extrabold px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Cadastrar Novo Produto</span>
                    </button>
                  </div>

                  {/* PRODUCTS TABLE */}
                  <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[9px] tracking-wider py-4 px-6 bg-slate-950/40">
                            <th className="py-4 px-6 font-bold">Identificador</th>
                            <th className="py-4 px-6 font-bold">Título do Produto</th>
                            <th className="py-4 px-6 font-bold">Ícone Lucide</th>
                            <th className="py-4 px-6 font-bold">Descrição Curta</th>
                            <th className="py-4 px-6 font-bold text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {products.map(prod => (
                            <tr key={prod.id} className="hover:bg-slate-850/50 transition-colors">
                              <td className="py-4 px-6 font-mono text-slate-400 font-bold">{prod.id}</td>
                              <td className="py-4 px-6 font-bold text-white text-sm">{prod.title}</td>
                              <td className="py-4 px-6">
                                <span className="font-mono text-brand bg-brand/10 border border-brand/20 px-2 py-1 rounded-sm text-[10px]">
                                  {prod.iconName}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-slate-400 leading-normal max-w-sm line-clamp-2 mt-1">
                                {prod.description}
                              </td>
                              <td className="py-4 px-6 text-right space-x-2">
                                <button
                                  onClick={() => handleOpenProductModal(prod)}
                                  className="text-brand hover:text-brand-dark hover:underline font-mono uppercase text-[10px] tracking-wider font-bold cursor-pointer"
                                >
                                  Editar
                                </button>
                                <span className="text-slate-700">|</span>
                                <button
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="text-rose-400 hover:text-rose-300 hover:underline font-mono uppercase text-[10px] tracking-wider font-bold cursor-pointer"
                                >
                                  Excluir
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: BLOG CMS MANAGER */}
              {activeTab === 'blog' && (
                <div id="admin-tab-blog" className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-sans font-black text-2xl text-white tracking-tight">Gerenciamento de Conteúdo do Blog</h2>
                      <p className="text-xs text-slate-400 mt-1">Crie artigos, adicione discussões técnicas de engenharia civil e publique dicas industriais de desforma.</p>
                    </div>

                    <button
                      onClick={() => handleOpenBlogModal(null)}
                      className="bg-brand hover:bg-brand-dark text-white text-xs font-extrabold px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Escrever Artigo</span>
                    </button>
                  </div>

                  {/* ARTICLES LISTING TABLE */}
                  <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[9px] tracking-wider py-4 px-6 bg-slate-950/40">
                            <th className="py-4 px-6 font-bold">Título</th>
                            <th className="py-4 px-6 font-bold">Categoria</th>
                            <th className="py-4 px-6 font-bold">Autor</th>
                            <th className="py-4 px-6 font-bold text-center">Curtidas</th>
                            <th className="py-4 px-6 font-bold text-center">Comentários</th>
                            <th className="py-4 px-6 font-bold text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {blogPosts.map(post => (
                            <tr key={post.id} className="hover:bg-slate-850/50 transition-colors">
                              <td className="py-4 px-6 font-bold text-white text-sm max-w-xs truncate">{post.title}</td>
                              <td className="py-4 px-6">
                                <span className="bg-slate-850 text-slate-300 px-2 py-0.5 border border-slate-800 rounded-sm text-[10px]">
                                  {post.categoryLabel}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-slate-300 font-medium">{post.author}</td>
                              <td className="py-4 px-6 text-center font-mono text-slate-400 font-bold">{post.likes}</td>
                              <td className="py-4 px-6 text-center font-mono text-slate-400 font-bold">{post.comments.length}</td>
                              <td className="py-4 px-6 text-right space-x-2">
                                <button
                                  onClick={() => handleOpenBlogModal(post)}
                                  className="text-brand hover:text-brand-dark hover:underline font-mono uppercase text-[10px] tracking-wider font-bold cursor-pointer"
                                >
                                  Editar
                                </button>
                                <span className="text-slate-700">|</span>
                                <button
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="text-rose-400 hover:text-rose-300 hover:underline font-mono uppercase text-[10px] tracking-wider font-bold cursor-pointer"
                                >
                                  Excluir
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: SITE TEXTS CMS */}
              {activeTab === 'textos' && cmsForm && (
                <div id="admin-tab-textos" className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-sans font-black text-2xl text-white tracking-tight">CMS — Central de Textos do Site</h2>
                      <p className="text-xs text-slate-400 mt-1">Modifique diretamente as chamadas de marketing, histórico institucional e dados de contatos oficiais.</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetTexts}
                      className="bg-slate-800 hover:bg-slate-750 border border-slate-700 text-rose-400 text-xs font-mono font-bold px-3 py-2 rounded-sm transition-all cursor-pointer"
                    >
                      Resetar para o Padrão
                    </button>
                  </div>

                  <form onSubmit={handleTextsSubmit} className="space-y-6">
                    {cmsSuccessMessage && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-sm text-xs flex items-center gap-1.5 font-sans">
                        <CheckCircle className="h-4 w-4" /> Textos do site atualizados! Navegue na página inicial para ver as mudanças ao fechar este painel.
                      </div>
                    )}

                    {/* HERO CHANGER */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4">
                      <h3 className="text-sm font-mono font-bold text-brand uppercase tracking-wider border-b border-slate-800 pb-2">1. Seção de Banner Inicial (Hero)</h3>
                      
                      <div>
                        <label className="block text-xs text-slate-400 font-bold mb-1.5">Título do Banner (Heading) *</label>
                        <input
                          type="text"
                          required
                          value={cmsForm.heroTitle}
                          onChange={(e) => setCmsForm({ ...cmsForm, heroTitle: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 font-bold mb-1.5">Subtítulo do Banner *</label>
                        <textarea
                          required
                          rows={2}
                          value={cmsForm.heroSubtitle}
                          onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitle: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* ABOUT US CHANGER */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4">
                      <h3 className="text-sm font-mono font-bold text-brand uppercase tracking-wider border-b border-slate-800 pb-2">2. História & Valores (Quem Somos)</h3>
                      
                      <div>
                        <label className="block text-xs text-slate-400 font-bold mb-1.5">Título de Apresentação *</label>
                        <input
                          type="text"
                          required
                          value={cmsForm.aboutTitle}
                          onChange={(e) => setCmsForm({ ...cmsForm, aboutTitle: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 font-bold mb-1.5">História Institucional *</label>
                        <textarea
                          required
                          rows={3}
                          value={cmsForm.aboutHistory}
                          onChange={(e) => setCmsForm({ ...cmsForm, aboutHistory: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 font-bold mb-1.5">Nossa Missão *</label>
                          <textarea
                            required
                            rows={3}
                            value={cmsForm.aboutMission}
                            onChange={(e) => setCmsForm({ ...cmsForm, aboutMission: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 font-bold mb-1.5">Nossa Visão *</label>
                          <textarea
                            required
                            rows={3}
                            value={cmsForm.aboutVision}
                            onChange={(e) => setCmsForm({ ...cmsForm, aboutVision: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 font-bold mb-1.5">Nossos Valores *</label>
                          <textarea
                            required
                            rows={3}
                            value={cmsForm.aboutValues}
                            onChange={(e) => setCmsForm({ ...cmsForm, aboutValues: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CONTACT INFO CHANGER */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-5">
                      <div className="border-b border-slate-800 pb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-mono font-bold text-brand uppercase tracking-wider">
                            3. Canais de Contato & Informações da Fundiferro (100% Editável)
                          </h3>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Reflete em todo o site
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Todas as alterações feitas aqui atualizam imediatamente o cabeçalho, rodapé, botão flutuante de WhatsApp, formulários de contato e páginas institucionais.
                        </p>
                      </div>
                      
                      {/* WhatsApp & Phones */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 font-bold mb-1.5 flex items-center justify-between">
                            <span>WhatsApp Oficial de Atendimento *</span>
                            <span className="text-[10px] font-mono text-emerald-400">Usado em links diretos wa.me</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={cmsForm.contactWhatsapp || ''}
                            onChange={(e) => setCmsForm({ ...cmsForm, contactWhatsapp: e.target.value })}
                            placeholder="(17) 99181-2122"
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand font-mono"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">Ex: (17) 99181-2122</span>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-300 font-bold mb-1.5">
                            Telefone Fixo / PABX da Empresa *
                          </label>
                          <input
                            type="text"
                            required
                            value={cmsForm.contactPhone || ''}
                            onChange={(e) => setCmsForm({ ...cmsForm, contactPhone: e.target.value })}
                            placeholder="(17) 3531-6611"
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand font-mono"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">Ex: (17) 3531-6611</span>
                        </div>
                      </div>

                      {/* Email & Working Hours */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 font-bold mb-1.5">
                            E-mail Oficial Comercial / Engenharia *
                          </label>
                          <input
                            type="email"
                            required
                            value={cmsForm.contactEmail || ''}
                            onChange={(e) => setCmsForm({ ...cmsForm, contactEmail: e.target.value })}
                            placeholder="fundiferro@fundiferroformas.com.br"
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand font-mono"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">Exibido na página de contato e rodapé</span>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-300 font-bold mb-1.5">
                            Horário de Funcionamento / Operação *
                          </label>
                          <input
                            type="text"
                            required
                            value={cmsForm.contactHours || ''}
                            onChange={(e) => setCmsForm({ ...cmsForm, contactHours: e.target.value })}
                            placeholder="Segunda a sexta-feira, das 7h às 17h"
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">Ex: Segunda a sexta-feira, das 7h às 17h</span>
                        </div>
                      </div>

                      {/* Address, City/State, CEP */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-300 font-bold mb-1.5">
                            Endereço Completo de Sede / Fábrica / Showroom *
                          </label>
                          <input
                            type="text"
                            required
                            value={cmsForm.contactAddress || ''}
                            onChange={(e) => setCmsForm({ ...cmsForm, contactAddress: e.target.value })}
                            placeholder="Av. Dona Engrácia | Agudo Romão, 891 - Catanduva/SP — CEP 15.802-200"
                            className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 font-bold mb-1">Cidade / Estado</label>
                            <input
                              type="text"
                              value={cmsForm.contactCityState || ''}
                              onChange={(e) => setCmsForm({ ...cmsForm, contactCityState: e.target.value })}
                              placeholder="Catanduva / SP"
                              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 font-bold mb-1">CEP</label>
                            <input
                              type="text"
                              value={cmsForm.contactCep || ''}
                              onChange={(e) => setCmsForm({ ...cmsForm, contactCep: e.target.value })}
                              placeholder="15.802-200"
                              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Default Message */}
                      <div>
                        <label className="block text-xs text-slate-300 font-bold mb-1.5">
                          Mensagem Pré-Definida ao Iniciar Conversa no WhatsApp
                        </label>
                        <textarea
                          rows={2}
                          value={cmsForm.contactWhatsappMessage || ''}
                          onChange={(e) => setCmsForm({ ...cmsForm, contactWhatsappMessage: e.target.value })}
                          placeholder="Olá! Estou no site da Fundiferro e gostaria de falar com um engenheiro técnico sobre fôrmas e orçamento para minha obra."
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                        />
                      </div>

                      {/* Social Links */}
                      <div className="pt-2 border-t border-slate-800/80 space-y-3">
                        <label className="block text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">
                          Redes Sociais Oficiais
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <span className="text-[11px] text-slate-400 block mb-1">Instagram URL</span>
                            <input
                              type="url"
                              value={cmsForm.instagramUrl || ''}
                              onChange={(e) => setCmsForm({ ...cmsForm, instagramUrl: e.target.value })}
                              placeholder="https://www.instagram.com/fundiferroformas"
                              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand font-mono text-[11px]"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block mb-1">Facebook URL</span>
                            <input
                              type="url"
                              value={cmsForm.facebookUrl || ''}
                              onChange={(e) => setCmsForm({ ...cmsForm, facebookUrl: e.target.value })}
                              placeholder="https://www.facebook.com/fundiferroformas"
                              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand font-mono text-[11px]"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block mb-1">LinkedIn URL</span>
                            <input
                              type="url"
                              value={cmsForm.linkedinUrl || ''}
                              onChange={(e) => setCmsForm({ ...cmsForm, linkedinUrl: e.target.value })}
                              placeholder="https://www.linkedin.com/company/fundiferro"
                              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="submit"
                        className="bg-brand hover:bg-brand-dark text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Salvar Textos do Site</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 6: EMAIL & SMTP CONFIGURATION */}
              {activeTab === 'email' && (
                <div id="admin-tab-email" className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-sans font-black text-2xl text-white tracking-tight">
                        Notificações de Orçamento por E-mail (SMTP)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Configure as credenciais do seu servidor de e-mail para receber automaticamente todos os formulários e arquivos de clientes.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          fetch('/api/email-status')
                            .then(res => res.json())
                            .then(data => {
                              setEmailStatus(data);
                              addLog('Status do servidor SMTP verificado.');
                            });
                        }}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-2 rounded-sm text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Recarregar status"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Verificar Conexão</span>
                      </button>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className={`p-5 rounded-sm border ${
                    emailStatus.isConfigured
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                  }`}>
                    <div className="flex items-start gap-3">
                      {emailStatus.isConfigured ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">
                            {emailStatus.isConfigured
                              ? 'Serviço de Disparo de E-mails Ativo'
                              : 'Variáveis de Ambiente SMTP Pendentes de Configuração'}
                          </h4>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                            emailStatus.isConfigured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            Provedor: {emailStatus.provider}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {emailStatus.isConfigured
                            ? `Os orçamentos enviados pelo site serão entregues no(s) e-mail(s): ${emailStatus.emailTo}`
                            : 'O sistema está operando e gravando todos os leads localmente no CRM. Para que os e-mails sejam disparados automaticamente na sua caixa de entrada, preencha as variáveis de ambiente no arquivo .env ou no painel de Secrets.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Diagnostic details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Servidor SMTP</span>
                      <span className="font-mono font-bold text-white text-xs mt-1 block">
                        {emailStatus.smtpHost || 'Não configurado (SMTP_HOST)'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Porta: {emailStatus.smtpPort}</span>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Conta de Envio</span>
                      <span className="font-mono font-bold text-white text-xs mt-1 block">
                        {emailStatus.smtpUser || 'Não configurada (SMTP_USER)'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">De: {emailStatus.emailFrom}</span>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Destinatário Oficial (EMAIL_TO)</span>
                      <span className="font-mono font-bold text-emerald-400 text-xs mt-1 block truncate" title={emailStatus.emailTo}>
                        {emailStatus.emailTo}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Recebe todos os orçamentos</span>
                    </div>
                  </div>

                  {/* Live Test Mail Dispatch Form */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-mono font-bold text-brand uppercase tracking-wider">
                        ⚡ Testar Disparo em Tempo Real
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Dispara uma solicitação simulada completa com layout Fundiferro para o e-mail de destino.
                      </p>
                    </div>

                    <form onSubmit={handleTestEmail} className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-grow w-full">
                        <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                          E-mail de Destino para Teste
                        </label>
                        <input
                          type="email"
                          required
                          value={testEmailRecipient}
                          onChange={(e) => setTestEmailRecipient(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand font-mono"
                          placeholder="seuemail@empresa.com.br"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isTestingEmail}
                        className="w-full sm:w-auto bg-brand hover:bg-brand-dark disabled:bg-brand/60 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-2.5 rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                      >
                        {isTestingEmail ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>Enviar E-mail de Teste</span>
                          </>
                        )}
                      </button>
                    </form>

                    {testEmailResult && (
                      <div className={`p-4 rounded-sm text-xs font-mono ${
                        testEmailResult.success
                          ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                      }`}>
                        {testEmailResult.success ? '✅ ' : '❌ '}
                        {testEmailResult.message}
                      </div>
                    )}
                  </div>

                  {/* Variables Guide & Configuration Instructions */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                          Variáveis de Ambiente Disponíveis (.env)
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Copie as variáveis abaixo e preencha no seu arquivo <code className="text-brand">.env</code> ou nas Configurações da plataforma:
                        </p>
                      </div>
                      <button
                        onClick={handleCopyEnvExample}
                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedEnv ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedEnv ? 'Copiado!' : 'Copiar Modelo .env'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-sm font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                      <div className="text-slate-500"># Servidor SMTP (Gmail, Outlook, Zoho, SendGrid, Resend, Hostgator, etc.)</div>
                      <div><span className="text-brand">SMTP_HOST</span>=smtp.gmail.com</div>
                      <div><span className="text-brand">SMTP_PORT</span>=587</div>
                      <div><span className="text-brand">SMTP_SECURE</span>=false</div>
                      <div><span className="text-brand">SMTP_USER</span>=seu-email@gmail.com</div>
                      <div><span className="text-brand">SMTP_PASS</span>=sua-senha-de-app-16-digitos</div>
                      <div className="mt-2 text-slate-500"># Identificação do Remetente e Destinatário(s)</div>
                      <div><span className="text-brand">EMAIL_FROM</span>="Fundiferro Formas &lt;no-reply@fundiferro.com.br&gt;"</div>
                      <div><span className="text-brand">EMAIL_TO</span>=werikplaystore@gmail.com</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400 pt-2">
                      <div className="bg-slate-950/60 p-3.5 rounded-sm border border-slate-800/80">
                        <span className="font-bold text-white block mb-1">💡 Dica para contas Gmail / Google Workspace:</span>
                        <p className="leading-relaxed text-[11px]">
                          Ative a verificação em 2 etapas na Conta Google e gere uma <strong>"Senha de App"</strong> (16 letras) na aba Segurança. Use essa senha em <code className="text-brand">SMTP_PASS</code>.
                        </p>
                      </div>

                      <div className="bg-slate-950/60 p-3.5 rounded-sm border border-slate-800/80">
                        <span className="font-bold text-white block mb-1">📬 Múltiplos Destinatários:</span>
                        <p className="leading-relaxed text-[11px]">
                          Você pode colocar mais de um e-mail em <code className="text-brand">EMAIL_TO</code> separando por vírgula (ex: <code className="text-slate-300">comercial@fundiferro.com.br, engenharia@fundiferro.com.br</code>).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: SYSTEM LOGS AUDIT */}
              {activeTab === 'logs' && (
                <div id="admin-tab-logs" className="space-y-6">
                  <div>
                    <h2 className="font-sans font-black text-2xl text-white tracking-tight">Logs de Eventos e Auditoria</h2>
                    <p className="text-xs text-slate-400 mt-1">Acompanhe as ações efetuadas na base de dados de leads e CMS nesta sessão.</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-sm">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest block">Histórico de Sessão</span>
                      <button
                        onClick={() => {
                          setSystemLogs([]);
                          addLog('Histórico de logs limpo.');
                        }}
                        className="text-[10px] font-mono text-rose-400 hover:underline"
                      >
                        Limpar Terminal
                      </button>
                    </div>

                    {systemLogs.length > 0 ? (
                      <div className="font-mono text-xs text-slate-300 space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                        {systemLogs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-slate-600">❯</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-mono text-xs text-slate-500 italic">Sem registros no momento.</p>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </motion.div>

      {/* CRM SUBMODAL 1: LEAD DETAIL MODAL */}
      <AnimatePresence>
        {selectedLeadDetail && (
          <div id="lead-detail-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-sm max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedLeadDetail(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-6">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold ${
                  selectedLeadDetail.source === 'Estimador' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  selectedLeadDetail.source === 'Blog' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                  'bg-brand/10 text-brand border border-brand/20'
                }`}>
                  Ficha de Lead — {selectedLeadDetail.source}
                </span>
                <h3 className="font-sans font-black text-xl text-white mt-2 leading-none">{selectedLeadDetail.nome}</h3>
                <p className="text-xs text-slate-500 mt-1">Registrado em {selectedLeadDetail.date}</p>
              </div>

              <div className="space-y-4 border-t border-slate-800/80 pt-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Empresa / Construtora</span>
                    <span className="font-bold text-white block mt-0.5">{selectedLeadDetail.empresa || 'Não informada'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Telefone / WhatsApp</span>
                    <span className="font-bold text-white block mt-0.5">{selectedLeadDetail.telefone || 'Não fornecido'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">E-mail Comercial</span>
                    <span className="font-bold text-white text-xs block mt-0.5">{selectedLeadDetail.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Localização da Obra</span>
                    <span className="font-bold text-white text-xs block mt-0.5">{selectedLeadDetail.localizacaoObra || 'Não informada'}</span>
                  </div>
                </div>

                {selectedLeadDetail.segmentoObra && (
                  <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/60 p-3 rounded-sm border border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono text-brand uppercase tracking-wider block">Segmento da Obra</span>
                      <span className="font-bold text-white block mt-0.5">{selectedLeadDetail.segmentoObra}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-brand uppercase tracking-wider block">Status do Projeto</span>
                      <span className="font-bold text-white block mt-0.5">{selectedLeadDetail.temProjeto || 'Padrão'}</span>
                    </div>
                  </div>
                )}

                {/* ATTACHED FILES SECTION (IF ANY) */}
                {selectedLeadDetail.arquivos && selectedLeadDetail.arquivos.length > 0 && (
                  <div className="bg-slate-950 p-3.5 rounded-sm border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono text-brand uppercase tracking-wider block font-bold">
                      📎 Plantas / Arquivos Anexados ({selectedLeadDetail.arquivos.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedLeadDetail.arquivos.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded-sm text-xs">
                          <div className="truncate pr-2">
                            <span className="font-bold text-white block truncate text-[11px]">{file.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{file.size} • {file.type}</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                            Pronto
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ESTIMATOR DATA PREVIEW (IF ANY) */}
                {selectedLeadDetail.dadosEstimador && (
                  <div className="bg-slate-950 p-3.5 rounded-sm border border-slate-800 space-y-2 text-xs">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                      ⚡ Dados do Estimador de Modulação
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">Fôrmas Calculadas</span>
                        <span className="font-mono font-bold text-white text-xs mt-0.5 block">~{selectedLeadDetail.dadosEstimador.areaFormasCalculada} m²</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">Economia Est.</span>
                        <span className="font-mono font-bold text-emerald-400 text-xs mt-0.5 block">R$ {(selectedLeadDetail.dadosEstimador.economiaEstimadaReais / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">Dias Poupados</span>
                        <span className="font-mono font-bold text-emerald-400 text-xs mt-0.5 block">{selectedLeadDetail.dadosEstimador.diasPoupados} dias</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-950 p-4 rounded-sm border border-slate-800">
                  <span className="text-[10px] font-mono text-brand uppercase tracking-wider block mb-1">Mensagem & Especificações</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                    {selectedLeadDetail.mensagem}
                  </p>
                </div>

                {/* Change status inside modal */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Status:</span>
                    <select
                      value={selectedLeadDetail.status}
                      onChange={(e) => handleStatusChange(selectedLeadDetail.id, e.target.value as Lead['status'])}
                      className={`bg-slate-950 border text-xs font-bold rounded-sm px-2.5 py-1.5 focus:outline-none ${
                        selectedLeadDetail.status === 'Novo' ? 'border-rose-500/50 text-rose-400' :
                        selectedLeadDetail.status === 'Em Atendimento' ? 'border-amber-500/50 text-amber-400' :
                        selectedLeadDetail.status === 'Fechado' ? 'border-emerald-500/50 text-emerald-400' :
                        'border-slate-700 text-slate-400'
                      }`}
                    >
                      <option value="Novo">Novo</option>
                      <option value="Em Atendimento">Em Atendimento</option>
                      <option value="Fechado">Fechado</option>
                      <option value="Descartado">Descartado</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDeleteLead(selectedLeadDetail.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Excluir Registro
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CRM SUBMODAL 2: MANUAL LEAD ADD MODAL */}
      <AnimatePresence>
        {isManualLeadModalOpen && (
          <div id="manual-lead-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-sm max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsManualLeadModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="font-sans font-black text-xl text-white mb-6">Adicionar Lead Manual</h3>

              <form onSubmit={handleManualLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={manualLeadForm.nome}
                    onChange={(e) => setManualLeadForm({ ...manualLeadForm, nome: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Eng. Claudio Silva"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">E-mail Comercial *</label>
                    <input
                      type="email"
                      required
                      value={manualLeadForm.email}
                      onChange={(e) => setManualLeadForm({ ...manualLeadForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="claudio@construtora.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">WhatsApp / Telefone</label>
                    <input
                      type="text"
                      value={manualLeadForm.telefone}
                      onChange={(e) => setManualLeadForm({ ...manualLeadForm, telefone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="(11) 98888-7777"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Empresa</label>
                    <input
                      type="text"
                      value={manualLeadForm.empresa}
                      onChange={(e) => setManualLeadForm({ ...manualLeadForm, empresa: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="Silva Engenharia"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Origem *</label>
                    <select
                      value={manualLeadForm.source}
                      onChange={(e) => setManualLeadForm({ ...manualLeadForm, source: e.target.value as Lead['source'] })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Contato">Contato (Site)</option>
                      <option value="Estimador">Estimador</option>
                      <option value="Blog">Blog</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Anotações / Descrição da Negociação *</label>
                  <textarea
                    required
                    rows={4}
                    value={manualLeadForm.mensagem}
                    onChange={(e) => setManualLeadForm({ ...manualLeadForm, mensagem: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Registrar os equipamentos orçados via telefonema..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
                >
                  Salvar Registro de Lead
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRODUCTS CMS SUBMODAL: ADD / EDIT PRODUCT */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div id="product-form-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-sm max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="font-sans font-black text-xl text-white mb-6">
                {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h3>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">ID Único (Slug) *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProduct}
                    value={productForm.id}
                    onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none disabled:opacity-50 font-mono"
                    placeholder="formas-parede-novo"
                  />
                  {!editingProduct && (
                    <span className="text-[9px] text-slate-500 block mt-1">Use letras, números e hifens. Sem espaços ou acentos.</span>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Título do Produto *</label>
                  <input
                    type="text"
                    required
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Formas Especiais Industriais"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Ícone Lucide *</label>
                  <select
                    value={productForm.iconName}
                    onChange={(e) => setProductForm({ ...productForm, iconName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="Layers">Layers (Formas)</option>
                    <option value="ShieldCheck">ShieldCheck (Segurança)</option>
                    <option value="Wrench">Wrench (Reforma/Ferramentas)</option>
                    <option value="Nut">Nut (Acessórios/Parafusos)</option>
                    <option value="Grid">Grid (Malha/Grelha)</option>
                    <option value="Construction">Construction (Construção)</option>
                    <option value="Sparkles">Sparkles (Tecnologia/Especiais)</option>
                    <option value="Box">Box (Caixas/Estojos)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Descrição do Produto *</label>
                  <textarea
                    required
                    rows={4}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Forneça detalhes resumidos do produto para o cartão..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
                >
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BLOG CMS SUBMODAL: ADD / EDIT POST */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div id="blog-form-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative shadow-2xl"
            >
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="font-sans font-black text-xl text-white mb-6">
                {editingBlogPost ? 'Editar Artigo' : 'Publicar Artigo Técnico'}
              </h3>

              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Identificador Slug *</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingBlogPost}
                      value={blogForm.id}
                      onChange={(e) => setBlogForm({ ...blogForm, id: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none disabled:opacity-50 font-mono"
                      placeholder="titulo-do-artigo"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Categoria Técnica *</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as BlogPost['category'] })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="engenharia">Engenharia de Fôrmas</option>
                      <option value="reforma">Reengenharia & Reforma</option>
                      <option value="seguranca">Segurança Operacional (NR-18)</option>
                      <option value="sustentabilidade">Sustentabilidade</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Título do Artigo *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Como impulsionar a segurança de borda em concretagens de prédios altos..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Nome do Autor *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Cargo do Autor *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.authorRole}
                      onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Sumário do Artigo (Breve resumo para os cartões) *</label>
                  <textarea
                    required
                    rows={2}
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Um panorama prático sobre o travamento seguro..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Url da Imagem de Capa *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Tags do Artigo (Separadas por vírgulas) *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.tagsString}
                    onChange={(e) => setBlogForm({ ...blogForm, tagsString: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Segurança, NR-18, Concretagem"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Corpo do Artigo (Pressione "Enter" duas vezes para criar um novo parágrafo) *</label>
                  <textarea
                    required
                    rows={8}
                    value={blogForm.contentString}
                    onChange={(e) => setBlogForm({ ...blogForm, contentString: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none font-sans leading-relaxed"
                    placeholder="Parágrafo 1 de conteúdo...\n\nParágrafo 2 de conteúdo..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
                >
                  {editingBlogPost ? 'Salvar Alterações' : 'Publicar Artigo'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
