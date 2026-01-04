import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, ArrowRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: Path:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-2xl w-full text-center z-10">
        {/* Modern Icon/Graphic */}
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl rotate-12 absolute inset-0 animate-pulse" />
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center relative shadow-xl shadow-primary/20">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          {/* 404 Tag */}
          <div className="absolute -bottom-2 -right-6 bg-background border-2 border-primary text-primary font-bold px-3 py-1 rounded-full text-sm shadow-lg">
            Error 404
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          {t('lostInStore') || "This aisle seems empty"}
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          {t('notFoundDesc') || "We couldn't find the product or page you're looking for. Let's get you back to the best deals!"}
        </p>

        {/* Action Grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
          <Link to="/" className="w-full">
            <Button 
              className="w-full h-16 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-2xl group"
            >
              <Home className="mr-2 h-5 w-5" />
              {t('goHome') || "Back to Home"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link to="/products" className="w-full">
            <Button 
              variant="outline" 
              className="w-full h-16 text-lg border-primary/20 text-primary hover:bg-primary/5 rounded-2xl"
            >
              <Search className="mr-2 h-5 w-5" />
              {t('browseProducts') || "Browse Store"}
            </Button>
          </Link>
        </div>

        {/* Helpful Links/Footer Style */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            {t('popularCategories') || "Or try one of these categories:"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Smartphones', 'Laptops', 'Appliances', 'Kitchen'].map((cat) => (
              <Link 
                key={cat}
                to={`/products?category=${cat.toLowerCase()}`}
                className="text-sm font-medium text-primary/70 hover:text-primary transition-colors bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;