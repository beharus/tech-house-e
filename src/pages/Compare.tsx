import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { X, Plus, Check, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products } from '@/data/products';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Compare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    const selected = products.filter(p => ids.includes(p.id));
    setCompareProducts(selected);
  }, [searchParams]);

  const addProduct = (product: Product) => {
    if (compareProducts.length >= 4) {
      toast({
        title: t('error') || 'Error',
        description: t('maxCompareProducts') || 'Maximum 4 products can be compared',
        variant: 'destructive',
      });
      return;
    }
    if (compareProducts.find(p => p.id === product.id)) return;
    
    const newProducts = [...compareProducts, product];
    setCompareProducts(newProducts);
    setSearchParams({ ids: newProducts.map(p => p.id).join(',') });
    setIsAddDialogOpen(false);
  };

  const removeProduct = (productId: string) => {
    const newProducts = compareProducts.filter(p => p.id !== productId);
    setCompareProducts(newProducts);
    if (newProducts.length > 0) {
      setSearchParams({ ids: newProducts.map(p => p.id).join(',') });
    } else {
      setSearchParams({});
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: t('addedToCart') || 'Added to cart',
      description: product.name,
    });
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('uz-UZ').format(price);

  const availableProducts = products.filter(p => !compareProducts.find(cp => cp.id === p.id));

  const specs = [
    { key: 'category', label: t('category') || 'Category' },
    { key: 'rating', label: t('rating') || 'Rating' },
    { key: 'reviews', label: t('reviews') || 'Reviews' },
    { key: 'inStock', label: t('availability') || 'Availability' },
    { key: 'features', label: t('features') || 'Features' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-[140px] md:pt-[160px] lg:pt-[180px]">
        <div className="container py-4 md:py-6">
          <Breadcrumbs items={[
            { label: t('home') || 'Home', href: '/' },
            { label: t('compare') || 'Compare Products' }
          ]} />

          <div className="flex items-center justify-between mt-6 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{t('compareProducts') || 'Compare Products'}</h1>
              <p className="text-muted-foreground mt-1">
                {compareProducts.length} {t('productsSelected') || 'products selected'}
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('backToProducts') || 'Back to Products'}
              </Button>
            </Link>
          </div>

          {compareProducts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('noProductsToCompare') || 'No products to compare'}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('addProductsToCompare') || 'Add products to compare their features and specifications'}
                </p>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      {t('addProduct') || 'Add Product'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{t('selectProduct') || 'Select a Product'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      {availableProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => addProduct(product)}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-all text-left"
                        >
                          <div className="w-16 h-16 bg-muted/30 rounded-lg overflow-hidden shrink-0">
                            <img src={product.image} alt="" className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-sm text-primary font-semibold">{formatPrice(product.price)} so'm</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 w-40 bg-muted/30 rounded-tl-xl font-semibold"></th>
                    {compareProducts.map((product) => (
                      <th key={product.id} className="p-4 bg-muted/30 min-w-[200px]">
                        <Card className="relative p-4 h-full">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-muted hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <Link to={`/products/${product.id}`} className="block">
                            <div className="w-full aspect-square bg-muted/30 rounded-lg overflow-hidden mb-3">
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                            </div>
                            <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </Card>
                      </th>
                    ))}
                    {compareProducts.length < 4 && (
                      <th className="p-4 bg-muted/30 rounded-tr-xl min-w-[200px]">
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                          <DialogTrigger asChild>
                            <button className="w-full aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-accent/50 transition-all">
                              <Plus className="w-8 h-8 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{t('addProduct') || 'Add Product'}</span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{t('selectProduct') || 'Select a Product'}</DialogTitle>
                            </DialogHeader>
                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                              {availableProducts.map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => addProduct(product)}
                                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-all text-left"
                                >
                                  <div className="w-16 h-16 bg-muted/30 rounded-lg overflow-hidden shrink-0">
                                    <img src={product.image} alt="" className="w-full h-full object-contain" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{product.name}</p>
                                    <p className="text-sm text-primary font-semibold">{formatPrice(product.price)} so'm</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium bg-muted/20">{t('price') || 'Price'}</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="space-y-1">
                          <p className="text-xl font-bold text-primary">{formatPrice(product.price)} so'm</p>
                          {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)} so'm
                            </p>
                          )}
                        </div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4 bg-muted/10"></td>}
                  </tr>
                  
                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium bg-muted/20">{t('category') || 'Category'}</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4 bg-muted/10"></td>}
                  </tr>

                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium bg-muted/20">{t('rating') || 'Rating'}</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4 bg-muted/10"></td>}
                  </tr>

                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium bg-muted/20">{t('availability') || 'Availability'}</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.inStock ? (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                            <Check className="w-3 h-3 mr-1" />
                            {t('inStock') || 'In Stock'}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            {t('outOfStock') || 'Out of Stock'}
                          </Badge>
                        )}
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4 bg-muted/10"></td>}
                  </tr>

                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium bg-muted/20">{t('features') || 'Features'}</td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4">
                        <ul className="space-y-2">
                          {product.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-500 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4 bg-muted/10"></td>}
                  </tr>

                  <tr>
                    <td className="p-4 bg-muted/20 rounded-bl-xl"></td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full gap-2"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {t('addToCart') || 'Add to Cart'}
                        </Button>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4 bg-muted/10 rounded-br-xl"></td>}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Compare;