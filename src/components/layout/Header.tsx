import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  ChevronDown,
  Phone,
  MapPin,
  X,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { useLanguage, Language } from "@/context/LanguageContext";
import { categories } from "@/data/products";

const searchPlaceholders = [
  "searchPhone",
  "searchFridge",
  "searchTV",
  "searchLaptop",
  "searchHeadphones",
];

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

// Mega menu subcategories
const megaMenuData: Record<string, { title: string; items: string[] }[]> = {
  "smart-home": [
    {
      title: "Smart Speakers",
      items: ["Yandex Station", "Amazon Echo", "Google Home", "HomePod"],
    },
    {
      title: "Smart Lighting",
      items: ["Philips Hue", "Xiaomi Mi", "IKEA Tradfri"],
    },
    { title: "Security", items: ["Cameras", "Sensors", "Smart Locks"] },
  ],
  kitchen: [
    {
      title: "Cooking",
      items: ["Ovens", "Cooktops", "Microwaves", "Air Fryers"],
    },
    {
      title: "Coffee & Tea",
      items: ["Espresso Machines", "Coffee Makers", "Kettles"],
    },
    { title: "Food Prep", items: ["Blenders", "Mixers", "Food Processors"] },
  ],
  cleaning: [
    { title: "Vacuums", items: ["Robot Vacuums", "Cordless", "Handheld"] },
    { title: "Floor Care", items: ["Steam Mops", "Carpet Cleaners"] },
    { title: "Air Care", items: ["Humidifiers", "Air Purifiers"] },
  ],
  climate: [
    { title: "Cooling", items: ["Air Conditioners", "Fans", "Portable AC"] },
    { title: "Heating", items: ["Heaters", "Radiators", "Heat Pumps"] },
    {
      title: "Air Quality",
      items: ["Purifiers", "Humidifiers", "Dehumidifiers"],
    },
  ],
  electronics: [
    {
      title: "TV & Video",
      items: ["Smart TVs", "Projectors", "Streaming Devices"],
    },
    { title: "Audio", items: ["Headphones", "Speakers", "Soundbars"] },
    { title: "Phones", items: ["Smartphones", "Accessories", "Chargers"] },
  ],
  "personal-care": [
    { title: "Hair Care", items: ["Hair Dryers", "Straighteners", "Curlers"] },
    { title: "Grooming", items: ["Shavers", "Trimmers", "Epilators"] },
    { title: "Health", items: ["Massagers", "Scales", "Blood Pressure"] },
  ],
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { totalItems, wishlist } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  // Apple-style scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setShowCatalog(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Close catalog when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(e.target as Node)
      ) {
        setShowCatalog(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getCategoryTranslation = (name: string) => {
    const translationKey = name.toLowerCase().replace(/\s+/g, "");
    const keyMap: { [key: string]: string } = {
      smarthome: "smartHome",
      kitchen: "kitchen",
      cleaning: "cleaning",
      climate: "climate",
      electronics: "electronics",
      personalcare: "personalCare",
    };
    return t(keyMap[translationKey] || name);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-card shadow-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 md:py-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Tashkent</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +998 71 200 00 00
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/stores"
              className="hover:opacity-80 transition-opacity hidden sm:block"
            >
              {t("ourStores")}
            </Link>
            <Link
              to="/delivery"
              className="hover:opacity-80 transition-opacity hidden sm:block"
            >
              {t("delivery")}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <Globe className="h-3 w-3" />
                  {languages.find((l) => l.code === language)?.flag}
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
      <div className="container py-2 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    className="text-base md:text-lg hover:text-primary transition-colors"
                  >
                    {getCategoryTranslation(cat.name)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <svg
              width="25"
              height="42"
              viewBox="0 0 324 449"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H324V60L0 148V0Z" fill="#6c28d9" />
              <path
                d="M166 106.463L290 217L78 448.463L166 106.463Z"
                fill="#8b5cf6"
              />
            </svg>

            <span className="hidden -ml-1 sm:block text-lg md:text-xl font-bold text-foreground">
              ech
              House
            </span>
          </Link>

          {/* Catalog button */}
          <div className="hidden lg:block relative" ref={catalogRef}>
            <Button
              onClick={() => setShowCatalog(!showCatalog)}
              className="gap-2 bg-gradient-to-r from-primary to-primary/90"
            >
              {showCatalog ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              {t("catalog")}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showCatalog ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Mega Menu */}
            {showCatalog && (
              <div className="absolute top-full left-0 mt-2 bg-card rounded-xl shadow-2xl border border-border overflow-hidden z-50 flex min-w-[700px]">
                {/* Categories List */}
                <div className="w-64 bg-muted/30 border-r border-border">
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        onClick={() => setShowCatalog(false)}
                        onMouseEnter={() => setHoveredCategory(cat.id)}
                        className={`flex items-center justify-between px-4 py-3 hover:bg-primary/10 transition-colors ${
                          hoveredCategory === cat.id
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                      >
                        <span className="font-medium">
                          {getCategoryTranslation(cat.name)}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                </div>

                {/* Subcategories */}
                <div className="flex-1 p-6 grid grid-cols-3 gap-6">
                  {hoveredCategory &&
                    megaMenuData[hoveredCategory]?.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm text-primary mb-3">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i}>
                              <Link
                                to={`/products?category=${hoveredCategory}&q=${item}`}
                                onClick={() => setShowCatalog(false)}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  {!hoveredCategory && (
                    <div className="col-span-3 flex items-center justify-center text-muted-foreground">
                      <p>
                        {t("hoverCategory") ||
                          "Hover over a category to see items"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="search"
                placeholder={placeholder + "|"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 md:h-10 px-3 md:px-4 pr-10 md:pr-12 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8"
              >
                <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link to="/wishlist" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 md:h-10 md:w-10"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs bg-red-500">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 md:h-10 md:w-10"
              >
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/auth">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex h-9 w-9 md:h-10 md:w-10"
              >
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories nav - Desktop */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container">
          <ul className="flex items-center gap-4 md:gap-6 py-2 md:py-3">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
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
