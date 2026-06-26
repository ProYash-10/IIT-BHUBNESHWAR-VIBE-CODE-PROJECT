import { useState, useEffect, useRef } from 'react';
import { Cube16SolidIcon, ArrowTrendingUpIcon, ChartPieIcon, Cog8ToothIcon, ChevronDownIcon } from './Icons';

const bentoItems = [
  { 
    id: 1, 
    title: 'Data Ingestion', 
    content: 'Connect to any SQL, NoSQL, or API source instantly. Our smart connectors handle rate limits and retries automatically.',
    icon: (className: string) => <Cube16SolidIcon className={className} />
  },
  { 
    id: 2, 
    title: 'Real-time Processing', 
    content: 'Sub-millisecond latency for event-driven architectures. Transform data on the fly with our streaming engine.',
    icon: (className: string) => <ArrowTrendingUpIcon className={className} />
  },
  { 
    id: 3, 
    title: 'AI Insights', 
    content: 'Predictive models out of the box. Automatically detect anomalies and surface actionable business metrics.',
    icon: (className: string) => <ChartPieIcon className={className} />
  },
  { 
    id: 4, 
    title: 'Automated Workflows', 
    content: 'Drag and drop automation. Build complex directed acyclic graphs (DAGs) without writing a single line of boilerplate.',
    icon: (className: string) => <Cog8ToothIcon className={className} />
  }
];

export function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastActiveIndex = useRef<number | null>(null);
  const wasDesktop = useRef(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  // Set up resize listener to programmatic transfer index context between Desktop & Mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      
      // Transitioning from Desktop to Mobile: Lock last hovered bento-node open as accordion
      if (wasDesktop.current && !isDesktop) {
        if (lastActiveIndex.current !== null) {
          setActiveIndex(lastActiveIndex.current);
        }
      }
      
      // Transitioning from Mobile to Desktop: Clear activeIndex if not currently hovered
      if (!wasDesktop.current && isDesktop) {
        setActiveIndex(null);
      }
      
      wasDesktop.current = isDesktop;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-24 bg-nocturnal-expedition text-arctic-powder px-4 overflow-hidden scroll-mt-20" id="features">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-forsythia mb-4">
            Platform Capabilities
          </h2>
          <p className="font-sans text-mystic-mint text-lg max-w-2xl">
            Everything you need to orchestrate complex data pipelines, unified in a single architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          {bentoItems.map((item, index) => {
            const isActive = activeIndex === index;
            const isFeatured = index === 0;
            
            let desktopGridClass = 'md:col-span-1 md:row-span-1';
            if (index === 0) desktopGridClass = 'md:col-span-2 md:row-span-2';
            else if (index === 1) desktopGridClass = 'md:col-span-2 md:row-span-1';
            
            return (
              <article 
                key={item.id} 
                className={`group relative rounded-2xl border transition-all duration-[400ms] ease-in-out overflow-hidden md:cursor-default flex flex-col ${desktopGridClass} ${
                  isActive 
                    ? 'bg-oceanic-noir border-forsythia md:shadow-[0_0_30px_rgba(255,200,1,0.15)] md:scale-[1.02]' 
                    : 'bg-oceanic-noir/60 border-oceanic-noir md:hover:bg-oceanic-noir md:hover:border-mystic-mint/30'
                }`}
                onMouseEnter={() => { 
                  if (window.innerWidth >= 768) {
                    setActiveIndex(index); 
                    lastActiveIndex.current = index;
                  }
                }}
                onMouseLeave={() => { 
                  if (window.innerWidth >= 768) {
                    setActiveIndex(null); 
                  }
                }}
              >
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                  {/* Shared Header Row */}
                  <div className="flex justify-between items-start md:items-stretch md:flex-col h-full w-full">
                    
                    {/* Mobile Title + Icon */}
                    <header className="flex md:hidden w-full">
                      <button
                        className="flex justify-between items-center w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forsythia rounded-lg"
                        onClick={() => {
                          const nextState = isActive ? null : index;
                          setActiveIndex(nextState);
                          lastActiveIndex.current = nextState;
                        }}
                        aria-expanded={isActive}
                      >
                        <h3 className="font-mono font-bold text-lg flex items-center gap-3 py-1">
                          <span aria-hidden="true" className="w-6 h-6 shrink-0 text-forsythia flex items-center justify-center">{item.icon('w-6 h-6')}</span>
                          {item.title}
                        </h3>
                        <ChevronDownIcon className={`w-5 h-5 text-forsythia transform transition-transform duration-[200ms] ease-out shrink-0 ${isActive ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                    </header>

                    {/* Desktop Icon & Title */}
                    <div className="hidden md:block">
                      <div className="text-forsythia mb-6 transform transition-transform duration-[400ms] ease-out group-hover:scale-110 group-hover:-translate-y-2 origin-left shrink-0" aria-hidden="true">
                        {item.icon('w-12 h-12')}
                      </div>
                      <h3 className={`font-mono font-bold mb-4 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Content: hidden on mobile when not active, always visible on desktop */}
                    <div 
                      className={`overflow-hidden transition-all duration-[400ms] ease-in-out w-full md:max-h-none md:opacity-100 md:mt-0 md:visible ${
                        isActive ? 'max-h-64 opacity-100 mt-4 visible' : 'max-h-0 opacity-0 mt-0 invisible md:visible'
                      }`}
                    >
                      <p className={`font-sans text-mystic-mint ${isFeatured ? 'text-lg leading-relaxed md:max-w-md' : 'text-sm'}`}>
                        {item.content}
                      </p>
                      
                      {isFeatured && (
                        <div className="hidden md:block mt-auto pt-8">
                          <div className="h-2 w-24 bg-mystic-mint/20 rounded-full overflow-hidden">
                            <div className={`h-full bg-forsythia transition-all duration-[400ms] ease-in-out ${isActive ? 'w-full' : 'w-1/3'}`} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Background decorative gradient that responds to hover (Desktop only) */}
                <div 
                  className={`hidden md:block absolute inset-0 bg-gradient-to-br from-nocturnal-expedition/0 to-nocturnal-expedition/50 transition-opacity duration-[400ms] ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
