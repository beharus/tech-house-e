import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FloatingButtons from '@/components/FloatingButtons';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const { t, language } = useLanguage();

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast({
      title: language === 'ru' ? 'Добавлено в корзину' : language === 'uz' ? 'Savatga qo\'shildi' : 'Added to cart',
      className: "border-l-4 border-l-primary",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-[140px] md:pt-[160px] lg:pt-[180px]">
        <div className="container py-4 md:py-6">
          <Breadcrumbs items={[
            { label: t('home') || 'Home', href: '/' },
            { label: t('wishlist') || 'Wishlist' }
          ]} />

          <div className="mt-6">
            <h1 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              {t('wishlist') || 'Wishlist'} ({wishlist.length})
            </h1>

            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-border/50">
                <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h2 className="text-lg font-semibold mb-2">{t('emptyWishlist') || 'Your wishlist is empty'}</h2>
                <p className="text-muted-foreground mb-6">{t('addFavorites') || 'Add products to your favorites'}</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-primary to-primary/90">
                    {t('shopNow') || 'Shop Now'}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {wishlist.map(product => (
                  <div key={product.id} className="bg-card rounded-xl border border-border/50 overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-all">
                    <Link to={`/products/${product.id}`}>
                      <div className="aspect-square bg-muted/30 p-4 relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                        {product.discount && (
                          <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)} so'm
                            </span>
                          )}
                          <div className="text-lg font-bold text-foreground">
                            {formatPrice(product.price)} 
                            <span className="text-xs font-normal text-muted-foreground ml-1">
                              {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleMoveToCart(product)}
                          className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/90"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {t('addToCart') || 'Add to Cart'}
                        </Button>
                        <Button
                          onClick={() => removeFromWishlist(product.id)}
                          variant="outline"
                          size="icon"
                          className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Wishlist;
