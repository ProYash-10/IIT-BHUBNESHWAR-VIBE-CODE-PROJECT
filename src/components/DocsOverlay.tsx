import { useState, useEffect } from 'react';
import { X, Copy, Check, Search, BookOpen, Code, Terminal, Cpu, Network, Activity } from 'lucide-react';

interface DocsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type DocSection = 'quickstart' | 'telemetry' | 'api';

export function DocsOverlay({ isOpen, onClose }: DocsOverlayProps) {
  const [activeSection, setActiveSection] = useState<DocSection>('quickstart');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const codeSnippets = {
    curlTrigger: `curl -X POST "https://api.fluxa.io/v1/pipelines/trigger" \\
  -H "Authorization: Bearer $FLUXA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pipelineId": "pl-ingress-telemetry-09x",
    "payload": { "device_id": "sensor_992", "metric": "temperature", "val": 42.1 },
    "priority": "HIGH_SLA"
  }'`,
    nodeSnippet: `import { FluxaEngine } from '@fluxa/sdk';

const engine = new FluxaEngine({
  apiKey: process.env.FLUXA_API_KEY,
  region: 'us-east4'
});

// Create a real-time ingestion stream listener
const stream = engine.pipelines.get('pl-ingress-telemetry-09x');
stream.on('data', (payload) => {
  console.log(\`[SLA telemetry] Sub-millisecond latency payload: \`, payload);
});

await stream.start();`,
    pythonSnippet: `import fluxa_sdk

client = fluxa_sdk.Client(api_key="your_api_key_here")

# Trigger pipeline execution asynchronously
response = client.pipelines.trigger(
    id="pl-ingress-telemetry-09x",
    payload={"device_id": "sensor_992", "status": "ACTIVE"},
    priority="HIGH_SLA"
)
print(f"Workflow triggered. Execution ID: {response.execution_id}")`
  };

  const sections = [
    { id: 'quickstart', label: '01 // QUICKSTART', icon: BookOpen },
    { id: 'telemetry', label: '02 // REAL-TIME METRICS', icon: Activity },
    { id: 'api', label: '03 // API REFERENCE', icon: Code }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oceanic-noir/85 backdrop-blur-md transition-opacity duration-300">
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-nocturnal-expedition border border-mystic-mint/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-oceanic-noir dark:text-white font-sans"
        id="docs-modal-container"
      >
        {/* Header Section */}
        <div className="border-b border-mystic-mint/60 p-6 md:p-8 shrink-0 bg-arctic-powder dark:bg-oceanic-noir">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-nocturnal-expedition/60 dark:text-mystic-mint/60 font-mono text-[10px] font-bold tracking-widest uppercase">
                <span>///</span>
                <span>FLUXA ENGINE SYSTEMS DOCUMENTATION</span>
              </div>
              <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-oceanic-noir dark:text-white">
                Developer Documentation Portal
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white dark:bg-nocturnal-expedition border border-mystic-mint/80 hover:bg-mystic-mint/10 dark:hover:bg-mystic-mint/20 text-oceanic-noir dark:text-white font-mono text-xs font-bold transition-all duration-150 cursor-pointer text-center"
              aria-label="Close documentation overlay"
              id="docs-modal-close"
            >
              [ ESC // CLOSE ]
            </button>
          </div>

          {/* Docs Search & Filter bar */}
          <div className="relative mt-6 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-nocturnal-expedition/40 dark:text-mystic-mint/50" />
            <input
              type="text"
              placeholder="Search guides, code snippets, endpoint parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-mystic-mint/60 bg-white/55 dark:bg-nocturnal-expedition/55 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-deep-saffron dark:focus:ring-forsythia/60 text-oceanic-noir dark:text-white placeholder-nocturnal-expedition/40 dark:placeholder-mystic-mint/40"
            />
          </div>
        </div>

        {/* Content Layout with Sidebar + Main Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white dark:bg-nocturnal-expedition">
          {/* Documentation Sidebar */}
          <aside className="w-full md:w-64 border-r border-mystic-mint/50 bg-arctic-powder/45 dark:bg-oceanic-noir/40 p-4 flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-y-auto scrollbar-none">
            {sections.map((sec) => {
              const IconComponent = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id as DocSection)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs font-bold transition-all duration-150 whitespace-nowrap text-left ${
                    activeSection === sec.id
                      ? 'bg-oceanic-noir dark:bg-mystic-mint text-arctic-powder dark:text-forsythia shadow-md scale-[1.01]'
                      : 'text-nocturnal-expedition/70 dark:text-mystic-mint/70 hover:text-oceanic-noir dark:hover:text-white hover:bg-mystic-mint/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 overflow-y-auto p-6 md:p-10">
            {activeSection === 'quickstart' && (
              <div className="space-y-8 max-w-3xl animate-fade-in-up">
                <div>
                  <h3 className="text-xl font-bold text-oceanic-noir dark:text-white mb-2 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-deep-saffron dark:text-forsythia" />
                    Quickstart Guide
                  </h3>
                  <p className="text-sm md:text-base text-nocturnal-expedition/80 dark:text-mystic-mint/80 leading-relaxed">
                    Integrate your data pipeline with the Fluxa sub-millisecond execution engine in less than 3 minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-mystic-mint/40 bg-arctic-powder/20 dark:bg-oceanic-noir/20 rounded-2xl p-5">
                    <span className="font-mono text-xs text-deep-saffron dark:text-forsythia font-bold block mb-2">STEP 1: GET DEV KEYS</span>
                    <p className="text-sm text-nocturnal-expedition/80 dark:text-mystic-mint/80 mb-3">
                      Generate your credentials directly inside your developer portal settings. Keep this key secure as it bypasses rate limits.
                    </p>
                  </div>

                  <div className="border border-mystic-mint/40 bg-arctic-powder/20 dark:bg-oceanic-noir/20 rounded-2xl p-5">
                    <span className="font-mono text-xs text-deep-saffron dark:text-forsythia font-bold block mb-2">STEP 2: PIPELINE INITIALIZATION</span>
                    <p className="text-sm text-nocturnal-expedition/80 dark:text-mystic-mint/80 mb-4">
                      Install our SDK and feed the secure key. Read real-time telemetry variables seamlessly.
                    </p>
                    
                    {/* Code block with copy action */}
                    <div className="relative font-mono text-xs bg-oceanic-noir text-arctic-powder rounded-xl p-4 overflow-x-auto border border-mystic-mint/40 shadow-inner">
                      <button 
                        onClick={() => copyToClipboard(codeSnippets.nodeSnippet, 'node-snippet')}
                        className="absolute right-3 top-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedId === 'node-snippet' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <pre className="pr-10">{codeSnippets.nodeSnippet}</pre>
                    </div>
                  </div>

                  <div className="border border-mystic-mint/40 bg-arctic-powder/20 dark:bg-oceanic-noir/20 rounded-2xl p-5">
                    <span className="font-mono text-xs text-deep-saffron dark:text-forsythia font-bold block mb-2">STEP 3: STREAM TRIGGER</span>
                    <p className="text-sm text-nocturnal-expedition/80 dark:text-mystic-mint/80 mb-4">
                      Leverage our lightweight SDK client or straight REST API to pump data payloads under 1ms.
                    </p>
                    
                    {/* Python SDK snippet */}
                    <div className="relative font-mono text-xs bg-oceanic-noir text-arctic-powder rounded-xl p-4 overflow-x-auto border border-mystic-mint/40 shadow-inner">
                      <button 
                        onClick={() => copyToClipboard(codeSnippets.pythonSnippet, 'python-snippet')}
                        className="absolute right-3 top-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedId === 'python-snippet' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <pre className="pr-10">{codeSnippets.pythonSnippet}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'telemetry' && (
              <div className="space-y-8 max-w-3xl animate-fade-in-up">
                <div>
                  <h3 className="text-xl font-bold text-oceanic-noir dark:text-white mb-2 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-deep-saffron dark:text-forsythia" />
                    SLA &amp; Telemetry Logs
                  </h3>
                  <p className="text-sm md:text-base text-nocturnal-expedition/80 dark:text-mystic-mint/80 leading-relaxed">
                    Review specifications for live telemetry metrics, log ingestion rates, and guaranteed system latencies.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border-b border-mystic-mint/30">
                    <div>
                      <span className="font-semibold block text-sm">Guaranteed Execution SLA</span>
                      <span className="text-xs text-nocturnal-expedition/60 dark:text-mystic-mint/60">Maximum latency guaranteed by our enterprise SLA policy.</span>
                    </div>
                    <span className="font-mono text-sm text-deep-saffron dark:text-forsythia font-bold">&lt; 1.5ms</span>
                  </div>

                  <div className="flex justify-between items-center p-4 border-b border-mystic-mint/30">
                    <div>
                      <span className="font-semibold block text-sm">Ingestion Pipeline Throttle</span>
                      <span className="text-xs text-nocturnal-expedition/60 dark:text-mystic-mint/60">Standard developer account limits before dynamic scale takes over.</span>
                    </div>
                    <span className="font-mono text-sm text-deep-saffron dark:text-forsythia font-bold">500,000 req/sec</span>
                  </div>

                  <div className="flex justify-between items-center p-4 border-b border-mystic-mint/30">
                    <div>
                      <span className="font-semibold block text-sm">WebSocket Sync Speed</span>
                      <span className="text-xs text-nocturnal-expedition/60 dark:text-mystic-mint/60">Push intervals for analytics dashboard sync states.</span>
                    </div>
                    <span className="font-mono text-sm text-deep-saffron dark:text-forsythia font-bold">Real-time / Instant</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-8 max-w-3xl animate-fade-in-up">
                <div>
                  <h3 className="text-xl font-bold text-oceanic-noir dark:text-white mb-2 flex items-center gap-2">
                    <Code className="w-5 h-5 text-deep-saffron dark:text-forsythia" />
                    API Reference Endpoint
                  </h3>
                  <p className="text-sm md:text-base text-nocturnal-expedition/80 dark:text-mystic-mint/80 leading-relaxed">
                    Our API endpoint specifications to manage workflows programmatically.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="border border-mystic-mint/50 rounded-2xl overflow-hidden">
                    <div className="bg-arctic-powder dark:bg-oceanic-noir px-5 py-3 border-b border-mystic-mint/50 flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 bg-green-500 text-white font-mono text-[10px] font-bold rounded">POST</span>
                        <code className="font-mono text-xs font-semibold text-oceanic-noir dark:text-white">/v1/pipelines/trigger</code>
                      </div>
                      <span className="font-mono text-[10px] text-nocturnal-expedition/60 dark:text-mystic-mint/60">RATE LIMIT: 5K/MIN</span>
                    </div>

                    <div className="p-5 space-y-4">
                      <p className="text-xs text-nocturnal-expedition/80 dark:text-mystic-mint/80 leading-relaxed">
                        Manually trigger the ingestion processing engine. Overriding rules and metadata parameters can be added directly inside your JSON payload data request.
                      </p>

                      <div className="relative font-mono text-xs bg-oceanic-noir text-arctic-powder rounded-xl p-4 overflow-x-auto border border-mystic-mint/40 shadow-inner">
                        <button 
                          onClick={() => copyToClipboard(codeSnippets.curlTrigger, 'curl-trigger')}
                          className="absolute right-3 top-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                          title="Copy payload code"
                        >
                          {copiedId === 'curl-trigger' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <pre className="pr-10">{codeSnippets.curlTrigger}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Footer/SLA disclaimer */}
        <div className="border-t border-mystic-mint/60 p-5 bg-arctic-powder dark:bg-oceanic-noir shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[10px] text-nocturnal-expedition/60 dark:text-mystic-mint/60 uppercase tracking-widest">
              SYSTEMS: ALL RUNNING FINE // DEPLOY STATUS: ONLINE
            </span>
          </div>
          <p className="font-mono text-[10px] text-nocturnal-expedition/50 dark:text-mystic-mint/50 text-right uppercase">
            SLA COMPLIANCE VERIFICATION: SOC-2 TYPE II
          </p>
        </div>
      </div>
    </div>
  );
}
