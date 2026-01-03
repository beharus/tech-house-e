import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

// Import product images for categories
import smartSpeaker from '@/assets/products/smart-speaker.jpg';
import airConditioner from '@/assets/products/air-conditioner.jpg';
import robotVacuum from '@/assets/products/robot-vacuum.jpg';
import coffeeMachine from '@/assets/products/coffee-machine.jpg';
import smartTv from '@/assets/products/smart-tv.jpg';
import headphones from '@/assets/products/headphones.jpg';
import blender from '@/assets/products/blender.jpg';
import airPurifier from '@/assets/products/air-purifier.jpg';

const categoryData = [
  { id: 'discounts', nameKey: 'discounts', image: null, isDiscount: true },
  { id: 'smart-home', nameKey: 'smartHome', image: smartSpeaker },
  { id: 'climate', nameKey: 'airConditioners', image: airConditioner },
  { id: 'cleaning', nameKey: 'vacuumCleaners', image: robotVacuum },
  { id: 'kitchen', nameKey: 'kitchen', image: coffeeMachine },
  { id: 'electronics', nameKey: 'televisions', image: smartTv },
  { id: 'electronics', nameKey: 'electronics', image: headphones },
  { id: 'kitchen', nameKey: 'kitchen', image: blender },
  { id: 'climate', nameKey: 'climate', image: airPurifier },
];

const CategoryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="container py-6">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card shadow-md border-border hidden md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-0 md:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categoryData.map((category, index) => (
            <Link
              key={`${category.id}-${index}`}
              to={`/products?category=${category.id}`}
              className="group flex flex-col items-center p-4 min-w-[140px] rounded-2xl bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-24 h-20 flex items-center justify-center mb-2 relative">
                {category.isDiscount ? (
                  <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Percent className="h-8 w-8 text-destructive" />
                  </div>
                ) : (
                  <img
                    src={category.image!}
                    alt={t(category.nameKey)}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
              <span className="text-sm font-medium text-center whitespace-nowrap">
                {t(category.nameKey)}
              </span>
            </Link>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card shadow-md border-border hidden md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default CategoryCarousel;
