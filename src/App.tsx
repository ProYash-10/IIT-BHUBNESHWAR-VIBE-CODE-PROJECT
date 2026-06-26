/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BentoAccordion } from './components/BentoAccordion';
import { PricingMatrix } from './components/PricingMatrix';
import { FAQSection } from './components/FAQSection';
import { Hero3D } from './components/Hero3D';
import { SocialProof } from './components/SocialProof';
import { PipelineStream } from './components/PipelineStream';
import { SuccessCarousel } from './components/SuccessCarousel';
import { CaseStudiesDetail } from './components/CaseStudiesDetail';
import { BackToTop } from './components/BackToTop';
import { LegalOverlay } from './components/LegalOverlay';
import { Navbar } from './components/Navbar';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NotFound404 } from './components/NotFound404';
import { DocsOverlay } from './components/DocsOverlay';

export default function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'privacy' | 'compliance'>('terms');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    // Overriding pushState and replaceState to trigger re-renders
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const openLegal = (tab: 'terms' | 'privacy' | 'compliance') => {
    setActiveLegalTab(tab);
    setIsLegalOpen(true);
  };

  // Standardize the path by removing trailing slashes and checking for both root and direct index.html access
  const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '');
  const isHome = normalizedPath === '' || normalizedPath === '/' || normalizedPath === '/index.html';

  if (!isHome) {
    return <NotFound404 />;
  }

  return (
    <main className="min-h-screen bg-arctic-powder font-sans selection:bg-forsythia selection:text-nocturnal-expedition overflow-x-hidden pt-16">
      {/* Custom sticky navigation bar with fluid micro-interactions */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative py-24 px-4 text-center flex flex-col items-center justify-center min-h-[75vh] overflow-hidden">
        <Hero3D />
        
        {/* Subtle radial gradient to ensure text readability over 3D background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,246,244,0.4)_0%,rgba(241,246,244,1)_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block px-5 py-2 mb-8 rounded-full border border-mystic-mint bg-white/60 text-nocturnal-expedition font-mono text-sm font-bold tracking-widest uppercase animate-fade-in-up shadow-sm backdrop-blur-md">
            Next-Gen Data Engine
          </div>
          <h1 className="font-mono text-5xl md:text-7xl font-bold text-oceanic-noir mb-8 leading-[1.1] tracking-tight animate-fade-in-up animate-delay-100">
            Orchestrate Data <br className="hidden md:block" />
            <span className="text-deep-saffron relative inline-block group cursor-default ml-0 md:ml-4 mt-2 md:mt-0">
              Without Chaos.
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-forsythia transition-all duration-[400ms] ease-out group-hover:scale-105 group-hover:-translate-y-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="font-sans text-xl text-nocturnal-expedition/90 max-w-2xl mb-12 leading-relaxed animate-fade-in-up animate-delay-200">
            The unified platform for data ingestion, real-time processing, and AI-driven insights. Built for teams that demand sub-millisecond latency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300 w-full sm:w-auto px-4 sm:px-0">
            <button className="px-8 py-4 rounded-xl bg-oceanic-noir text-arctic-powder font-mono font-bold text-lg hover:bg-nocturnal-expedition transition-all duration-[200ms] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(17,76,90,0.2)] active:translate-y-0 w-full sm:w-auto">
              Start Free Trial
            </button>
            <button 
              onClick={() => setIsDocsOpen(true)}
              className="px-8 py-4 rounded-xl bg-white/50 border-2 border-mystic-mint text-oceanic-noir font-mono font-bold text-lg hover:bg-white transition-all duration-[200ms] hover:-translate-y-1 hover:shadow-sm active:translate-y-0 backdrop-blur-sm w-full sm:w-auto cursor-pointer"
              id="hero-read-docs-btn"
            >
              Read Documentation
            </button>
          </div>
        </div>
      </header>

      {/* Social Proof */}
      <SocialProof />

      {/* Interactive Agent Workflow Canvas */}
      <WorkflowCanvas />

      {/* Dynamic Real-time Output Pipeline Monitor */}
      <PipelineStream />

      {/* Feature 2: Bento Grid / Accordion */}
      <BentoAccordion />

      {/* Feature 1: Matrix-Driven Pricing */}
      <PricingMatrix />

      {/* Testimonials / Success Gallery Carousel */}
      <SuccessCarousel />

      {/* Deep-dive Case Studies & SLA Review Section */}
      <CaseStudiesDetail />

      {/* FAQ Section */}
      <FAQSection />
      
      {/* Back To Top Scroll Control */}
      <BackToTop />
      
      {/* Footer */}
      <footer className="bg-oceanic-noir text-mystic-mint/90 py-12 border-t border-mystic-mint/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs tracking-tight text-mystic-mint/60 text-center md:text-left">
            © 2026 Data Automation SaaS. Engineered with precision. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs">
            <button
              onClick={() => openLegal('terms')}
              className="hover:text-forsythia hover:underline transition-colors focus:outline-none cursor-pointer"
              id="footer-terms-btn"
            >
              Terms of Use
            </button>
            <span className="text-mystic-mint/20 hidden sm:inline">|</span>
            <button
              onClick={() => openLegal('privacy')}
              className="hover:text-forsythia hover:underline transition-colors focus:outline-none cursor-pointer"
              id="footer-privacy-btn"
            >
              Privacy Policy
            </button>
            <span className="text-mystic-mint/20 hidden sm:inline">|</span>
            <button
              onClick={() => openLegal('compliance')}
              className="hover:text-forsythia hover:underline transition-colors focus:outline-none cursor-pointer"
              id="footer-compliance-btn"
            >
              SLA &amp; Compliance
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Compliance, Privacy & Legal Documents Overlay */}
      <LegalOverlay 
        isOpen={isLegalOpen} 
        onClose={() => setIsLegalOpen(false)} 
        initialTab={activeLegalTab} 
      />

      {/* Interactive System Documentation Overlay */}
      <DocsOverlay 
        isOpen={isDocsOpen} 
        onClose={() => setIsDocsOpen(false)} 
      />
    </main>
  );
}

