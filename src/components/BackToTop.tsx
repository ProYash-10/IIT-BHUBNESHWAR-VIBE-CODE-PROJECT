import { useEffect, useState } from 'react';
import { ChevronUpSolidIcon } from './Icons';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-oceanic-noir border border-forsythia/30 text-forsythia hover:text-deep-saffron hover:bg-black/60 shadow-2xl transition-all duration-300 transform z-50 focus:outline-none focus:ring-2 focus:ring-forsythia ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ChevronUpSolidIcon className="w-5 h-5 shrink-0" />
    </button>
  );
}
