import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, ChefHat, Sparkles, Thermometer, Tv, Heart, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Smart Home': Home,
  'Kitchen': ChefHat,
  'Cleaning': Sparkles,
  'Climate': Thermometer,
  'Electronics': Tv,
  'Personal Care': Heart,
  'Discounts': Percent,
};

const categoryData = [
  { id: 'discounts', name: 'Discounts', color: 'bg-destructive/10 text-destructive' },
  { id: 'smart-home', name: 'Smart Home', color: 'bg-primary/10 text-primary' },
  { id: 'kitchen', name: 'Kitchen', color: 'bg-accent text-accent-foreground' },
  { id: 'cleaning', name: 'Cleaning', color: 'bg-chart-2/10 text-chart-2' },
  { id: 'climate', name: 'Climate', color: 'bg-chart-3/10 text-chart-3' },
  { id: 'electronics', name: 'Electronics', color: 'bg-chart-4/10 text-chart-4' },
  { id: 'personal-care', name: 'Personal Care', color: 'bg-chart-5/10 text-chart-5' },
];

const CategoryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Popular Categories</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categoryData.map(category => {
          const Icon = categoryIcons[category.name] || Home;
          return (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group flex flex-col items-center gap-3 p-6 min-w-[140px] rounded-xl bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-medium text-center whitespace-nowrap">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryCarousel;
