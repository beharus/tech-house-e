import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown, Phone, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCatalog, setShowCatalog] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Tashkent
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +998 71 200 00 00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/stores" className="hover:text-primary-foreground/80 transition-colors">
              Our Stores
            </Link>
            <Link to="/delivery" className="hover:text-primary-foreground/80 transition-colors">
              Delivery
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    className="text-lg hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">TH</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-foreground">
              Tech House
            </span>
          </Link>

          {/* Catalog button */}
          <div className="hidden lg:block relative">
            <Button
              onClick={() => setShowCatalog(!showCatalog)}
              className="gap-2"
            >
              {showCatalog ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Catalog
              <ChevronDown className={`h-4 w-4 transition-transform ${showCatalog ? 'rotate-180' : ''}`} />
            </Button>

            {showCatalog && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border p-2 z-50">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setShowCatalog(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 bg-background"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories nav - Desktop */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container">
          <ul className="flex items-center gap-6 py-3">
            {categories.slice(0, 6).map(cat => (
              <li key={cat.id}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
