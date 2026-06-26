import {
  Mail,
  PenLine,
  Zap,
  Code,
  Send,
  GitBranch,
  Plus,
  Undo2,
  Redo2,
  Sparkles,
  Music,
  Network,
  FileText,
  Shield,
  Server,
  Bot,
  MessageSquare,
  Layers,
  TerminalSquare
} from 'lucide-react';

const CanvasNode = ({
  icon: Icon,
  title,
  subtitle,
  x,
  y,
  hasInput = true,
  hasOutput = true,
  active = false,
}: {
  icon: any;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  hasInput?: boolean;
  hasOutput?: boolean;
  active?: boolean;
}) => (
  <div
    className={`absolute flex items-center gap-3 p-3 rounded-lg border ${
      active
        ? 'border-forsythia bg-nocturnal-expedition shadow-[0_0_20px_rgba(255,200,1,0.15)]'
        : 'border-mystic-mint/20 bg-oceanic-noir'
    } z-10 w-[200px]`}
    style={{ left: x, top: y }}
  >
    <div
      className={`w-8 h-8 rounded ${
        active ? 'bg-forsythia text-oceanic-noir' : 'bg-arctic-powder text-oceanic-noir'
      } flex items-center justify-center shrink-0`}
    >
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col overflow-hidden">
      <span className="text-arctic-powder text-xs font-bold font-mono truncate">{title}</span>
      <span className="text-mystic-mint/60 text-[10px] font-mono truncate">{subtitle}</span>
    </div>
    {hasInput && (
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-oceanic-noir border-2 border-mystic-mint/50 rounded-full" />
    )}
    {hasOutput && (
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-oceanic-noir border-2 border-mystic-mint/50 rounded-full" />
    )}
  </div>
);

const EdgeLabel = ({ x, y, text }: { x: number; y: number; text: string }) => (
  <div
    className="absolute text-[9px] text-mystic-mint/60 font-mono bg-nocturnal-expedition px-1 z-10"
    style={{ left: x, top: y }}
  >
    {text}
  </div>
);

