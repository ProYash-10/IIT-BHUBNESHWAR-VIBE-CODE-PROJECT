import { useState, useEffect, useRef } from 'react';
import { 
  ArrowTrendingUpIcon, 
  Cog8ToothIcon, 
  Cube16SolidIcon, 
  ChartPieIcon, 
  LinkSolidIcon,
  ArrowPathIcon
} from './Icons';

interface CaseStudyContent {
  id: number;
  slug: string;
  company: string;
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  architecture: {
    title: string;
    steps: { label: string; detail: string; status: string }[];
  };
  metrics: { value: string; label: string; icon: 'trending' | 'pie' | 'cube' | 'cog' | 'link' }[];
  slaDetails: { standard: string; nexusData: string; parameter: string }[];
}

const CASE_STUDIES: CaseStudyContent[] = [
  {
    id: 1,
    slug: 'stacksync',
    company: 'StackSync Technologies',
    title: 'StackSync Enterprise Pipelines',
    description: 'Automating distributed data sync and eliminating up to 12 seconds of replication lag across active clouds.',
    industry: 'Cloud Infrastructure',
    challenge: 'Inefficient database polling cycles created up to 12-second replication lags, leading to out-of-sync distributed states and race conditions during high-concurrency peak hours.',
    solution: 'Replaced batch cron schedulers with an automated event-driven stream pipeline utilizing sub-millisecond change data capture (CDC) connectors.',
    architecture: {
      title: 'CDC Streaming Architecture',
      steps: [
        { label: 'DB Log Reader', detail: 'Asynchronous transactional log ingestion via pg_recvlogical.', status: 'ACTIVE' },
        { label: 'Event Transformer', detail: 'On-the-fly serialization into standardized JSON payloads.', status: 'COMPLETED' },
        { label: 'Dead-Letter Queue', detail: 'Automated fallback routing with 3x retry backing schemas.', status: 'IDLE' },
      ]
    },
    metrics: [
      { value: '+400%', label: 'Velocity Multiplier', icon: 'trending' },
      { value: '0.0ms', label: 'Idle State Latency', icon: 'cube' },
      { value: '100%', label: 'CDC Parse Success', icon: 'cog' }
    ],
    slaDetails: [
      { parameter: 'Synchronization Frequency', standard: 'Hourly Batches', nexusData: 'Instantaneous CDC Stream' },
      { parameter: 'Replication Lag Cap', standard: '15.0 seconds', nexusData: '< 0.50 seconds max' },
      { parameter: 'Conflict Resolution', standard: 'Manual Overwrite', nexusData: 'Deterministic LWW Log' }
    ]
  },
  {
    id: 2,
    slug: 'nexusdata',
    company: 'NexusData Logistics',
    title: 'NexusData High-Throughput Engine',
    description: 'Processing 450,000 telemetry sensor payloads per second with sub-millisecond edge queue constraints.',
    industry: 'Supply Chain Operations',
    challenge: 'Processing 450,000 global sensor telemetry updates per second across multiple regional APIs introduced message duplication and thread blocking issues.',
    solution: 'Deployed high-throughput edge nodes with custom non-blocking lockless ring buffers to guarantee single-pass ingestion with rigorous sub-millisecond constraints.',
    architecture: {
      title: 'Lockless Ingestion Pipeline',
      steps: [
        { label: 'Edge Telemetry Gateway', detail: 'REST/WebSocket ingestion endpoint parsing sensor payloads.', status: 'ACTIVE' },
        { label: 'Lockless Ring Buffer', detail: 'Memory-mapped ring buffer optimizing sequential disk writes.', status: 'ACTIVE' },
        { label: 'SLA Guard Controller', detail: 'Active backpressure regulator dropping or scaling workers.', status: 'STABLE' },
      ]
    },
    metrics: [
      { value: '0.05 ms', label: 'Average Latency', icon: 'trending' },
      { value: '99.99%', label: 'Single-Pass Rate', icon: 'pie' },
      { value: '450k/s', label: 'Ingested Telemetry', icon: 'cube' }
    ],
    slaDetails: [
      { parameter: 'System Latency Limit', standard: '500.0 ms SLA limit', nexusData: '0.05 ms actual average' },
      { parameter: 'Packet Drop Margin', standard: 'Max 0.1% allowance', nexusData: '0.00% packet loss guaranteed' },
      { parameter: 'Failover Response', standard: 'Within 5 minutes', nexusData: 'Instant active-active failover' }
    ]
  },
  {
    id: 3,
    slug: 'gridflow',
    company: 'GridFlow Global',
    title: 'GridFlow Webhook Integrations',
    description: 'Consolidating 40+ disparate API and transactional endpoints into an immutable global vector state checkpointer.',
    industry: 'E-commerce & SaaS',
    challenge: 'Consolidating inventory and billing data across 40+ disparate Shopify, Stripe, and internal platform webhooks created processing queue bottlenecks and out-of-order logs.',
    solution: 'Designed an automated vector routing layer that orders events globally and stores intermediate state checkpoints securely.',
    architecture: {
      title: 'Global Vector Route Mesh',
      steps: [
        { label: 'Multi-Webhook Ingest', detail: 'API proxies gathering heterogeneous webhook payloads.', status: 'ACTIVE' },
        { label: 'Logical Clock Sequencer', detail: 'Vector clocks sequencing out-of-order packets.', status: 'COMPLETED' },
        { label: 'Secure State Committer', detail: 'Transaction journal persistence for absolute audit trails.', status: 'STABLE' },
      ]
    },
    metrics: [
      { value: '99.999%', label: 'Uptime Guarantee', icon: 'pie' },
      { value: '40+', label: 'Connected APIs', icon: 'link' },
      { value: '0 error', label: 'Log Auditing Failures', icon: 'cog' }
    ],
    slaDetails: [
      { parameter: 'Multi-Source Ordering', standard: 'No ordering guarantee', nexusData: 'Guaranteed causal ordering' },
      { parameter: 'Audit Log Durability', standard: '7-day transient log', nexusData: 'Immutable write-ahead journal' },
      { parameter: 'Integration Onboarding', standard: '2-3 Weeks dev time', nexusData: 'Under 2 hours setup duration' }
    ]
  }
];

