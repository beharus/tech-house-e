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
      <svg
        viewBox="0 0 324 449"
        className="w-6 h-10 md:w-7 md:h-12 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H324V60L0 148V0Z" fill="#6c28d9" />
        <path
          d="M166 106.463L290 217L78 448.463L166 106.463Z"
          fill="#8b5cf6"
        />
      </svg>
      
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
