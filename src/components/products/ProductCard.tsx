import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart, addToRecentlyViewed } = useCart();
  const { t, language } = useLanguage();

  // Mock multiple images - in real app would come from product data
  const productImages = [product.image, product.image, product.image];
  
  // Generate random stock count for demo
  const stockCount = Math.floor(Math.random() * 20) + 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: language === 'ru' ? 'Добавлено в корзину' : language === 'uz' ? 'Savatga qo\'shildi' : 'Added to cart',
      description: `${product.name}`,
    });
  };

  const handleView = () => {
    addToRecentlyViewed(product);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !isHovered) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const sectionWidth = rect.width / productImages.length;
    const newIndex = Math.floor(x / sectionWidth);
    
    if (newIndex >= 0 && newIndex < productImages.length && newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      onClick={handleView}
    >
      <div className={`bg-card rounded-xl overflow-hidden transition-shadow duration-300 ${isHovered ? 'shadow-lg' : 'shadow-sm'}`}>
        {/* Image container */}
        <div 
          ref={imageContainerRef}
          className="relative aspect-square overflow-hidden bg-muted/30"
          onMouseMove={handleMouseMove}
        >
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-opacity duration-200"
          />

          {/* Image indicators */}
          {isHovered && productImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {productImages.map((_, index) => (
                <span
                  key={index}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">{t('new')}</Badge>
            )}
            {product.discount && (
              <Badge variant="destructive">-{product.discount}%</Badge>
            )}
          </div>

          {/* Stock indicator */}
          <div
            className={`absolute top-3 right-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Badge variant="outline" className="bg-card">
              {stockCount} {t('pcsInStock')}
            </Badge>
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`absolute bottom-3 right-3 w-9 h-9 rounded-full bg-card shadow-md flex items-center justify-center transition-all duration-300 hover:bg-accent ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-chart-1 text-chart-1" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price and cart */}
          <div className="flex items-end justify-between mt-3">
            <div>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)} {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
                </p>
              )}
              <p className="text-lg font-bold text-primary">
                {formatPrice(product.price)} {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
              </p>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="h-10 px-4 rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
