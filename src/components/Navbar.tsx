import { useState, useEffect } from 'react';
import { Menu, X, Activity, Terminal, Database, Sun, Moon } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Workflow', href: '#workflow' },
  { label: 'Monitor', href: '#pipeline' },
  { label: 'Capabilities', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Success', href: '#success' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ingestionSpeed, setIngestionSpeed] = useState(452900);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nexus-theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  // Dynamic telemetry fake speed update to make the badge feel incredibly "alive"
  useEffect(() => {
    const interval = setInterval(() => {
      setIngestionSpeed((prev) => {
        const drift = Math.floor(Math.random() * 400) - 200;
        const target = 450000 + drift;
        return Math.max(448000, Math.min(454000, target));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Simple active section observer
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      let currentActive = '';
      for (const link of NAV_LINKS) {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = link.href;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans border-b ${
          scrolled 
            ? 'bg-arctic-powder/90 backdrop-blur-md shadow-sm border-mystic-mint/80 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
        id="main-app-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand Block */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 bg-oceanic-noir text-white rounded-xl shadow-md transition-all duration-300 group-hover:bg-nocturnal-expedition group-hover:shadow-[0_0_12px_rgba(17,76,90,0.3)]">
              <Database className="w-5 h-5 text-forsythia animate-pulse" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-deep-saffron" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-black text-oceanic-noir leading-none tracking-tight">
                FLUX<span className="text-deep-saffron">A</span>
              </span>
              <span className="font-mono text-[8px] text-nocturnal-expedition/50 uppercase tracking-widest mt-0.5">
                Stream Engine
              </span>
            </div>
          </a>

          {/* Desktop Links with Active State Highlighting Underlines */}
          <div className="hidden lg:flex items-center gap-1 bg-white/40 dark:bg-oceanic-noir/30 border border-mystic-mint/35 p-1 rounded-2xl">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 ${
                    isActive 
                      ? 'text-oceanic-noir dark:text-white font-extrabold' 
                      : 'text-nocturnal-expedition/75 hover:text-oceanic-noir dark:text-mystic-mint/75 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-deep-saffron rounded-full animate-pulse" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Dynamic Status / CTA cluster */}
          <div className="flex items-center gap-3">
            {/* Live Pipeline Telemetry Status Gauge */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-white/60 border border-mystic-mint/70 rounded-xl shadow-sm text-nocturnal-expedition select-none">
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="absolute w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-75" />
              </div>
              <div className="flex flex-col font-mono text-[9px] font-bold">
                <span className="text-green-700 leading-none">✓ COMPLIANT ENGINE</span>
                <span className="text-nocturnal-expedition/60 mt-0.5 leading-none">
                  {ingestionSpeed.toLocaleString()} RX/S
                </span>
              </div>
            </div>

            {/* Two Theme Switcher Buttons side-by-side inside a gorgeous pill container */}
            <div className="flex items-center gap-1 p-1 bg-white/60 dark:bg-oceanic-noir/50 border border-mystic-mint dark:border-mystic-mint/20 rounded-xl shadow-sm">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  theme === 'light'
                    ? 'bg-oceanic-noir text-forsythia shadow-inner'
                    : 'text-nocturnal-expedition/50 dark:text-mystic-mint/40 hover:text-oceanic-noir dark:hover:text-white'
                }`}
                title="Set Light Mode"
                aria-label="Set Light Mode"
                id="theme-switcher-light"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-mystic-mint text-nocturnal-expedition dark:bg-mystic-mint/10 dark:text-white shadow-inner'
                    : 'text-nocturnal-expedition/50 dark:text-mystic-mint/40 hover:text-oceanic-noir dark:hover:text-white'
                }`}
                title="Set Dark Mode"
                aria-label="Set Dark Mode"
                id="theme-switcher-dark"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Free Trial Button (Visible sm and up) */}
            <button 
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="hidden sm:block px-4 py-2 bg-oceanic-noir hover:bg-nocturnal-expedition text-arctic-powder font-mono text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 duration-150 cursor-pointer whitespace-nowrap"
            >
              FREE TRIAL
            </button>

            {/* Mobile Menu Toggle Button (Visible below lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 lg:hidden rounded-xl border border-mystic-mint/80 bg-white/50 hover:bg-white text-oceanic-noir transition-colors focus:outline-none focus:ring-2 focus:ring-deep-saffron shadow-sm cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Glassmorphic Slide-Down Menu Panel */}
      <div 
        className={`fixed inset-0 z-30 lg:hidden bg-oceanic-noir/50 backdrop-blur-md transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 right-0 bg-arctic-powder border-b border-mystic-mint p-6 pt-24 shadow-2xl transition-transform duration-300 ease-out flex flex-col gap-4 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
           {/* Ingestion Telemetry Display inside Mobile Nav */}
          <div className="flex items-center gap-3 bg-white border border-mystic-mint/80 p-3 rounded-2xl mb-2">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="absolute w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
            </div>
            <div className="flex flex-col font-mono text-xs font-bold text-nocturnal-expedition">
              <span className="text-green-700">✓ TELEMETRY INGESTION ONLINE</span>
              <span className="text-nocturnal-expedition/50 mt-0.5">
                ACTIVE RX RATE: {ingestionSpeed.toLocaleString()} PKT/SEC
              </span>
            </div>
          </div>

          {/* Mobile Theme Switcher Duo */}
          <div className="flex items-center justify-between bg-white border border-mystic-mint/80 p-3 rounded-2xl mb-2">
            <span className="font-mono text-xs font-bold text-nocturnal-expedition">VISUAL THEME</span>
            <div className="flex items-center gap-1.5 p-1 bg-arctic-powder/50 dark:bg-oceanic-noir/50 border border-mystic-mint rounded-xl shadow-sm">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  theme === 'light'
                    ? 'bg-oceanic-noir text-forsythia shadow-inner'
                    : 'text-nocturnal-expedition/50 dark:text-mystic-mint/40 hover:text-oceanic-noir dark:hover:text-white'
                }`}
                aria-label="Set Light Theme"
                id="mobile-theme-light"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-mystic-mint text-nocturnal-expedition dark:bg-mystic-mint/10 dark:text-white shadow-inner'
                    : 'text-nocturnal-expedition/50 dark:text-mystic-mint/40 hover:text-oceanic-noir dark:hover:text-white'
                }`}
                aria-label="Set Dark Theme"
                id="mobile-theme-dark"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between p-3 rounded-xl font-mono text-sm font-bold uppercase transition-all ${
                    isActive 
                      ? 'bg-oceanic-noir text-arctic-powder shadow-md' 
                      : 'text-nocturnal-expedition/80 hover:bg-white hover:text-oceanic-noir'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-deep-saffron">\\\</span>
                </a>
              );
            })}
          </div>

          {/* CTA on mobile */}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              const element = document.getElementById('pricing');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full mt-2 py-3 bg-oceanic-noir hover:bg-nocturnal-expedition text-arctic-powder font-mono text-sm font-bold rounded-xl shadow-md text-center cursor-pointer"
          >
            START FREE TRIAL
          </button>
        </div>
      </div>
    </>
  );
}
