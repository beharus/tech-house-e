import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

// Helper function to generate mock images based on the main image
const generateMockImages = (mainImage: string): string[] => {
  // For demo purposes, create variations of the main image
  // In a real app, you would have actual multiple images
  return [
    mainImage,
    mainImage, // You can add actual different image URLs here if available
    mainImage,
    mainImage,
  ];
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const { addToCart, addToRecentlyViewed } = useCart();
  const { t, language } = useLanguage();

  // Generate images array - use product.image as the primary image
  // and create mock variations for the hover effect
  const productImages = useMemo(() => {
    // If product has a single image, create mock variations for the hover effect
    return generateMockImages(product.image);
  }, [product.image]);
  
  // Calculate Monthly Payment (Mock calculation: Price / 12 + 10% interest approx)
  const monthlyPayment = Math.round((product.price * 1.15) / 12);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: language === 'ru' ? 'Добавлено в корзину' : language === 'uz' ? 'Savatga qo\'shildi' : 'Added to cart',
      className: "border-l-4 border-l-purple-500",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || productImages.length <= 1) return;
    
    // Get precise dimensions
    const { left, width } = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    
    // Calculate index based on mouse X position relative to container width
    const sections = productImages.length;
    const sectionWidth = width / sections;
    const newIndex = Math.floor(x / sectionWidth);
    
    // Clamp values to ensure safety
    const safeIndex = Math.max(0, Math.min(newIndex, sections - 1));
    
    if (safeIndex !== currentImageIndex) {
      setCurrentImageIndex(safeIndex);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block h-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0); // Reset to cover image
      }}
      onClick={() => addToRecentlyViewed(product)}
    >
      <div className={cn(
        "relative h-full bg-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-300",
        isHovered ? "shadow-xl shadow-primary/5 border-primary/20 -translate-y-1" : "shadow-sm"
      )}>
        
        {/* --- Image Section --- */}
        <div 
          ref={imageContainerRef}
          className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          onMouseMove={handleMouseMove}
        >
          {/* Main Image */}
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-emerald-400 to-teal-500 border-0 text-white shadow-sm px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                <Zap className="w-3 h-3 mr-1 fill-current" /> NEW
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 border-0 text-white shadow-sm">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button (Heart) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implement wishlist functionality
            }}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-md z-10",
              isHovered ? "opacity-100" : "opacity-0 lg:opacity-100" 
            )}
          >
            <Heart className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:fill-red-500 transition-colors" />
          </button>

          {/* Active Indicator (The "Long Stick" Dots) */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 px-4">
            {/* Only show dots if hovered and more than 1 image */}
            {productImages.length > 1 && (
              <div className={`flex gap-1.5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 ease-out shadow-sm",
                      index === currentImageIndex 
                        ? "w-6 bg-gradient-to-r from-violet-600 to-indigo-600"
                        : "w-1.5 bg-gray-300 dark:bg-gray-600"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="p-4 flex flex-col gap-2">
          
          {/* Monthly Payment Gradient Badge */}
          <div className="w-fit">
            <Badge variant="outline" className="rounded-md border-transparent bg-gradient-to-r from-yellow-400/10 to-orange-500/10 px-2 py-0.5">
               <span className="text-[10px] font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                 {formatPrice(monthlyPayment)} {t('month') || '/ oyiga'}
               </span>
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-medium text-sm leading-tight text-foreground/90 line-clamp-2 min-h-[2.5em] group-hover:text-violet-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-muted-foreground pt-0.5">
              {product.rating} <span className="text-muted-foreground/60">({product.reviews})</span>
            </span>
          </div>

          {/* Footer: Price & Add Button */}
          <div className="flex items-end justify-between mt-1">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground/70 line-through decoration-red-500/50">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <div className="text-base sm:text-lg font-bold text-foreground">
                {formatPrice(product.price)} 
                <span className="text-xs font-normal text-muted-foreground ml-1">
                    {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
                </span>
              </div>
            </div>

            {/* Gradient Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="icon"
              className={cn(
                "rounded-xl h-10 w-10 shadow-md bg-gradient-to-br from-violet-600 to-indigo-600 border-0 text-white transition-all duration-300 hover:scale-105 active:scale-95",
                product.inStock 
                  ? "hover:from-violet-700 hover:to-indigo-700" 
                  : "opacity-50 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;