import { useEffect, useState, useRef } from 'react';
import { ArrowPathIcon, LinkIcon } from './Icons';

interface StreamLog {
  id: string;
  timestamp: string;
  source: string;
  action: string;
  latency: string;
  status: 'SUCCESS' | 'PROCESS' | 'AI_READY';
}

const SOURCES = ['PostgreSQL', 'Salesforce API', 'S3 Bucket', 'Shopify Webhook', 'Kafka Cluster', 'Fitbit Webhook'];
const ACTIONS = ['INGESTED', 'TRANSFORMED', 'PARSED', 'ENRICHED', 'COMPACTED', 'CLASSIFIED'];

export function PipelineStream() {
  const [logs, setLogs] = useState<StreamLog[]>([]);
  const [throughput, setThroughput] = useState(14820);
  const nextId = useRef(0);

  useEffect(() => {
    // Generate initial logs
    const initialLogs: StreamLog[] = Array.from({ length: 5 }).map((_, i) => {
      const date = new Date();
      return {
        id: `log-${nextId.current++}`,
        timestamp: date.toISOString().split('T')[1].slice(0, 12),
        source: SOURCES[i % SOURCES.length],
        action: ACTIONS[i % ACTIONS.length],
        latency: (Math.random() * 0.9 + 0.1).toFixed(3),
        status: i % 3 === 0 ? 'AI_READY' : 'SUCCESS'
      };
    });
    setLogs(initialLogs);

    // Keep updating the streams
    const interval = setInterval(() => {
      const date = new Date();
      const newLog: StreamLog = {
        id: `log-${nextId.current++}`,
        timestamp: date.toISOString().split('T')[1].slice(0, 12),
        source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
        action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
        latency: (Math.random() * 0.7 + 0.05).toFixed(3),
        status: Math.random() > 0.7 ? 'AI_READY' : 'SUCCESS'
      };

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      setThroughput(prev => Math.floor(prev + (Math.random() * 20 - 10)));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="pipeline" className="py-16 bg-oceanic-noir text-arctic-powder px-4 border-b border-mystic-mint/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Metric Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 w-fit rounded-full bg-deep-saffron/10 border border-deep-saffron/30 text-deep-saffron font-mono text-xs font-bold tracking-widest uppercase">
            <ArrowPathIcon className="w-3.5 h-3.5 animate-spin text-deep-saffron shrink-0" />
            Live Stream Monitor
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-forsythia mb-4 tracking-tight leading-tight">
            Real-Time Pipeline Output
          </h2>
          <p className="font-sans text-mystic-mint/80 text-base mb-6 leading-relaxed">
            Monitor streaming transactions across hundreds of disparate APIs and databases. Witness instantaneous structural ingestion without single-point failures.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nocturnal-expedition/40 p-4 rounded-xl border border-mystic-mint/10">
              <span className="font-sans text-xs text-mystic-mint/60 block">GLOBAL LATENCY</span>
              <span className="font-mono text-2xl font-bold text-forsythia">&lt; 0.82 ms</span>
            </div>
            <div className="bg-nocturnal-expedition/40 p-4 rounded-xl border border-mystic-mint/10">
              <span className="font-sans text-xs text-mystic-mint/60 block">THROUGHPUT</span>
              <span className="font-mono text-2xl font-bold text-arctic-powder">
                {throughput.toLocaleString()} <span className="text-xs text-mystic-mint">ops/s</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Code/Terminal Column */}
        <div className="lg:col-span-7 bg-black/40 border border-mystic-mint/20 rounded-2xl p-6 font-mono text-xs overflow-hidden shadow-2xl relative">
          <div className="absolute top-3 right-4 flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="text-mystic-mint/40 mb-4 border-b border-mystic-mint/10 pb-2 flex justify-between items-center">
            <span>console_monitor ~ stream_active: true</span>
            <div className="flex items-center gap-1 text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>SYNCED</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {logs.map((log, index) => (
              <div
                key={log.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] border-b pb-2 last:border-0 last:pb-0 transition-all duration-[400ms] ease-out ${
                  index === 0 
                    ? 'animate-stream-entry border-forsythia/20 py-1' 
                    : 'border-white/5'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-mystic-mint/60 flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5 text-mystic-mint/40 shrink-0" />
                    <span>[{log.timestamp}]</span>
                  </span>
                  <span className="text-forsythia font-bold">{log.source}</span>
                  <span className="text-white/40">➔</span>
                  <span className="text-arctic-powder font-semibold">{log.action}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-nocturnal-expedition text-xs px-2 py-0.5 rounded font-bold bg-mystic-mint font-sans tracking-wide">
                    {log.latency} ms
                  </span>
                  <span className={`font-bold shrink-0 ${log.status === 'AI_READY' ? 'text-deep-saffron' : 'text-green-400'}`}>
                    ● {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
