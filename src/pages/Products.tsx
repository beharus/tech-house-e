import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, ChevronDown, ChevronUp, X, Star, ShoppingCart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import FloatingButtons from '@/components/FloatingButtons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { products, categories, brands } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const colors = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'silver', name: 'Silver', hex: '#C0C0C0' },
  { id: 'gold', name: 'Gold', hex: '#FFD700' },
  { id: 'blue', name: 'Blue', hex: '#3B82F6' },
  { id: 'red', name: 'Red', hex: '#EF4444' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brands: true,
    colors: false,
    rating: false,
  });

  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const showDiscount = searchParams.get('discount') === 'true';
  const showNew = searchParams.get('new') === 'true';

  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryParam && categoryParam !== 'all') {
      result = result.filter(p => 
        p.category.toLowerCase().replace(' ', '-') === categoryParam
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p =>
        selectedCategories.includes(p.category.toLowerCase().replace(' ', '-'))
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (showDiscount) {
      result = result.filter(p => p.discount);
    }

    if (showNew) {
      result = result.filter(p => p.isNew);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (ratingFilter > 0) {
      result = result.filter(p => p.rating >= ratingFilter);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [categoryParam, searchQuery, showDiscount, showNew, selectedCategories, selectedBrands, priceRange, ratingFilter, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId)
        ? prev.filter(c => c !== colorId)
        : [...prev, colorId]
    );
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([minPrice, maxPrice]);
    setRatingFilter(0);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || selectedColors.length > 0 || ratingFilter > 0 || priceRange[0] !== minPrice || priceRange[1] !== maxPrice;

  const formatPrice = (price: number) => new Intl.NumberFormat('uz-UZ').format(price);

  const FilterSidebar = () => (
    <div className="space-y-4">
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full gap-2">
          <X className="h-4 w-4" />
          {t('clearFilters') || 'Clear Filters'}
        </Button>
      )}

      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-sm md:text-base">
          {t('categories') || 'Categories'}
          {openSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={selectedCategories.includes(cat.id) || categoryParam === cat.id}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-sm md:text-base">
          {t('priceRange') || 'Price Range'}
          {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
            min={minPrice}
            max={maxPrice}
            step={100000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPrice(priceRange[0])} so'm</span>
            <span>{formatPrice(priceRange[1])} so'm</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Brands */}
      <Collapsible open={openSections.brands} onOpenChange={() => toggleSection('brands')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-sm md:text-base">
          {t('brands') || 'Brands'}
          {openSections.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Colors */}
      <Collapsible open={openSections.colors} onOpenChange={() => toggleSection('colors')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-sm md:text-base">
          {t('colors') || 'Colors'}
          {openSections.colors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color.id}
                onClick={() => toggleColor(color.id)}
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.id) 
                    ? 'border-primary scale-110 ring-2 ring-primary/30' 
                    : 'border-border hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Rating */}
      <Collapsible open={openSections.rating} onOpenChange={() => toggleSection('rating')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-sm md:text-base">
          {t('rating') || 'Rating'}
          {openSections.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={ratingFilter === rating}
                onCheckedChange={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < rating ? 'text-amber-400' : 'text-muted'}`}>★</span>
                ))}
                <span className="text-xs text-muted-foreground ml-1">{t('andUp') || '& up'}</span>
              </div>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  const pageTitle = useMemo(() => {
    if (searchQuery) return `${t('search') || 'Search'}: "${searchQuery}"`;
    if (showDiscount) return t('dealsDiscounts') || 'Deals & Discounts';
    if (showNew) return t('newArrivals') || 'New Arrivals';
    if (categoryParam) {
      const cat = categories.find(c => c.id === categoryParam);
      return cat?.name || t('products') || 'Products';
    }
    return t('allProducts') || 'All Products';
  }, [searchQuery, showDiscount, showNew, categoryParam, t]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-[140px] md:pt-[160px] lg:pt-[180px]">
        <div className="container py-4 md:py-6">
          {/* Breadcrumb */}
          <Breadcrumbs items={[
            { label: t('home') || 'Home', href: '/' },
            { label: pageTitle }
          ]} />

          <div className="flex gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-6">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
              <div className="sticky top-[200px] bg-card rounded-xl p-4 md:p-5 border border-border/50">
                <h3 className="font-bold text-base mb-4">{t('filters') || 'Filters'}</h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">{pageTitle}</h1>
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} {t('productsFound') || 'products found'}
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  {/* Mobile filter */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm" className="gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        {t('filters') || 'Filters'}
                        {hasActiveFilters && (
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {selectedCategories.length + selectedBrands.length + selectedColors.length + (ratingFilter > 0 ? 1 : 0)}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>{t('filters') || 'Filters'}</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] md:w-[180px] text-xs md:text-sm">
                      <SelectValue placeholder={t('sortBy') || 'Sort by'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">{t('popular') || 'Popular'}</SelectItem>
                      <SelectItem value="newest">{t('newest') || 'Newest'}</SelectItem>
                      <SelectItem value="price-low">{t('priceLowHigh') || 'Price: Low to High'}</SelectItem>
                      <SelectItem value="price-high">{t('priceHighLow') || 'Price: High to Low'}</SelectItem>
                      <SelectItem value="rating">{t('rating') || 'Rating'}</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View mode */}
                  <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products grid */}
              {filteredProducts.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.map(product => {
                      const monthlyPayment = Math.round((product.price * 1.15) / 12);
                      return (
                        <Link 
                          key={product.id} 
                          to={`/products/${product.id}`}
                          className="flex gap-4 md:gap-6 bg-card rounded-xl border border-border/50 p-3 md:p-4 hover:shadow-lg hover:border-primary/20 transition-all group"
                        >
                          {/* Image - Fixed small size */}
                          <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-muted/30 rounded-lg overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 min-w-0">
                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              {/* Installment Badge */}
                              <Badge variant="outline" className="mb-2 text-[10px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                                {formatPrice(monthlyPayment)} / {language === 'ru' ? 'мес' : language === 'uz' ? 'oy' : 'mo'}
                              </Badge>
                              
                              <h3 className="font-medium text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                {product.name}
                              </h3>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs">{product.rating}</span>
                                <span className="text-xs">({product.reviews} {t('reviews') || 'reviews'})</span>
                              </div>
                              
                              {/* Specs preview */}
                              {product.description && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-1 hidden md:block">
                                  {product.description}
                                </p>
                              )}
                            </div>
                            
                            {/* Price & Action */}
                            <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-3 shrink-0">
                              <div className="text-right">
                                <div className="text-lg md:text-xl font-bold text-foreground">
                                  {formatPrice(product.price)}
                                  <span className="text-xs font-normal text-muted-foreground ml-1">
                                    {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
                                  </span>
                                </div>
                                {product.originalPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                              
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart(product);
                                  toast({
                                    title: language === 'ru' ? 'Добавлено в корзину' : language === 'uz' ? 'Savatga qo\'shildi' : 'Added to cart',
                                    className: "border-l-4 border-l-primary",
                                  });
                                }}
                                variant="outline"
                                size="sm"
                                className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                <span className="hidden sm:inline">{t('addToCart') || 'Add to Cart'}</span>
                              </Button>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">{t('noProductsFound') || 'No products found'}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('tryAdjustingFilters') || 'Try adjusting your filters or search terms'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};


export default Products;