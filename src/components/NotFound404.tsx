import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NotFound404() {
  const [glitchText, setGlitchText] = useState('NOT_FOUND');
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        let glitched = '';
        for (let i = 0; i < 9; i++) {
          glitched += Math.random() > 0.5 ? 'NOT_FOUND'[i] : chars[Math.floor(Math.random() * chars.length)];
        }
        setGlitchText(glitched);
        setTimeout(() => setGlitchText('NOT_FOUND'), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-arctic-powder font-sans selection:bg-forsythia selection:text-nocturnal-expedition flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystic-mint/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forsythia/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Main 404 Card matching the theme's aesthetic */}
        <div className="bg-white/80 backdrop-blur-md border border-mystic-mint/60 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(17,76,90,0.05)] text-center">
          
          <div className="flex justify-center mb-8">
            <div className="relative flex items-center justify-center w-16 h-16 bg-oceanic-noir text-white rounded-2xl shadow-md">
              <span className="font-mono text-xl font-black text-forsythia animate-pulse">404</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-deep-saffron" />
            </div>
          </div>

          <h1 className="font-mono text-4xl md:text-5xl font-bold text-oceanic-noir tracking-tighter mb-4 uppercase">
            {glitchText}
          </h1>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-nocturnal-expedition/5 border border-mystic-mint/40 rounded-xl mb-8 font-mono text-xs text-nocturnal-expedition/60">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>ERR_CODE: NEXUS_ROUTING_FAILURE</span>
          </div>

          <p className="font-sans text-nocturnal-expedition/80 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The data pipeline you are trying to access does not exist or has been rerouted. Please verify the destination.
          </p>

          <a 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-oceanic-noir hover:bg-nocturnal-expedition text-arctic-powder font-mono text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 duration-150 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO DASHBOARD
          </a>
        </div>

        {/* Footer/Meta Info */}
        <div className="mt-8 text-center font-mono text-[10px] text-nocturnal-expedition/40 tracking-widest uppercase">
          NEXUS_DATA // SYSTEM_DIAGNOSTICS // STATUS: OFFLINE
        </div>
      </div>
    </main>
  );
}
