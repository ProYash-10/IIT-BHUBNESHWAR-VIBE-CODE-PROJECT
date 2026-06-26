import { useEffect, useState } from 'react';

export function PricingControls() {
  const [currency, setCurrency] = useState('USD');
  const [cycle, setCycle] = useState('Monthly');

  // Isolate state in this component, emit changes to leaf nodes
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('pricing-change', { detail: { currency, cycle } })
    );
  }, [currency, cycle]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
      {/* Billing Cycle Toggle */}
      <div className="flex items-center p-1.5 bg-mystic-mint/40 rounded-full border border-mystic-mint/80 shadow-inner">
        <button
          onClick={() => setCycle('Monthly')}
          aria-pressed={cycle === 'Monthly'}
          className={`px-6 py-2.5 rounded-full font-mono tracking-wide text-sm transition-all duration-[200ms] ease-out font-semibold ${
            cycle === 'Monthly'
              ? 'bg-oceanic-noir text-arctic-powder shadow-md'
              : 'text-nocturnal-expedition hover:bg-white/50'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setCycle('Annual')}
          aria-pressed={cycle === 'Annual'}
          className={`px-6 py-2.5 rounded-full font-mono tracking-wide text-sm transition-all duration-[200ms] ease-out flex items-center gap-2 font-semibold ${
            cycle === 'Annual'
              ? 'bg-oceanic-noir text-arctic-powder shadow-md'
              : 'text-nocturnal-expedition hover:bg-white/50'
          }`}
        >
          Annual
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
            cycle === 'Annual' ? 'bg-forsythia text-oceanic-noir' : 'bg-oceanic-noir text-forsythia'
          }`}>
            -20%
          </span>
        </button>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center p-1.5 bg-mystic-mint/40 rounded-full border border-mystic-mint/80 shadow-inner">
        {['USD', 'EUR', 'INR'].map((curr) => (
          <button
            key={curr}
            onClick={() => setCurrency(curr)}
            aria-pressed={currency === curr}
            className={`px-5 py-2.5 rounded-full font-mono text-sm font-semibold transition-all duration-[200ms] ease-out ${
              currency === curr
                ? 'bg-white text-oceanic-noir shadow-sm border border-mystic-mint/50'
                : 'text-nocturnal-expedition hover:bg-white/50 border border-transparent'
            }`}
          >
            {curr}
          </button>
        ))}
      </div>
    </div>
  );
}
