import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' sum';
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, addToRecentlyViewed } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleView = () => {
    addToRecentlyViewed(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleView}
    >
      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.discount && (
              <Badge variant="destructive">-{product.discount}%</Badge>
            )}
          </div>

          {/* Stock indicator - visible on hover */}
          <div
            className={`absolute top-3 right-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Badge variant={product.inStock ? 'outline' : 'secondary'} className="bg-card">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>

          {/* Quick actions - visible on hover */}
          <div
            className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
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
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
            <Button
              size="icon"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="h-10 w-10 rounded-full"
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
