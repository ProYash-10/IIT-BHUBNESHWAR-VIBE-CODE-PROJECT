export function SocialProof() {
  return (
    <section className="py-12 border-y border-mystic-mint/30 bg-white" aria-label="Social Proof">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-mono text-xs font-bold text-nocturnal-expedition/60 tracking-widest uppercase mb-8">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-[400ms] ease-in-out">
          {/* Faux Company Logos using standard SVG paths */}
          <div className="flex items-center gap-2 font-mono font-bold text-xl text-oceanic-noir">
            <svg className="w-8 h-8 text-deep-saffron" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            StackSync
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-xl text-oceanic-noir">
            <svg className="w-8 h-8 text-nocturnal-expedition" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            NexusData
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-xl text-oceanic-noir">
            <svg className="w-8 h-8 text-forsythia" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            GridFlow
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-xl text-oceanic-noir">
            <svg className="w-8 h-8 text-oceanic-noir" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 22 22 2 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
            </svg>
            Vertex
          </div>
        </div>
      </div>
    </section>
  );
}