export function WorkflowCanvas() {
  return (
    <section className="bg-oceanic-noir py-24 border-y border-mystic-mint/20 overflow-hidden scroll-mt-20" id="workflow">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Canvas Application Window */}
        <div className="relative border border-mystic-mint/20 rounded-xl overflow-hidden bg-oceanic-noir flex flex-col md:flex-row h-[600px] shadow-2xl">
          
          {/* Left Sidebar (Desktop Only) */}
          <div className="w-64 border-r border-mystic-mint/20 bg-oceanic-noir/50 p-4 flex-col relative hidden lg:flex">
            {/* Decorative vertical dashes */}
            <div className="absolute left-2 top-4 bottom-4 w-px bg-[linear-gradient(to_bottom,rgba(217,232,226,0.2)_50%,transparent_50%)] bg-[length:1px_8px]" />

            <div className="pl-4 flex flex-col gap-8 h-full">
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center py-2 px-4 bg-arctic-powder text-oceanic-noir font-mono text-xs font-bold rounded-sm w-full">
                  AI AGENT
                </button>
                <button className="flex items-center justify-center py-2 px-4 text-mystic-mint/60 font-mono text-xs font-bold rounded-sm border border-mystic-mint/20 w-full hover:bg-mystic-mint/10 relative transition-colors">
                  AI CHAT
                  <div className="absolute -right-2 -top-2 bg-nocturnal-expedition text-arctic-powder text-[9px] px-2 py-0.5 rounded-full border border-mystic-mint/30 shadow-xl">
                    You
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-mystic-mint/60 text-[10px] font-mono font-bold tracking-widest">
                  STACK
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[Bot, Sparkles, MessageSquare, TerminalSquare, Layers, Plus].map((StackIcon, i) => (
                    <div
                      key={i}
                      className="aspect-square border border-mystic-mint/20 rounded flex items-center justify-center text-mystic-mint/60 hover:bg-mystic-mint/10 hover:text-arctic-powder transition-colors cursor-pointer"
                    >
                      <StackIcon size={16} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-end">
                <div className="w-full flex items-center gap-2">
                  <span className="text-mystic-mint/60 text-[10px] font-mono font-bold">AUTO</span>
                  <div className="flex-1 h-1.5 bg-[repeating-linear-gradient(45deg,rgba(217,232,226,0.2),rgba(217,232,226,0.2)_4px,transparent_4px,transparent_8px)] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 relative overflow-x-auto overflow-y-hidden bg-nocturnal-expedition">
            <div className="min-w-[1400px] h-full relative">
              
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(217,232,226,0.07)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Topbar Controls */}
              <div className="absolute top-4 left-6 flex items-center gap-4 z-20">
                <div className="flex border border-mystic-mint/20 rounded bg-oceanic-noir/80">
                  <button className="p-2 border-r border-mystic-mint/20 text-mystic-mint/60 hover:text-arctic-powder transition-colors">
                    <Undo2 size={14} />
                  </button>
                  <button className="p-2 text-mystic-mint/60 hover:text-arctic-powder transition-colors">
                    <Redo2 size={14} />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-mystic-mint/20 rounded bg-oceanic-noir/80 text-mystic-mint/80 font-mono text-[10px] font-bold hover:bg-mystic-mint/10 transition-colors">
                  AGENT MODE <Sparkles size={12} />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-mystic-mint/20 rounded bg-oceanic-noir/80 text-mystic-mint/80 font-mono text-[10px] font-bold hover:bg-mystic-mint/10 transition-colors">
                  UNTITLED <Music size={12} />
                </button>
              </div>

              {/* Animated Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <style>{`
                  @keyframes flow-dash {
                    to { stroke-dashoffset: -24; }
                  }
                  .path-flow {
                    animation: flow-dash 1.5s linear infinite;
                  }
                `}</style>
                <g stroke="#D9E8E2" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 4" fill="none" strokeLinejoin="round" className="path-flow">
                  {/* N1 to N2 */}
                  <path d="M 300 130 L 360 130" />
                  {/* N2 to N3 */}
                  <path d="M 560 130 L 620 130" />
                  {/* N3 to N4 */}
                  <path d="M 820 130 L 880 130" />
                  {/* N4 to N5 */}
                  <path d="M 1080 130 L 1140 130" />
                  {/* N2 to N6 (Branch down) */}
                  <path d="M 560 130 L 590 130 L 590 330 L 620 330" />
                  {/* N6 to N7 */}
                  <path d="M 820 330 L 880 330" />
                  {/* N7 to N8 */}
                  <path d="M 1080 330 L 1140 330" />
                  {/* N5 Loop back to N6 */}
                  <path d="M 1340 130 L 1370 130 L 1370 420 L 590 420 L 590 330" />
                </g>
              </svg>

              {/* Edge Labels */}
              <EdgeLabel x={315} y={118} text="1 item" />
              <EdgeLabel x={575} y={118} text="1 item" />
              <EdgeLabel x={835} y={118} text="1 item" />
              <EdgeLabel x={1095} y={118} text="1 item" />

              {/* Nodes */}
              <CanvasNode icon={Mail} title="Email Trigger" subtitle="(IMAP)" x={100} y={100} hasInput={false} />
              <CanvasNode icon={PenLine} title="Edit Fields" subtitle="Manual" x={360} y={100} />
              <CanvasNode icon={Zap} title="AI Agent" subtitle="Tools Agent" x={620} y={100} active={true} />
              <CanvasNode icon={Code} title="Code" subtitle="Execute" x={880} y={100} />
              <CanvasNode icon={PenLine} title="Edit Fields 1" subtitle="Manual" x={1140} y={100} />
              
              <CanvasNode icon={Send} title="Telegram" subtitle="sendAndWait message" x={620} y={300} />
              <CanvasNode icon={GitBranch} title="If" subtitle="Condition" x={880} y={300} />
              <CanvasNode icon={Mail} title="Send Email" subtitle="Send" x={1140} y={300} />

              {/* Floating Add Button next to Send Email */}
              <div 
                className="absolute flex items-center justify-center w-5 h-5 rounded-full border border-mystic-mint/40 text-mystic-mint/60 bg-nocturnal-expedition cursor-pointer hover:bg-arctic-powder hover:text-oceanic-noir transition-colors" 
                style={{ left: 1360, top: 320 }}
              >
                <Plus size={12} />
              </div>

            </div>
          </div>
        </div>

        {/* Feature Grid Below Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 pt-8">
          <div className="flex flex-col gap-4">
            <Network className="text-arctic-powder w-8 h-8 opacity-80" strokeWidth={1.5} />
            <h4 className="text-arctic-powder font-mono text-base font-bold">Infinite Visual<br />Canvas</h4>
            <p className="text-mystic-mint/60 text-sm font-sans leading-relaxed">
              Map out multi-step agent behaviors on a high-performance visual grid without constraints.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <FileText className="text-arctic-powder w-8 h-8 opacity-80" strokeWidth={1.5} />
            <h4 className="text-arctic-powder font-mono text-base font-bold">Autonomous<br />Execution</h4>
            <p className="text-mystic-mint/60 text-sm font-sans leading-relaxed">
              Run complex decision trees without manual intervention or babysitting.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Shield className="text-arctic-powder w-8 h-8 opacity-80" strokeWidth={1.5} />
            <h4 className="text-arctic-powder font-mono text-base font-bold">End-to-End<br />Encryption</h4>
            <p className="text-mystic-mint/60 text-sm font-sans leading-relaxed">
              Every node and data transfer is shielded by industrial-grade security partitions.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Server className="text-arctic-powder w-8 h-8 opacity-80" strokeWidth={1.5} />
            <h4 className="text-arctic-powder font-mono text-base font-bold">Production-Ready<br />Stack</h4>
            <p className="text-mystic-mint/60 text-sm font-sans leading-relaxed">
              Connect core business platforms and internal APIs seamlessly out of the box.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