export function CaseStudiesDetail() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCaseStudySelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: number }>;
      if (customEvent.detail && typeof customEvent.detail.id === 'number') {
        setActiveId(customEvent.detail.id);
        
        // Smooth scroll to this section
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('case-study-select', handleCaseStudySelect);
    return () => window.removeEventListener('case-study-select', handleCaseStudySelect);
  }, []);

  const renderMetricIcon = (icon: string) => {
    const className = "w-5 h-5 text-deep-saffron shrink-0";
    switch (icon) {
      case 'trending': return <ArrowTrendingUpIcon className={className} />;
      case 'pie': return <ChartPieIcon className={className} />;
      case 'cube': return <Cube16SolidIcon className={className} />;
      case 'cog': return <Cog8ToothIcon className={className} />;
      default: return <LinkSolidIcon className={className} />;
    }
  };

  const toggleActive = (id: number) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef} 
      className="bg-arctic-powder text-oceanic-noir border-b border-mystic-mint/80 scroll-mt-20 font-sans select-none"
      id="case-studies"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Core Header block matching the exact Swiss-Grid image style */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-mystic-mint/80">
          <div className="col-span-12 md:col-span-8 p-8 md:p-12 md:border-r border-mystic-mint/80 flex flex-col justify-center">
            
            {/* Label \\ CASE STUDIES */}
            <div className="flex items-center gap-2 mb-6 text-nocturnal-expedition/60 font-mono text-xs font-bold tracking-widest uppercase">
              <span className="text-nocturnal-expedition/40">\\\</span>
              <span>Case Studies</span>
            </div>
            
            {/* Massive Heading */}
            <h2 className="font-sans text-4xl md:text-6xl font-normal text-oceanic-noir tracking-tight leading-[1.05] mb-6">
              Proven data<br className="hidden sm:inline" /> automation solutions
            </h2>
            
            {/* Description Paragraph */}
            <p className="font-sans text-nocturnal-expedition/80 text-base md:text-lg max-w-2xl leading-relaxed">
              We partner with industry leaders to deploy bespoke, resilient stream pipelines that solve complex high-throughput bottlenecks and drive absolute data compliance.
            </p>
          </div>
          
          {/* Side Graphic / Stats box to maintain grid alignment */}
          <div className="col-span-12 md:col-span-4 p-8 md:p-12 bg-white/40 flex flex-col justify-between">
            <span className="font-mono text-[10px] text-nocturnal-expedition/40 font-bold uppercase tracking-wider block">
              PLATFORM_CAPACITY_METER
            </span>
            <div>
              <span className="font-mono text-5xl font-light text-oceanic-noir tracking-tight block">
                99.999%
              </span>
              <span className="font-sans text-xs text-nocturnal-expedition/70 block mt-1 uppercase tracking-wider">
                System Availability SLA Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Rows list with precise Column dividers matching the image perfectly */}
        <div className="flex flex-col">
          {CASE_STUDIES.map((study) => {
            const isActive = activeId === study.id;
            return (
              <div key={study.id} className="border-b border-mystic-mint/80 last:border-b-0">
                
                {/* Main Interactive Row */}
                <div 
                  onClick={() => toggleActive(study.id)}
                  className={`grid grid-cols-1 md:grid-cols-12 items-center cursor-pointer transition-all duration-300 select-none group border-l-4 ${
                    isActive 
                      ? 'bg-white/90 border-deep-saffron' 
                      : 'hover:bg-white/40 border-transparent'
                  }`}
                >
                  
                  {/* Column 1: Custom visual logo or image thumbnail */}
                  <div className="col-span-12 md:col-span-3 p-6 md:p-8 md:border-r border-mystic-mint/80 flex items-center justify-center bg-white/20 h-full min-h-[140px]">
                    {study.slug === 'stacksync' && (
                      <div className="relative w-40 h-20 rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-950 via-neutral-900 to-zinc-900 border border-neutral-800 transition-transform group-hover:scale-105 duration-300">
                        {/* Technical grid lines background representation */}
                        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(245,158,11,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.08)_1px,transparent_1px)] bg-[size:10px_10px]" />
                        <div className="relative flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-deep-saffron animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                          <span className="font-sans font-black text-white tracking-tight text-base">Stack<span className="text-amber-500">Sync</span></span>
                        </div>
                        <span className="relative font-mono text-[8px] text-deep-saffron/80 mt-1 uppercase tracking-wider">Cloud Platforms</span>
                      </div>
                    )}
                    
                    {study.slug === 'nexusdata' && (
                      <div className="relative w-40 h-20 rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-950 via-purple-900 to-violet-950 border border-purple-500/20 transition-transform group-hover:scale-105 duration-300">
                        {/* Shimmering cosmos background stars */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] animate-pulse" />
                        <span className="relative font-sans font-semibold text-white tracking-widest text-sm uppercase">
                          nexus<span className="font-serif italic lowercase text-forsythia">data</span>
                        </span>
                        <span className="relative font-mono text-[8px] text-white/50 mt-1 uppercase tracking-widest">Global Telemetry</span>
                      </div>
                    )}
                    
                    {study.slug === 'gridflow' && (
                      <div className="relative w-40 h-20 rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center bg-gradient-to-tr from-slate-950 via-cyan-950 to-neutral-900 border border-cyan-500/25 transition-transform group-hover:scale-105 duration-300">
                        {/* Technical flow indicator background representing webhook vectors */}
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.25),transparent_60%)]" />
                        <div className="relative flex items-center gap-1">
                          <svg className="w-4 h-4 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="font-sans font-bold text-white tracking-tight text-base">Grid<span className="text-cyan-400 font-extrabold">Flow</span></span>
                        </div>
                        <span className="relative font-mono text-[8px] text-cyan-400/60 mt-1 uppercase tracking-wider">Multi-API Mesh</span>
                      </div>
                    )}
                  </div>

                  {/* Column 2: Monospace year indicator */}
                  <div className="col-span-4 md:col-span-2 p-6 md:p-8 md:border-r border-mystic-mint/80 flex items-center h-full">
                    <span className="font-mono text-sm text-nocturnal-expedition/40 font-medium">
                      //2026
                    </span>
                  </div>

                  {/* Column 3: Title and concise description */}
                  <div className="col-span-8 md:col-span-6 p-6 md:p-8 md:border-r border-mystic-mint/80 flex flex-col justify-center h-full">
                    <h3 className="font-sans text-xl font-semibold text-oceanic-noir leading-tight mb-2">
                      {study.title}
                    </h3>
                    <p className="font-sans text-nocturnal-expedition/80 text-sm leading-relaxed max-w-xl">
                      {study.description}
                    </p>
                  </div>

                  {/* Column 4: Double arrow indicator pointed right, rotating when expanded */}
                  <div className="col-span-12 md:col-span-1 p-6 md:p-8 flex items-center justify-center md:justify-end">
                    <span className={`text-nocturnal-expedition/40 font-mono text-lg font-bold transition-all duration-300 group-hover:text-deep-saffron ${
                      isActive ? 'rotate-90 text-deep-saffron scale-110' : 'group-hover:translate-x-1'
                    }`}>
                      &gt;&gt;
                    </span>
                  </div>

                </div>

                {/* Expanded Grid Drawer presenting deep technical specifications inside the Swiss theme */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isActive ? 'max-h-[1400px] opacity-100 border-t border-mystic-mint/80' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <div className="bg-white p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-l-4 border-deep-saffron">
                    
                    {/* Left Column: Challenge & Implemented Automation */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                      
                      {/* Detailed Challenge & Automation Block */}
                      <div className="bg-arctic-powder/60 border border-mystic-mint/60 rounded-3xl p-6 md:p-8">
                        <span className="font-mono text-xs text-deep-saffron font-bold tracking-wider uppercase block mb-3">
                          01 // Operational Challenge
                        </span>
                        <p className="font-sans text-nocturnal-expedition text-base leading-relaxed mb-6">
                          {study.challenge}
                        </p>
                        
                        <div className="h-px bg-mystic-mint/60 my-6" />
                        
                        <span className="font-mono text-xs text-nocturnal-expedition/60 font-bold tracking-wider uppercase block mb-3">
                          02 // Implemented Automation
                        </span>
                        <p className="font-sans text-nocturnal-expedition/80 text-base leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      {/* Performance Metrics Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {study.metrics.map((m, idx) => (
                          <div key={idx} className="bg-arctic-powder/60 border border-mystic-mint/60 rounded-2xl p-5 flex flex-col justify-between hover:border-deep-saffron/40 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-mono text-[10px] text-nocturnal-expedition/40 font-bold uppercase">
                                STAT_METER_0{idx + 1}
                              </span>
                              {renderMetricIcon(m.icon)}
                            </div>
                            <div>
                              <span className="font-sans text-3xl font-bold text-oceanic-noir block tracking-tight">
                                {m.value}
                              </span>
                              <span className="font-sans text-xs text-nocturnal-expedition/60 block mt-1 leading-snug">
                                {m.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Right Column: SLA Audit Table & Network Topology */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      
                      {/* SLA Audit Side-by-Side Comparison */}
                      <div className="bg-arctic-powder/60 border border-mystic-mint/60 rounded-3xl p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-xs text-nocturnal-expedition/80 font-bold tracking-wider uppercase">
                              SLA Benchmark Audit
                            </span>
                            <span className="text-[9px] font-mono text-green-700 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded uppercase font-bold">
                              Verified Compliant
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-4">
                            {study.slaDetails.map((detail, index) => (
                              <div key={index} className="flex flex-col gap-1 border-b border-mystic-mint/60 pb-3 last:border-0 last:pb-0">
                                <span className="font-sans text-[11px] font-bold text-nocturnal-expedition/70 uppercase tracking-wider">
                                  {detail.parameter}
                                </span>
                                <div className="grid grid-cols-2 gap-4 text-xs font-mono mt-1">
                                  <div>
                                    <span className="text-nocturnal-expedition/40 block text-[9px] uppercase tracking-wider">Market Standard</span>
                                    <span className="text-nocturnal-expedition/50 line-through decoration-red-400/60">{detail.standard}</span>
                                  </div>
                                  <div>
                                    <span className="text-deep-saffron block text-[9px] uppercase tracking-wider font-semibold">Active Engine</span>
                                    <span className="text-oceanic-noir font-bold">{detail.nexusData}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Network Topology Stream Status Block */}
                        <div className="bg-white border border-mystic-mint/60 p-4 rounded-2xl mt-6">
                          <span className="font-mono text-[9px] text-nocturnal-expedition/40 block mb-3 uppercase tracking-wider">
                            Active Stream Topology Status
                          </span>
                          <div className="flex flex-col gap-2 font-mono text-[11px]">
                            {study.architecture.steps.map((step, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white/60 px-3 py-2 rounded-lg border border-mystic-mint/40">
                                <span className="flex items-center gap-2">
                                  <span className="text-deep-saffron font-bold">0{idx + 1} //</span>
                                  <span className="text-oceanic-noir font-medium">{step.label}</span>
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                  step.status === 'ACTIVE' ? 'bg-green-500/10 text-green-700 border border-green-500/20' :
                                  step.status === 'STABLE' ? 'bg-deep-saffron/10 text-deep-saffron border border-deep-saffron/20' :
                                  step.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-700 border border-blue-500/20' :
                                  'bg-mystic-mint/40 text-nocturnal-expedition/60'
                                }`}>
                                  {step.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
