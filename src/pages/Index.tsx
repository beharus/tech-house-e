import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import ProductsSection from '@/components/home/ProductsSection';
import BrandsSection from '@/components/home/BrandsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const Index = () => {
  const { recentlyViewed } = useCart();

  const newProducts = products.filter(p => p.isNew);
  const discountedProducts = products.filter(p => p.discount);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <CategoryCarousel />
        
        <ProductsSection
          title="Hot Deals"
          products={discountedProducts}
          viewAllLink="/products?discount=true"
        />
        
        <ProductsSection
          title="New Arrivals"
          products={newProducts}
          viewAllLink="/products?new=true"
        />
        
        <BrandsSection />
        
        <ProductsSection
          title="Best Sellers"
          products={products}
          viewAllLink="/products"
        />
        
        {recentlyViewed.length > 0 && (
          <ProductsSection
            title="Recently Viewed"
            products={recentlyViewed}
          />
        )}
        
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
