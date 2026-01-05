import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/context/CartContext';

interface SearchAutocompleteProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
  onSearch: (e: React.FormEvent) => void;
}

const SearchAutocomplete = ({ searchQuery, setSearchQuery, placeholder, onSearch }: SearchAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('techhouse-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      const matches = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('techhouse-recent-searches', JSON.stringify(updated));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      setIsOpen(false);
      onSearch(e);
    }
  };

  const handleProductClick = (productId: string) => {
    saveSearch(searchQuery);
    setIsOpen(false);
    navigate(`/products/${productId}`);
  };

  const handleRecentClick = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    setIsOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('techhouse-recent-searches');
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('uz-UZ').format(price);

  const trendingSearches = ['Samsung', 'iPhone', 'Robot Vacuum', 'Air Conditioner', 'Headphones'];

  return (
    <div className="relative flex-1 max-w-xl">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder + "|"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="w-full h-9 md:h-10 px-3 md:px-4 pr-10 md:pr-12 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>
      </form>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-xl border border-border/50 overflow-hidden z-50"
        >
          {suggestions.length > 0 ? (
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-3 py-2">{t('products')}</p>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-muted/50 rounded-lg overflow-hidden shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary shrink-0">
                    {formatPrice(product.price)} so'm
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-2">
              {recentSearches.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {t('recentSearches') || 'Recent Searches'}
                    </p>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('clear') || 'Clear'}
                    </button>
                  </div>
                  {recentSearches.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecentClick(query)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{query}</span>
                    </button>
                  ))}
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 px-3 py-2">
                  <TrendingUp className="h-3 w-3" />
                  {t('trending') || 'Trending'}
                </p>
                {trendingSearches.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRecentClick(query)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{query}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;