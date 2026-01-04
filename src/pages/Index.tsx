import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import ProductsSection from '@/components/home/ProductsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import FloatingButtons from '@/components/FloatingButtons';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { recentlyViewed } = useCart();
  const { t } = useLanguage();

  const newProducts = products.filter(p => p.isNew);
  const discountedProducts = products.filter(p => p.discount);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <CategoryCarousel />
        
        <ProductsSection
          title={t('hotDeals')}
          products={discountedProducts}
          viewAllLink="/products?discount=true"
        />
        
        <ProductsSection
          title={t('newArrivals')}
          products={newProducts}
          viewAllLink="/products?new=true"
        />
        
        
        <ProductsSection
          title={t('bestSellers')}
          products={products}
          viewAllLink="/products"
        />
        
        {recentlyViewed.length > 0 && (
          <ProductsSection
            title={t('recentlyViewed')}
            products={recentlyViewed}
          />
        )}
        
        <FeaturesSection />
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Index;
