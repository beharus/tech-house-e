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
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="relative group/carousel">
        {/* Navigation Button Left */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-100 text-gray-600 hover:text-violet-600 hover:bg-white hover:border-violet-100 hidden md:flex transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-2 md:px-4 py-6" // Added vertical padding for hover shadows
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categoryData.map((category, index) => (
            <Link
              key={`${category.id}-${index}`}
              to={`/products?category=${category.id}`}
              className="group flex flex-col items-center justify-between p-4 min-w-[150px] md:min-w-[170px] h-[180px] rounded-[24px] bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] hover:border-violet-100"
            >
              <div className="flex-1 w-full flex items-center justify-center mb-3">
                <div className="relative w-28 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-50 rounded-2xl scale-90 group-hover:scale-100 group-hover:bg-violet-50 transition-all duration-300" />

                  {category.isDiscount ? (
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-300 flex items-center justify-center">
                      <Percent className="h-8 w-8 text-red-500" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <img
                      src={category.image!}
                      alt={t(category.nameKey)}
                      className="relative z-10 max-w-full max-h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  )}
                </div>
              </div>
              <span className="text-sm line-clamp-1 px-1.5 md:text-base font-semibold text-gray-700 text-center whitespace-nowrap group-hover:text-violet-700 transition-colors duration-300">
                {t(category.nameKey)}
              </span>
            </Link>
          ))}
        </div>

        {/* Navigation Button Right */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-100 text-gray-600 hover:text-violet-600 hover:bg-white hover:border-violet-100 hidden md:flex transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default CategoryCarousel;