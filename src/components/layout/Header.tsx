import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown, Phone, MapPin, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { useLanguage, Language } from '@/context/LanguageContext';
import { categories } from '@/data/products';

const searchPlaceholders = ['searchPhone', 'searchFridge', 'searchTV', 'searchLaptop', 'searchHeadphones'];

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCatalog, setShowCatalog] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { totalItems } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);

  // Apple-style scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Typing animation for search placeholder
  useEffect(() => {
    const currentPlaceholder = t(searchPlaceholders[placeholderIndex]);
    
    if (isTyping) {
      if (charIndex < currentPlaceholder.length) {
        const timeout = setTimeout(() => {
          setPlaceholder(currentPlaceholder.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setPlaceholder(currentPlaceholder.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setPlaceholderIndex((placeholderIndex + 1) % searchPlaceholders.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, placeholderIndex, t]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getCategoryTranslation = (name: string) => {
    const translationKey = name.toLowerCase().replace(/\s+/g, '');
    const keyMap: { [key: string]: string } = {
      'smarthome': 'smartHome',
      'kitchen': 'kitchen',
      'cleaning': 'cleaning',
      'climate': 'climate',
      'electronics': 'electronics',
      'personalcare': 'personalCare',
    };
    return t(keyMap[translationKey] || name);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-card shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
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
            <Link to="/stores" className="hover:opacity-80 transition-opacity">
              {t('ourStores')}
            </Link>
            <Link to="/delivery" className="hover:opacity-80 transition-opacity">
              {t('delivery')}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <Globe className="h-3 w-3" />
                  {languages.find(l => l.code === language)?.flag}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="gap-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                    {getCategoryTranslation(cat.name)}
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
              {t('catalog')}
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
                    {getCategoryTranslation(cat.name)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="search"
                placeholder={placeholder + '|'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 px-4 pr-12 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                  {getCategoryTranslation(cat.name)}
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
