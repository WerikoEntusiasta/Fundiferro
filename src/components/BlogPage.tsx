/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageSquare, 
  Clock, 
  User, 
  Search, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Calendar,
  Sparkles,
  Send,
  HelpCircle,
  Home,
  BookOpen,
  Share2,
  Check
} from 'lucide-react';
import { getBlogPosts, likeBlogPost, addBlogComment, addLead, BlogPost } from '../utils/storage';

interface BlogPageProps {
  onBackToHome: () => void;
  initialPostId?: string | null;
}

export default function BlogPage({ onBackToHome, initialPostId }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Comments Form State
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Load posts
  const loadPosts = () => {
    const all = getBlogPosts();
    setPosts(all);
    if (initialPostId) {
      const match = all.find(p => p.id === initialPostId);
      if (match) setSelectedPost(match);
    }
  };

  useEffect(() => {
    loadPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync state if admin updates blog posts
  useEffect(() => {
    const handleUpdate = () => {
      const all = getBlogPosts();
      setPosts(all);
      if (selectedPost) {
        const fresh = all.find(p => p.id === selectedPost.id);
        if (fresh) setSelectedPost(fresh);
      }
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, [selectedPost]);

  // Handle Like
  const handleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    likeBlogPost(postId);
  };

  // Handle Comment Submission
  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentContent.trim()) return;

    addBlogComment(postId, {
      author: newCommentAuthor,
      content: newCommentContent
    });

    // Automatically create a simulated lead in the CRM!
    addLead({
      nome: newCommentAuthor,
      email: `${newCommentAuthor.toLowerCase().replace(/\s+/g, '')}@exemplo.com.br`,
      telefone: '(17) 99999-0000',
      empresa: 'Comentarista do Blog',
      mensagem: `Escreveu um comentário no artigo "${selectedPost?.title}": "${newCommentContent}"`,
      source: 'Blog'
    });

    setNewCommentAuthor('');
    setNewCommentContent('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  // Categories metadata
  const categories = [
    { id: 'Todas', label: 'Todas as Categorias' },
    { id: 'engenharia', label: 'Engenharia de Fôrmas' },
    { id: 'reforma', label: 'Reengenharia & Reforma' },
    { id: 'seguranca', label: 'Segurança Operacional' },
    { id: 'sustentabilidade', label: 'Sustentabilidade' }
  ];

  // Filters calculation
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'Todas' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 hover:text-brand transition-colors cursor-pointer"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Início</span>
            </button>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-800 font-bold">Blog Técnico Fundiferro</span>
          </div>

          <button
            id="back-to-home-from-blog-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand bg-white border border-slate-200 px-3.5 py-1.5 rounded-sm hover:border-brand/40 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar para a Página Principal</span>
          </button>
        </div>

        {/* Blog Hero Banner */}
        <div className="bg-slate-900 rounded-sm p-8 sm:p-12 mb-10 text-white relative overflow-hidden shadow-md">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-brand/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-brand font-mono font-bold text-xs uppercase tracking-widest bg-brand/10 border border-brand/30 px-3 py-1 rounded-sm mb-4">
              <BookOpen className="h-3.5 w-3.5 text-brand" />
              Portal Técnico de Conhecimento
            </span>
            <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4">
              Engenharia, Inovações e Métodos Construtivos
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Fique por dentro das melhores práticas para paredes de concreto, desforma rápida em 24h, segurança em altura NR-18 e recuperação sustentável de fôrmas.
            </p>
          </div>
        </div>

        {/* Search & Category Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
          {/* Categories select pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-brand hover:border-brand/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Buscar artigos por palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-9 pr-8 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ARTICLES GRID */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                id={`blog-full-card-${post.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedPost(post)}
                className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-xl hover:border-brand/30 overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300"
              >
                <div>
                  {/* Image Cover */}
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-brand text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                      {post.categoryLabel}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-brand" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-brand" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-sans font-extrabold text-base text-slate-900 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <User className="h-3 w-3 text-brand" /> {post.author}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      className="flex items-center gap-1 hover:text-rose-500 font-mono text-[11px] font-bold transition-colors cursor-pointer group/like"
                    >
                      <Heart className="h-3.5 w-3.5 text-slate-400 group-hover/like:text-rose-500 group-hover/like:fill-rose-500 transition-colors" />
                      <span>{post.likes}</span>
                    </button>

                    <span className="flex items-center gap-1 font-mono text-[11px] font-bold">
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      <span>{post.comments.length}</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-sm">
            <HelpCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-slate-800 font-bold text-sm">Nenhum artigo encontrado</h4>
            <p className="text-slate-500 text-xs mt-1">Tente trocar a categoria selecionada ou buscar por outro termo.</p>
          </div>
        )}

      </div>

      {/* DETAILED ARTICLE MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div id="blog-post-detail-modal" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-0 md:p-6 lg:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:rounded-sm shadow-2xl flex flex-col overflow-hidden max-w-4xl relative"
            >
              {/* Top sticky banner header */}
              <div className="bg-slate-950 px-6 py-4 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-brand font-mono text-[9px] font-extrabold uppercase tracking-widest border border-brand/30 px-2 py-0.5 rounded-sm">
                    {selectedPost.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">| Artigo Técnico</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleShare(selectedPost, e)}
                    className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-sm transition-all cursor-pointer text-xs flex items-center gap-1"
                    title="Copiar link"
                  >
                    {copiedUrl ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                    <span className="text-[10px] hidden sm:inline">{copiedUrl ? 'Copiado!' : 'Compartilhar'}</span>
                  </button>
                  <button
                    id="close-blog-modal"
                    onClick={() => setSelectedPost(null)}
                    className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-sm transition-all cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
                
                {/* Header title */}
                <div className="space-y-4">
                  <h1 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono border-b border-slate-100 pb-4">
                    <span className="flex items-center gap-1.5 font-sans font-bold text-slate-800">
                      <User className="h-3.5 w-3.5 text-brand" /> {selectedPost.author} ({selectedPost.authorRole})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-brand" /> Publicado em {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand" /> {selectedPost.readTime}
                    </span>
                  </div>
                </div>

                {/* Cover Image banner */}
                <div className="h-64 sm:h-96 w-full rounded-sm overflow-hidden bg-slate-100">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content paragraphs */}
                <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                  {selectedPost.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Tags lists & Likes trigger */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-b border-slate-100 py-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 font-mono text-[10px] px-2.5 py-1 rounded-sm font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLike(selectedPost.id)}
                    className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer"
                  >
                    <Heart className="h-4 w-4 fill-rose-600" />
                    <span>Gostei deste artigo ({selectedPost.likes})</span>
                  </button>
                </div>

                {/* COMMENTS MODULE */}
                <div className="space-y-6">
                  <h3 className="font-sans font-black text-lg text-slate-950 flex items-center gap-2">
                    <span>Discussões e Comentários</span>
                    <span className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                      {selectedPost.comments.length}
                    </span>
                  </h3>

                  {/* Comments lists */}
                  <div className="space-y-4">
                    {selectedPost.comments.length > 0 ? (
                      selectedPost.comments.map(comment => (
                        <div key={comment.id} className="bg-slate-50 border border-slate-100 p-4 rounded-sm space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-sans font-bold text-slate-800">{comment.author}</span>
                            <span className="text-slate-400">{comment.date}</span>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-xs italic">Ninguém comentou ainda. Seja o primeiro a opinar sobre este tema!</p>
                    )}
                  </div>

                  {/* Add Comments Form */}
                  <form onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)} className="bg-slate-50/50 border border-slate-150 p-5 rounded-sm space-y-4">
                    <h4 className="font-sans font-bold text-sm text-slate-800">Participe do debate</h4>
                    
                    {commentSuccess && (
                      <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-3 rounded-sm text-xs flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" /> Comentário adicionado com sucesso!
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Seu Nome *</label>
                        <input
                          type="text"
                          required
                          value={newCommentAuthor}
                          onChange={(e) => setNewCommentAuthor(e.target.value)}
                          placeholder="Ex: Eng. Roberto Silveira"
                          className="w-full bg-white border border-slate-200 rounded-sm px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Seu Comentário *</label>
                      <textarea
                        required
                        rows={3}
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        placeholder="Escreva suas dúvidas, sugestões ou experiência técnica..."
                        className="w-full bg-white border border-slate-200 rounded-sm px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-brand hover:bg-brand-dark text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Enviar Comentário</span>
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
