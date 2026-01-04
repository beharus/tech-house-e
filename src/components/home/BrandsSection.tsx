import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Brand logos as SVG components for better quality
const brands = [
  { 
    name: 'LG', 
    showName: false,
    logo: (
      <svg viewBox="0 0 100 46" className="h-6 md:h-8 w-auto">
        <circle cx="18" cy="23" r="17" fill="#A50034" />
        <path d="M18 10c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13-5.8-13-13-13zm0 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="white"/>
        <text x="42" y="30" fontSize="22" fontWeight="bold" fill="#A50034">LG</text>
      </svg>
    )
  },
  { 
    name: 'Samsung', 
    showName: false,
    logo: (
      <svg viewBox="0 0 150 30" className="h-5 md:h-6 w-auto">
        <text x="0" y="22" fontSize="20" fontWeight="bold" fill="#1428A0" letterSpacing="2">SAMSUNG</text>
      </svg>
    )
  },
  { 
    name: 'Xiaomi', 
    showName: false,
    logo: (
      <svg viewBox="0 0 140 40" className="h-6 md:h-8 w-auto">
        <rect x="0" y="5" width="30" height="30" rx="5" fill="#FF6700"/>
        <text x="38" y="28" fontSize="18" fontWeight="500" fill="#FF6700">xiaomi</text>
      </svg>
    )
  },
  { 
    name: 'Huawei', 
    showName: false,
    logo: (
      <svg viewBox="0 0 160 40" className="h-6 md:h-8 w-auto">
        <path d="M20 5 L25 15 L35 20 L25 25 L20 35 L15 25 L5 20 L15 15 Z" fill="#E31937"/>
        <text x="42" y="27" fontSize="16" fontWeight="bold" fill="#E31937">HUAWEI</text>
      </svg>
    )
  },
  { 
    name: 'Honor', 
    showName: false,
    logo: (
      <svg viewBox="0 0 120 30" className="h-5 md:h-6 w-auto">
        <text x="0" y="22" fontSize="20" fontWeight="bold" fill="currentColor" className="text-foreground">HONOR</text>
      </svg>
    )
  },
  { 
    name: 'Vivo', 
    showName: false,
    logo: (
      <svg viewBox="0 0 80 30" className="h-5 md:h-6 w-auto">
        <text x="0" y="22" fontSize="20" fontWeight="bold" fill="#415FFF" fontStyle="italic">vivo</text>
      </svg>
    )
  },
  { 
    name: 'Apple', 
    showName: true,
    logo: (
      <svg viewBox="0 0 30 36" className="h-6 md:h-8 w-auto">
        <path fill="currentColor" className="text-foreground" d="M25.6 19.4c0-3.6 2.9-5.3 3.1-5.4-1.7-2.5-4.3-2.8-5.2-2.9-2.2-.2-4.4 1.3-5.5 1.3s-2.9-1.3-4.8-1.3c-2.5 0-4.7 1.4-6 3.6-2.6 4.5-.7 11.1 1.8 14.7 1.2 1.8 2.7 3.7 4.6 3.7 1.8-.1 2.5-1.2 4.7-1.2s2.8 1.2 4.8 1.1c2 0 3.3-1.8 4.5-3.6 1.4-2.1 2-4.1 2-4.2-.1 0-3.9-1.5-4-5.8zM22 8.6c1-1.2 1.7-2.9 1.5-4.6-1.4.1-3.2 1-4.2 2.2-1 1.1-1.8 2.8-1.6 4.5 1.6.1 3.3-.8 4.3-2.1z"/>
      </svg>
    )
  },
  { 
    name: 'Artel', 
    showName: true,
    logo: (
      <svg viewBox="0 0 40 40" className="h-6 md:h-8 w-auto">
        <rect width="40" height="40" rx="8" fill="#E31937"/>
        <text x="8" y="28" fontSize="16" fontWeight="bold" fill="white">A</text>
      </svg>
    )
  },
];

const BrandsSection = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    ref?.addEventListener('scroll', checkScroll);
    return () => ref?.removeEventListener('scroll', checkScroll);
  }, []);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && canScrollRight) {
        scrollRef.current.scrollBy({ left: 1, behavior: 'auto' });
      } else if (scrollRef.current && !canScrollRight) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [canScrollRight]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="container py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-left">{t('popularBrands')}</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* Brands Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-8 md:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {brands.map(brand => (
            <div
              key={brand.name}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 bg-card rounded-xl hover:shadow-md transition-all cursor-pointer border border-border/50 hover:border-primary/30 shrink-0 min-w-[120px] md:min-w-[150px]"
            >
              {brand.logo}
              {brand.showName && (
                <span className="text-sm md:text-base font-semibold text-muted-foreground">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </section>
  );
};

export default BrandsSection;