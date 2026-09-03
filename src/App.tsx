/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
import ProductPage from './components/ProductPage';
import ProjectGallery from './components/ProjectGallery';
import PortfolioPage from './components/PortfolioPage';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import AboutSection from './components/AboutSection';
import AboutPage from './components/AboutPage';
import BlogHomePreview from './components/BlogHomePreview';
import BlogPage from './components/BlogPage';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blog' | 'quem-somos' | 'portfolio' | 'produto'>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('formas-parede');
  const [activeSection, setActiveSection] = useState('inicio');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Synchronize route and check for /adminfundiferro or #adminfundiferro
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();

      // Check if URL is requesting the admin panel
      if (
        pathname === '/adminfundiferro' ||
        pathname.startsWith('/adminfundiferro') ||
        hash === 'adminfundiferro' ||
        hash === '/adminfundiferro' ||
        hash === 'admin'
      ) {
        setIsAdminOpen(true);
      }

      if (hash === 'blog' || hash === 'blog-page') {
        setCurrentPage('blog');
        setActiveSection('blog');
      } else if (hash === 'quem-somos' || hash === 'about' || hash === 'institucional') {
        setCurrentPage('quem-somos');
        setActiveSection('quem-somos');
      } else if (hash === 'portfolio' || hash === 'obras' || hash === 'galeria-projetos' || hash === 'projetos') {
        setCurrentPage('portfolio');
        setActiveSection('portfolio');
      } else if (hash.startsWith('produto-') || hash.startsWith('produtos/')) {
        const prodId = hash.replace('produto-', '').replace('produtos/', '');
        setSelectedProductSlug(prodId);
        setCurrentPage('produto');
        setActiveSection('produtos');
      } else if (hash === 'inicio' || hash === '') {
        if (pathname !== '/adminfundiferro') {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Keyboard shortcut (Ctrl+Shift+A or Alt+A) to open admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => {
          const nextState = !prev;
          if (nextState) {
            window.history.pushState(null, '', '/adminfundiferro');
          } else {
            window.history.pushState(null, '', '/');
          }
          return nextState;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    window.history.pushState(null, '', '/adminfundiferro');
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname === '/adminfundiferro' || window.location.pathname.startsWith('/adminfundiferro')) {
      window.history.pushState(null, '', '/');
    } else if (window.location.hash === '#adminfundiferro' || window.location.hash === '#/adminfundiferro') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Set up an Intersection Observer to automatically highlight current section on scroll (only on home)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sectionIds = [
      'inicio',
      'produtos',
      'quem-somos',
      'galeria-projetos',
      'contato',
      'faq',
      'blog'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id === 'galeria-projetos' ? 'portfolio' : entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [currentPage]);

  // Smooth scroll & navigation helper
  const handleNavigate = (sectionId: string) => {
    if (sectionId.startsWith('produto-') || sectionId.startsWith('produtos/')) {
      const prodId = sectionId.replace('produto-', '').replace('produtos/', '');
      setSelectedProductSlug(prodId);
      setCurrentPage('produto');
      setActiveSection('produtos');
      window.location.hash = `produto-${prodId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'blog') {
      setCurrentPage('blog');
      setActiveSection('blog');
      window.location.hash = 'blog';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'quem-somos') {
      setCurrentPage('quem-somos');
      setActiveSection('quem-somos');
      window.location.hash = 'quem-somos';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'portfolio' || sectionId === 'obras') {
      setCurrentPage('portfolio');
      setActiveSection('portfolio');
      window.location.hash = 'portfolio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If we are currently on a subpage and user clicked a home section
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setActiveSection(sectionId);
      window.location.hash = sectionId === 'inicio' ? '' : sectionId;
      setTimeout(() => {
        scrollToTarget(sectionId);
      }, 100);
      setTimeout(() => {
        scrollToTarget(sectionId);
      }, 300);
      return;
    }

    // Normal on-page scroll
    setActiveSection(sectionId);
    scrollToTarget(sectionId);
  };

  const scrollToTarget = (sectionId: string) => {
    const targetMap: Record<string, string> = {
      'detalhes-tecnicos': 'faq',
      'faq-detalhe': 'faq',
      'formas-detalhe': 'produtos',
      'seguranca-detalhe': 'produtos',
      'reforma-detalhe': 'produtos',
      'acessorios-detalhe': 'produtos',
      'equipamentos-detalhe': 'produtos'
    };

    const targetId = targetMap[sectionId] || sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenContactWithProduct = (productName: string) => {
    window.dispatchEvent(
      new CustomEvent('fundiferro_prefill_contact', {
        detail: {
          itemName: productName,
          message: `Olá! Gostaria de solicitar uma proposta técnica e cotação para "${productName}". Aguardo o contato da equipe de engenharia da Fundiferro.`
        }
      })
    );
    setCurrentPage('home');
    setActiveSection('contato');
    window.location.hash = 'contato';
    setTimeout(() => {
      const el = document.getElementById('contato');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  return (
    <div className="font-sans bg-white text-gray-900 selection:bg-brand selection:text-white min-h-screen">
      {/* 1. Header Navigation */}
      <Header 
        activeSection={currentPage !== 'home' ? (currentPage === 'produto' ? 'produtos' : currentPage) : activeSection} 
        onNavigate={handleNavigate} 
        onOpenAdmin={handleOpenAdmin} 
      />

      {currentPage === 'home' && (
        <main>
          {/* 1. Hero Section */}
          <Hero onExplore={handleNavigate} />

          {/* 2. Products Portfolio Showcase (Fixed 6-Card Grid with Links to Dedicated Pages) */}
          <ProductsGrid onSelectProduct={handleNavigate} />

          {/* 3. Quem Somos / About Section (Compact Home Summary with Link to Full Page) */}
          <AboutSection onOpenAboutPage={() => handleNavigate('quem-somos')} />

          {/* 4. Project Gallery: 1 Single Row with 3 Cards + Action Button to Full Portfolio */}
          <ProjectGallery onOpenPortfolioPage={() => handleNavigate('portfolio')} />

          {/* 5. FORMULÁRIO DE CONTATO / ORÇAMENTO */}
          <ContactSection />

          {/* 6. DÚVIDAS & FAQ TÉCNICO COMPLETO */}
          <FaqSection onOpenContact={() => handleNavigate('contato')} />

          {/* 7. Home Preview: 3 Latest Blog Publications */}
          <BlogHomePreview 
            onOpenBlogPage={() => {
              setCurrentPage('blog');
              setActiveSection('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        </main>
      )}

      {currentPage === 'produto' && (
        <main>
          {/* Dedicated Full Product Page with Deep Technical Specs & Gallery */}
          <ProductPage
            productSlugOrId={selectedProductSlug}
            onBackToHome={() => {
              setCurrentPage('home');
              setActiveSection('produtos');
              window.location.hash = 'produtos';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectOtherProduct={(prodId) => {
              setSelectedProductSlug(prodId);
              window.location.hash = `produto-${prodId}`;
            }}
            onOpenContactWithProduct={handleOpenContactWithProduct}
          />
        </main>
      )}

      {currentPage === 'portfolio' && (
        <main>
          {/* Dedicated Full Portfolio / Obras Page */}
          <PortfolioPage 
            onBackToHome={() => {
              setCurrentPage('home');
              setActiveSection('inicio');
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {currentPage === 'quem-somos' && (
        <main>
          {/* Dedicated Full 'Quem Somos' Page */}
          <AboutPage 
            onBackToHome={() => {
              setCurrentPage('home');
              setActiveSection('inicio');
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSection={handleNavigate}
          />
        </main>
      )}

      {currentPage === 'blog' && (
        <main>
          {/* Dedicated Full Blog Portal Page */}
          <BlogPage 
            onBackToHome={() => {
              setCurrentPage('home');
              setActiveSection('inicio');
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        </main>
      )}

      {/* Footer Details */}
      <Footer onNavigate={handleNavigate} onOpenAdmin={handleOpenAdmin} />

      {/* Floating WhatsApp Quick Action Widget */}
      <FloatingWhatsApp />

      {/* Comprehensive Administrative Back-office CMS */}
      <AdminPanel isOpen={isAdminOpen} onClose={handleCloseAdmin} />
    </div>
  );
}
