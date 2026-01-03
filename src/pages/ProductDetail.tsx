import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductsSection from '@/components/home/ProductsSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' sum';
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToRecentlyViewed, recentlyViewed } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Add to recently viewed on page load
  addToRecentlyViewed(product);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const similarProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  const frequentlyBought = products.filter(
    p => p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            {' / '}
            <Link to="/products" className="hover:text-primary">Products</Link>
            {' / '}
            <Link to={`/products?category=${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-primary">
              {product.category}
            </Link>
            {' / '}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Product images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl bg-card overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            {/* Product info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  {product.isNew && (
                    <Badge className="mb-2">New</Badge>
                  )}
                  <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-chart-1 text-chart-1'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-card rounded-xl p-6 mb-6">
                <div className="flex items-end gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <Badge variant="destructive">-{product.discount}%</Badge>
                    </>
                  )}
                </div>

                {/* Installment */}
                <p className="text-sm text-muted-foreground mb-6">
                  or from <span className="text-foreground font-medium">
                    {formatPrice(Math.round(product.price / 12))}
                  </span> /month for 12 months
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="secondary">
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Delivery info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">Free Delivery</span>
                    <span className="text-muted-foreground"> - Tomorrow or later</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Official Warranty - 1 Year</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>14 Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-card rounded-xl p-6">
                <p className="text-muted-foreground mb-4">{product.description}</p>
                {product.features && (
                  <div>
                    <h3 className="font-semibold mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {product.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-card rounded-xl p-6">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">Category</td>
                      <td className="py-3 font-medium">{product.category}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">Rating</td>
                      <td className="py-3 font-medium">{product.rating} / 5</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">Availability</td>
                      <td className="py-3 font-medium">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card rounded-xl p-6 text-center">
                <p className="text-muted-foreground">Be the first to review this product!</p>
                <Button className="mt-4">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Similar products */}
          {similarProducts.length > 0 && (
            <ProductsSection
              title="Similar Products"
              products={similarProducts}
              viewAllLink={`/products?category=${product.category.toLowerCase().replace(' ', '-')}`}
            />
          )}

          {/* Frequently bought together */}
          <ProductsSection
            title="Frequently Bought Together"
            products={frequentlyBought}
          />

          {/* Recently viewed */}
          {recentlyViewed.length > 1 && (
            <ProductsSection
              title="Recently Viewed"
              products={recentlyViewed.filter(p => p.id !== product.id)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
