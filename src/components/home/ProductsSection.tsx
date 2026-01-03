import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductsSectionProps {
  title: string;
  titleKey?: string;
  products: Product[];
  viewAllLink?: string;
  showCarousel?: boolean;
}

const ProductsSection = ({ title, titleKey, products, viewAllLink = '/products', showCarousel = true }: ProductsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const displayTitle = titleKey ? t(titleKey) : title;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (showCarousel) {
    return (
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{displayTitle}</h2>
          <div className="flex items-center gap-4">
            <Link
              to={viewAllLink}
              className="hidden sm:flex items-center gap-1 text-primary hover:underline"
            >
              {t('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
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
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <div key={product.id} className="min-w-[280px] max-w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{displayTitle}</h2>
        <Link
          to={viewAllLink}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          {t('viewAll')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
