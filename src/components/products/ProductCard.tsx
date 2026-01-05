import { useState, useRef, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Zap, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ").format(price);
};

const ProductCardSkeleton = () => (
  <div className="relative h-full bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border/50 animate-pulse">
    <div className="aspect-square bg-muted/50" />
    <div className="p-3 md:p-4 space-y-3">
      <div className="h-4 bg-muted/50 rounded w-1/3" />
      <div className="h-4 bg-muted/50 rounded w-full" />
      <div className="h-4 bg-muted/50 rounded w-2/3" />
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="h-3 bg-muted/50 rounded w-16" />
          <div className="h-5 bg-muted/50 rounded w-24" />
        </div>
        <div className="h-10 w-10 bg-muted/50 rounded" />
      </div>
    </div>
  </div>
);

export { ProductCardSkeleton };

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    addToCart,
    addToRecentlyViewed,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCart();
  const { t, language } = useLanguage();
  const isLiked = isInWishlist(product.id);

  const productImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.image];
  }, [product.images, product.image]);

  useEffect(() => {
    const img = new Image();
    img.src = productImages[0];
    img.onload = () => setImageLoaded(true);
  }, [productImages]);

  const monthlyPayment = Math.round((product.price * 1.15) / 12);
  const stockCount = product.stockCount ?? Math.floor(Math.random() * 50) + 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: t('addedToCart'),
      className: "border-l-4 border-l-purple-500",
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
      toast({
        title: t('removedFromWishlist'),
      });
    } else {
      addToWishlist(product);
      toast({
        title: t('addedToWishlist'),
        className: "border-l-4 border-l-red-500",
      });
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/compare?ids=${product.id}`);
    toast({
      title: t('addedToCompare'),
      className: "border-l-4 border-l-blue-500",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || productImages.length <= 1) return;

    const { left, width } = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;

    const sections = productImages.length;
    const sectionWidth = width / sections;
    const newIndex = Math.floor(x / sectionWidth);

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
        setCurrentImageIndex(0);
      }}
      onClick={() => addToRecentlyViewed(product)}
    >
      <div
        className={cn(
          "relative h-full bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border/50 transition-all duration-300",
          isHovered
            ? "shadow-xl shadow-primary/10 border-primary/20"
            : "shadow-sm"
        )}
      >
        <div
          ref={imageContainerRef}
          className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          onMouseMove={handleMouseMove}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted/50 animate-pulse" />
          )}
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={cn(
              "w-full h-full object-contain p-4 md:p-6 transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1 z-10">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-emerald-400 to-teal-500 border-0 text-white shadow-sm px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] uppercase font-bold tracking-wider">
                <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1 fill-current" />
                {t('new')}
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 border-0 text-white shadow-sm text-[10px] md:text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>

          <div className="absolute top-2 md:top-3 right-10 md:right-12 z-10">
            <Badge
              variant="outline"
              className="bg-card/80 backdrop-blur-sm text-[9px] md:text-[10px] px-1.5 py-0.5"
            >
              {stockCount}{" "}
              {language === "ru" ? "шт" : language === "uz" ? "dona" : "pcs"}
            </Badge>
          </div>

          <div className="absolute top-2 md:top-3 right-2 md:right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleToggleWishlist}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-md"
            >
              <Heart
                className={cn(
                  "h-3.5 w-3.5 md:h-4 md:w-4 transition-colors",
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 dark:text-gray-300 hover:text-red-500"
                )}
              />
            </button>
            <button
              onClick={handleCompare}
              className={cn(
                "w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-md",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              )}
            >
              <GitCompareArrows className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" />
            </button>
          </div>

          <div className="absolute bottom-2 md:bottom-3 left-0 right-0 flex justify-center gap-1 md:gap-1.5 z-10 px-4">
            {productImages.length > 1 && (
              <div
                className={`flex gap-1 md:gap-1.5 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 md:h-1.5 rounded-full transition-all duration-300 ease-out shadow-sm",
                      index === currentImageIndex
                        ? "w-4 md:w-6 bg-gradient-to-r from-violet-600 to-indigo-600"
                        : "w-1 md:w-1.5 bg-gray-300 dark:bg-gray-600"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 md:p-4 flex flex-col gap-1.5 md:gap-2">
          <div className="w-fit">
            <Badge
              variant="outline"
              className="rounded-md border-transparent bg-gradient-to-r from-yellow-400/10 to-orange-500/10 px-1.5 md:px-2 py-0.5"
            >
              <span className="text-[9px] md:text-[10px] font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {formatPrice(monthlyPayment)}{" "}
                  {language === "en"
                    ? "sum"
                    : language === "ru"
                    ? "сум"
                    : "so'm"}{" "}
                {t("monthly")}
              </span>
            </Badge>
          </div>

          <h3 className="font-medium text-xs md:text-sm leading-tight text-foreground/90 line-clamp-2 min-h-[2.5em] group-hover:text-violet-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground pt-0.5">
              {product.rating}{" "}
              <span className="text-muted-foreground/60">
                ({product.reviews})
              </span>
            </span>
          </div>

          <div className="flex items-end justify-between mt-1">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-[10px] md:text-xs text-muted-foreground/70 line-through decoration-red-500/50">
                  {formatPrice(product.originalPrice)}
                  <span className="text-[10px] md:text-xs font-normal text-muted-foreground ml-0.5 md:ml-1">
                    {language === "en"
                      ? "sum"
                      : language === "ru"
                      ? "сум"
                      : "so'm"}
                  </span>
                </span>
              )}
              <div className="text-sm md:text-lg font-bold text-foreground">
                {formatPrice(product.price)}
                <span className="text-[10px] md:text-xs font-normal text-muted-foreground ml-0.5 md:ml-1">
                  {language === "en"
                    ? "sum"
                    : language === "ru"
                    ? "сум"
                    : "so'm"}
                </span>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="icon"
              variant="outline"
              className={cn(
                "md:rounded-sm rounded-sm md:rounded-tr-2xl md:rounded-bl-2xl h-8 w-8 md:h-10 md:w-10 border-2 border-primary bg-transparent text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-95",
                !product.inStock && "opacity-50 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 fill-none stroke-current" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
