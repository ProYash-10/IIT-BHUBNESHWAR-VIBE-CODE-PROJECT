import { useState } from 'react';
import { SearchIcon, XMarkIcon, ChevronDownIcon } from './Icons';

export function FAQSection() {
  const faqs = [
    {
      question: "How does the annual discount work?",
      answer: "When you select the annual billing cycle, a flat 20% discount is applied to your base tier rate. This is billed upfront for the entire year."
    },
    {
      question: "Can I connect custom data sources?",
      answer: "Yes. Our Enterprise tier supports custom integrations, allowing you to connect proprietary or legacy data systems with sub-millisecond latency."
    },
    {
      question: "Is there a limit on data volume?",
      answer: "Data volume limits depend on your tier. Starter handles standard volumes, Professional scales dynamically, and Enterprise offers custom throughput SLAs."
    },
    {
      question: "Do you offer on-premise deployment?",
      answer: "On-premise deployment is exclusively available for our Enterprise customers to meet strict compliance and data sovereignty requirements."
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-mystic-mint/20 px-4 scroll-mt-20" id="faq">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-oceanic-noir mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-nocturnal-expedition text-lg">
            Everything you need to know about our data automation platform.
          </p>
        </header>

        {/* Dynamic FAQ Search Bar with local assets */}
        <div className="relative max-w-md mx-auto mb-12">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-oceanic-noir/50">
            <SearchIcon className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-mystic-mint rounded-2xl text-oceanic-noir font-sans text-sm focus:outline-none focus:ring-2 focus:ring-deep-saffron focus:border-transparent transition-all shadow-sm placeholder-oceanic-noir/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 my-auto h-8 w-8 flex items-center justify-center rounded-full text-oceanic-noir/50 hover:text-oceanic-noir hover:bg-mystic-mint/30 transition-all focus:outline-none"
              aria-label="Clear search"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredFaqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-mystic-mint rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm transition-shadow hover:shadow-md"
              >
                <summary className="flex justify-between items-center font-mono font-semibold text-[15px] sm:text-lg text-oceanic-noir p-6 sm:p-8 cursor-pointer select-none hover:bg-arctic-powder/50 transition-colors duration-[200ms] ease-out list-none focus-visible:outline-none focus-visible:bg-mystic-mint/30">
                  {faq.question}
                  <span className="text-deep-saffron transform transition-transform duration-[300ms] ease-in-out group-open:rotate-180 bg-mystic-mint/30 p-2 rounded-full ml-4 shrink-0">
                    <ChevronDownIcon className="w-5 h-5" />
                  </span>
                </summary>
                <div className="px-6 sm:px-8 pb-8 pt-0 font-sans text-nocturnal-expedition/80 leading-relaxed text-base">
                  <p className="pt-6 border-t border-mystic-mint/40">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/50 border border-dashed border-mystic-mint rounded-2xl">
            <p className="font-mono text-sm text-nocturnal-expedition/60">
              No matching questions found for "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-oceanic-noir text-arctic-powder font-mono text-xs font-bold rounded-xl hover:bg-nocturnal-expedition transition-colors shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
