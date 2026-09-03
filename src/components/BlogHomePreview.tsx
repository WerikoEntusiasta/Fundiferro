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
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { getBlogPosts, likeBlogPost, BlogPost } from '../utils/storage';

interface BlogHomePreviewProps {
  onOpenBlogPage: () => void;
  onOpenPost?: (postId: string) => void;
}

export default function BlogHomePreview({ onOpenBlogPage }: BlogHomePreviewProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const loadPosts = () => {
    setPosts(getBlogPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      loadPosts();
    };
    window.addEventListener('fundiferro_db_update', handleUpdate);
    return () => window.removeEventListener('fundiferro_db_update', handleUpdate);
  }, []);

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    likeBlogPost(postId);
  };

  // Only take the last 3 publications
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="border-l-4 border-brand pl-4">
            <span className="text-brand font-mono font-bold text-xs uppercase tracking-widest block mb-1">
              Conhecimento e Engenharia
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              Últimas do Blog Técnico
            </h2>
          </div>
          
          <button
            id="open-blog-page-header-btn"
            onClick={onOpenBlogPage}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand hover:text-brand-dark transition-colors group cursor-pointer"
          >
            <span>Ver todos os artigos ({posts.length})</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 LATEST POSTS GRID */}
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.id}
                id={`blog-preview-card-${post.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={onOpenBlogPage}
                className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-xl hover:border-brand/30 overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300"
              >
                <div>
                  {/* Image Cover */}
                  <div className="h-44 overflow-hidden relative bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-brand text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-md">
                      {post.categoryLabel}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
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

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700 text-[11px]">
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
          <div className="text-center py-12 bg-white border border-slate-200 rounded-sm">
            <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 text-xs">Nenhum artigo publicado no momento.</p>
          </div>
        )}

        {/* CTA to Open Full Blog Page */}
        <div className="mt-12 text-center">
          <button
            id="view-all-blog-posts-btn"
            onClick={onOpenBlogPage}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-brand border-2 border-brand hover:border-brand-dark rounded-sm text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            <BookOpen className="h-4 w-4 text-brand" />
            <span>Acessar Portal Completo do Blog</span>
            <ArrowRight className="h-3.5 w-3.5 text-brand" />
          </button>
        </div>

      </div>
    </section>
  );
}
