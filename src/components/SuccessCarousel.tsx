import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, LinkSolidIcon } from './Icons';

interface SuccessStory {
  id: number;
  company: string;
  metric: string;
  metricLabel: string;
  industry: string;
  quote: string;
  author: string;
  role: string;
  linkText: string;
}

const STORIES: SuccessStory[] = [
  {
    id: 1,
    company: 'StackSync Technologies',
    metric: '+400%',
    metricLabel: 'Pipeline Velocity Increase',
    industry: 'Cloud Infrastructure',
    quote: 'Implementing this automated flow has completely transformed how our system syncs database states. Our team is shipping features faster with absolutely zero lag.',
    author: 'Sarah Jenkins',
    role: 'VP of Data Platforms',
    linkText: 'Read stacksync case study'
  },
  {
    id: 2,
    company: 'NexusData Logistics',
    metric: '0.05 ms',
    metricLabel: 'Average Engine Latency',
    industry: 'Supply Chain Operations',
    quote: 'We operate at hundreds of millions of events per second. Having a robust, single-point ingestion system with sub-millisecond reliability is non-negotiable.',
    author: 'David Chen',
    role: 'Principal Architect',
    linkText: 'Read nexusdata SLA review'
  },
  {
    id: 3,
    company: 'GridFlow Global',
    metric: '99.999%',
    metricLabel: 'Automated Ingestion SLA',
    industry: 'E-commerce & SaaS',
    quote: 'We connected all our external platforms within two afternoons. Our billing and customer data pipelines have never been more reliable.',
    author: 'Elena Rostova',
    role: 'Director of Technology',
    linkText: 'View gridflow architecture'
  }
];

export function SuccessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 350);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 350);
  };

  const currentStory = STORIES[activeIndex];

  return (
    <section className="py-24 bg-nocturnal-expedition text-arctic-powder border-b border-mystic-mint/10 scroll-mt-20" id="success">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-mystic-mint/10 border border-mystic-mint/30 text-mystic-mint font-mono text-xs font-bold tracking-widest uppercase">
            Proven Performance
          </div>
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-forsythia mb-4">
            Customer Success Stories
          </h2>
          <p className="font-sans text-mystic-mint/80 text-lg max-w-2xl mx-auto">
            See how enterprise platforms leverage our real-time synchronization engine to deliver microsecond performance at scale.
          </p>
        </header>

        {/* Carousel Visual Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Main Slide Card */}
          <div className="bg-oceanic-noir border border-mystic-mint/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative min-h-[400px] flex flex-col justify-between">
            
            {/* Transition Fade wrapper */}
            <div className={`transition-opacity duration-300 flex flex-col md:flex-row gap-8 items-center h-full ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              
              {/* Massive Metric Column */}
              <div className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-left border-b md:border-b-0 md:border-r border-mystic-mint/10 pb-6 md:pb-0 md:pr-8">
                <span className="font-sans text-xs text-mystic-mint/50 font-bold uppercase tracking-wider block mb-1">
                  {currentStory.industry}
                </span>
                <span className="font-mono text-5xl md:text-6xl font-black text-forsythia tracking-tight leading-none block my-2">
                  {currentStory.metric}
                </span>
                <span className="font-sans text-sm text-arctic-powder/70 block leading-tight">
                  {currentStory.metricLabel}
                </span>
              </div>

              {/* Quote & Author Column */}
              <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
                <div>
                  <blockquote className="font-sans text-lg md:text-xl text-mystic-mint italic leading-relaxed mb-6">
                    "{currentStory.quote}"
                  </blockquote>
                  <div className="mb-6">
                    <cite className="font-mono text-base font-bold text-arctic-powder not-italic block">
                      {currentStory.author}
                    </cite>
                    <span className="font-sans text-xs text-mystic-mint/60 block">
                      {currentStory.role} — <span className="text-forsythia">{currentStory.company}</span>
                    </span>
                  </div>
                </div>

                {/* Case Study Link using link-solid.svg */}
                <a
                  href="#case-studies"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent('case-study-select', { detail: { id: currentStory.id } })
                    );
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-forsythia hover:text-deep-saffron transition-colors group/link mt-auto"
                >
                  <LinkSolidIcon className="w-4 h-4 shrink-0 transition-transform group-hover/link:scale-110" />
                  <span className="uppercase tracking-widest underline underline-offset-4">
                    {currentStory.linkText}
                  </span>
                </a>
              </div>

            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-8 md:mt-12 border-t border-white/5 pt-6">
              {STORIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (activeIndex === idx) return;
                    setIsTransitioning(true);
                    setActiveIndex(idx);
                    setTimeout(() => setIsTransitioning(false), 300);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    idx === activeIndex ? 'w-8 bg-forsythia' : 'w-2 bg-mystic-mint/20 hover:bg-mystic-mint/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Navigation Controls on sides */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-oceanic-noir hover:bg-black/40 border border-mystic-mint/30 flex items-center justify-center text-forsythia hover:text-deep-saffron transition-all focus:outline-none focus:ring-2 focus:ring-forsythia shadow-lg"
              aria-label="Previous story"
            >
              <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-oceanic-noir hover:bg-black/40 border border-mystic-mint/30 flex items-center justify-center text-forsythia hover:text-deep-saffron transition-all focus:outline-none focus:ring-2 focus:ring-forsythia shadow-lg"
              aria-label="Next story"
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
