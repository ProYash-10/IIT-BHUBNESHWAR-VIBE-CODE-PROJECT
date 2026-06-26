import { useState } from 'react';
import { PricingControls } from './PricingControls';
import { PriceTag } from './PriceTag';
import { ChevronDownIcon, ChevronUpIcon, LinkSolidIcon } from './Icons';

const tiers = [
  {
    name: 'Starter',
    basePriceUsd: 29,
    description: 'Perfect for small teams starting with data automation.',
    features: ['Up to 5 data sources', 'Standard support', 'Daily syncs', 'Basic analytics'],
  },
  {
    name: 'Professional',
    basePriceUsd: 99,
    description: 'Advanced features for scaling data operations.',
    features: ['Unlimited data sources', 'Priority support', 'Real-time syncs', 'Predictive modeling'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    basePriceUsd: 299,
    description: 'Custom solutions for complex organizational needs.',
    features: ['Custom integrations', '24/7 dedicated support', 'Sub-millisecond latency', 'On-premise deployment options'],
  },
];

const COMPARISON_ROWS = [
  { feature: 'Max Data Sources', starter: '5 Sources', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Ingestion Latency', starter: '< 5 seconds', pro: 'Real-time (sub-sec)', enterprise: 'Sub-millisecond' },
  { feature: 'Support SLA', starter: 'Email support', pro: 'Priority response', enterprise: '24/7 dedicated' },
  { feature: 'Uptime Guarantee', starter: '99.9%', pro: '99.99%', enterprise: '99.999%' },
  { feature: 'Custom APIs', starter: '❌', starterText: 'No', pro: '❌', proText: 'No', enterprise: '✅', enterpriseText: 'Yes' },
];

export function PricingMatrix() {
  const [showCompare, setShowCompare] = useState(false);

  return (
    <section className="py-24 bg-arctic-powder flex flex-col items-center px-4 border-b border-mystic-mint/20 scroll-mt-20" id="pricing">
      <header className="text-center mb-12 max-w-2xl">
        <h2 className="font-mono text-3xl md:text-5xl font-bold text-oceanic-noir mb-4">
          Simple, scalable pricing
        </h2>
        <p className="font-sans text-nocturnal-expedition text-lg">
          No hidden fees. Choose the plan that best fits your data pipeline needs.
        </p>
      </header>

      <PricingControls />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full max-w-6xl mx-auto mt-6">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={`relative flex flex-col p-8 rounded-3xl bg-white border transition-all duration-[400ms] ease-in-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(17,76,90,0.15)] ${
              tier.isPopular ? 'border-deep-saffron shadow-xl md:-translate-y-4 md:hover:-translate-y-6' : 'border-mystic-mint shadow-sm'
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-deep-saffron text-arctic-powder px-6 py-1.5 rounded-full font-mono text-xs font-bold shadow-md uppercase tracking-widest whitespace-nowrap">
                Most Popular
              </div>
            )}
            <h3 className="font-mono text-2xl font-bold text-oceanic-noir">
              {tier.name}
            </h3>
            <p className="font-sans text-nocturnal-expedition/80 text-sm mt-3 min-h-[44px] leading-relaxed">
              {tier.description}
            </p>
            
            <div className="mt-2">
              <PriceTag basePriceUsd={tier.basePriceUsd} />
            </div>

            <button
              className={`mt-10 mb-10 py-3.5 px-6 rounded-xl font-mono tracking-wide text-sm font-bold transition-all duration-[200ms] ease-out shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                tier.isPopular
                  ? 'bg-oceanic-noir text-arctic-powder hover:bg-nocturnal-expedition focus-visible:ring-oceanic-noir'
                  : 'bg-mystic-mint text-nocturnal-expedition hover:bg-mystic-mint/80 focus-visible:ring-mystic-mint'
              }`}
            >
              Get Started
            </button>

            <div className="mt-auto border-t border-mystic-mint/40 pt-6">
              <p className="font-mono text-xs font-bold tracking-widest text-nocturnal-expedition mb-5 uppercase">
                What's included
              </p>
              <ul className="flex flex-col gap-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-sans text-sm text-oceanic-noir/90 leading-snug">
                    <svg aria-hidden="true" className="w-5 h-5 text-deep-saffron shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Feature Comparison Matrix Trigger */}
      <div className="mt-16 w-full max-w-4xl flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 border border-mystic-mint/80 px-6 py-4 rounded-3xl shadow-sm mb-2 backdrop-blur-sm">
          <span className="font-sans text-sm font-semibold text-oceanic-noir">
            Need a feature deep dive? Toggle detailed comparison:
          </span>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-xs font-bold transition-colors uppercase tracking-wider ${!showCompare ? 'text-oceanic-noir' : 'text-nocturnal-expedition/40'}`}>
              Summary
            </span>
            <button
              onClick={() => setShowCompare(!showCompare)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-deep-saffron focus:ring-offset-2 ${
                showCompare ? 'bg-deep-saffron' : 'bg-oceanic-noir'
              }`}
              role="switch"
              aria-checked={showCompare}
              aria-label="Compare Plans toggle"
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
                  showCompare ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`font-mono text-xs font-bold transition-colors uppercase tracking-wider ${showCompare ? 'text-deep-saffron' : 'text-nocturnal-expedition/40'}`}>
              Compare Plans
            </span>
          </div>
        </div>

        {/* Collapsible Comparison Grid */}
        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
            showCompare ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
          }`}
        >
          <div className="bg-white border border-mystic-mint/60 rounded-3xl p-6 md:p-8 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-mystic-mint/40 font-mono text-xs text-nocturnal-expedition/60 tracking-wider">
                  <th className="pb-4 font-bold uppercase">FEATURE</th>
                  <th className="pb-4 font-bold uppercase">STARTER</th>
                  <th className="pb-4 font-bold uppercase">PROFESSIONAL</th>
                  <th className="pb-4 font-bold uppercase">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm text-oceanic-noir/90 divide-y divide-mystic-mint/20">
                {COMPARISON_ROWS.map((row, index) => (
                  <tr key={index} className="hover:bg-mystic-mint/5 transition-colors">
                    <td className="py-4 font-semibold text-oceanic-noir">{row.feature}</td>
                    <td className="py-4 text-nocturnal-expedition">{row.starter}</td>
                    <td className="py-4 text-nocturnal-expedition font-medium">{row.pro}</td>
                    <td className="py-4 text-oceanic-noir font-bold">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Custom LinkSolidIcon section */}
            <div className="mt-6 pt-6 border-t border-mystic-mint/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-nocturnal-expedition/70">
              <span className="flex items-center gap-1.5">
                <LinkSolidIcon className="w-4 h-4 text-mystic-mint shrink-0" />
                <span>Enterprise SLA contract agreements apply.</span>
              </span>
              <a
                href="#success"
                className="text-deep-saffron hover:text-oceanic-noir transition-colors underline underline-offset-2 uppercase tracking-wider font-bold"
              >
                View case studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
