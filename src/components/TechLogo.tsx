import { cn } from '@/lib/utils';

interface TechLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

const TechLogo = ({ className, showText = true, variant = 'light' }: TechLogoProps) => {
  const textColor = variant === 'dark' ? 'text-primary-foreground' : 'text-foreground';
  
  return (
    <div className={cn("flex items-center gap-1.5 md:gap-2", className)}>
      {/* T Logo SVG */}
      <svg viewBox="0 0 50 50" className="w-8 h-8 md:w-10 md:h-10 shrink-0">
        <defs>
          <linearGradient id="techLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
          </linearGradient>
        </defs>
        {/* Main T shape */}
        <path
          d="M8 8 L42 8 L42 16 L29 16 L29 42 L21 42 L21 16 L8 16 Z"
          fill="url(#techLogoGradient)"
        />
        {/* Arrow/cursor pointing down-right */}
        <path
          d="M25 24 L40 42 L32 42 L25 32 Z"
          fill="url(#techLogoGradient)"
        />
      </svg>
      
      {/* Text */}
      {showText && (
        <span className={cn("hidden sm:block text-lg md:text-xl font-bold", textColor)}>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">ech</span>
          House
        </span>
      )}
    </div>
  );
};

export default TechLogo;
