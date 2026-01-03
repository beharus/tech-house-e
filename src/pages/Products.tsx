import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { products, categories, brands } from '@/data/products';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const showDiscount = searchParams.get('discount') === 'true';
  const showNew = searchParams.get('new') === 'true';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
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

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by discount
    if (showDiscount) {
      result = result.filter(p => p.discount);
    }

    // Filter by new
    if (showNew) {
      result = result.filter(p => p.isNew);
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      // Note: For demo, all products would need brand field
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
  }, [categoryParam, searchQuery, showDiscount, showNew, selectedCategories, selectedBrands, sortBy]);

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

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat.id) || categoryParam === cat.id}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range could be added here */}
    </div>
  );

  const pageTitle = useMemo(() => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (showDiscount) return 'Deals & Discounts';
    if (showNew) return 'New Arrivals';
    if (categoryParam) {
      const cat = categories.find(c => c.id === categoryParam);
      return cat?.name || 'Products';
    }
    return 'All Products';
  }, [searchQuery, showDiscount, showNew, categoryParam]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <span>Home</span> / <span className="text-foreground">{pageTitle}</span>
          </nav>

          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32 bg-card rounded-xl p-6">
                <FilterSidebar />
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{pageTitle}</h1>
                  <p className="text-muted-foreground">
                    {filteredProducts.length} products found
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile filter */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <h2 className="font-semibold text-lg mb-6">Filters</h2>
                      <FilterSidebar />
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
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
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
