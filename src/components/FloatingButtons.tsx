import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMessage = () => {
    // Open chat or messaging system
    console.log('Open chat');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 text-foreground" />
      </button>

      {/* Message button */}
      <button
        onClick={handleMessage}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-white/40 border border-violet-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40"
        aria-label="Message us"
      >
        <MessageCircle className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
      </button>
    </div>
  );
};

export default FloatingButtons;
