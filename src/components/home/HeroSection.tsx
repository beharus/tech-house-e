import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Zap,
  Star,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { products as allProducts } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";
import heroBanner1 from "@/assets/hero-banner1.jpg";
import heroBanner2 from "@/assets/hero-banner2.jpg";

const slides = [
  {
    id: 1,
    titleKey: "smartHomeCollection",
    title: {
      uz: "Aqlli uy to'plami",
      ru: "Коллекция умного дома",
      en: "Smart Home Collection",
    },
    subtitle: {
      uz: "Uyingizni yangilang",
      ru: "Преобразите свой дом",
      en: "Transform your living space",
    },
    description: {
      uz: "30% gacha chegirma tanlangan qurilmalar uchun",
      ru: "До 30% скидки на избранные устройства",
      en: "Up to 30% off on selected smart devices",
    },
    image: heroBanner1,
    link: "/products?category=smart-home",
    bg: "bg-gradient-to-r from-primary/90 to-primary/70",
  },
  {
    id: 2,
    titleKey: "newYearSale",
    title: {
      uz: "Yangi yil aksiyasi",
      ru: "Новогодняя распродажа",
      en: "New Year Sale",
    },
    subtitle: {
      uz: "Cheklangan vaqt taklifi",
      ru: "Ограниченное предложение",
      en: "Limited time offer",
    },
    description: {
      uz: "Oshxona jihozlariga eksklyuziv chegirmalar",
      ru: "Эксклюзивные скидки на кухонную технику",
      en: "Exclusive deals on kitchen appliances",
    },
    image: heroBanner,
    link: "/products?discount=true",
    bg: "bg-gradient-to-r from-primary/20 to-primary",
  },
  {
    id: 3,
    titleKey: "ArtelCollections",
    title: {
      uz: "Artel maxsulotlariga chegirma",
      ru: "Скидка на продукцию Artel.",
      en: "Discount on Artel products",
    },
    subtitle: {
      uz: "Uyingizni yangilang",
      ru: "Преобразите свой дом",
      en: "Transform your living space",
    },
    description: {
      uz: "50% gacha chegirma tanlangan qurilmalar uchun",
      ru: "До 50% скидки на избранные устройства",
      en: "Up to 50% off on selected smart devices",
    },
    image: heroBanner2,
    link: "/products?category=smart-home",
    bg: "bg-gradient-to-r from-primary/20 to-primary/70",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ").format(price);
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 0,
    seconds: 44,
  });
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const { language, t } = useLanguage();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const flashDeals = allProducts.filter((p) => p.discount).slice(0, 4);

  // Auto slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection("right");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const nextSlide = () => {
    setSlideDirection("right");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideDirection("left");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextDeal = () =>
    setCurrentDealIndex((prev) => (prev + 1) % flashDeals.length);
  const prevDeal = () =>
    setCurrentDealIndex(
      (prev) => (prev - 1 + flashDeals.length) % flashDeals.length
    );

  const currentDeal = flashDeals[currentDealIndex];

  // Helper to split digits for the timer view
  const formatDigits = (value: number) =>
    value.toString().padStart(2, "0").split("");

  return (
    <section className="container py-4 md:py-6 pt-[140px] md:pt-[160px] lg:pt-[180px]">
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
        {/* --- Main Slider --- */}
        <div className="lg:col-span-2 relative rounded-xl md:rounded-2xl overflow-hidden h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] shadow-md group/slider">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-transform duration-500 ease-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
              >
                <div className={`absolute inset-0 ${slide.bg}`} />
                <img
                  src={slide.image}
                  alt={slide.title[language]}
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 flex items-center pl-6 md:pl-16 pr-6">
                  <div className="max-w-md flex flex-col items-start text-left z-10">
                    <Badge
                      variant="secondary"
                      className="mb-3 px-3 py-1 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md"
                    >
                      {slide.subtitle[language]}
                    </Badge>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                      {slide.title[language]}
                    </h2>
                    <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-lg font-medium max-w-sm drop-shadow line-clamp-2">
                      {slide.description[language]}
                    </p>
                    <Link to={slide.link}>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="font-semibold shadow-lg hover:scale-105 transition-transform"
                      >
                        {t("shopNow")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all backdrop-blur-sm opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all backdrop-blur-sm opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-8 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/40 w-2 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- Flash Deals (Responsive Fix & New Pagination) --- */}
        <div className="bg-gradient-to-br from-card to-card/90 rounded-xl md:rounded-2xl shadow-xl border border-border/40 overflow-hidden flex flex-col h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-4 py-4 shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-8" />
            <div className="relative z-10 flex flex-wrap gap-y-3 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg animate-pulse">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-white leading-tight">
                    {t("flashDeals")}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] md:text-xs text-white/80 font-medium">
                    <Flame className="w-3 h-3 text-orange-300 fill-orange-300" />
                    <span>{t("hotDeals") || "Hot Deals"}</span>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1.5 ml-auto sm:ml-0">
                {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map(
                  (time, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {idx > 0 && (
                        <span className="text-white/70 font-bold text-sm">
                          :
                        </span>
                      )}
                      <div className="flex gap-0.5">
                        {formatDigits(time).map((digit, i) => (
                          <div
                            key={`${idx}-${i}`}
                            className={`w-4 h-5 md:w-5 md:h-6 ${
                              idx === 2 ? "bg-red-500" : "bg-white"
                            } rounded-[2px] flex items-center justify-center text-xs md:text-sm font-bold ${
                              idx === 2 ? "text-white" : "text-primary"
                            } shadow-sm`}
                          >
                            {digit}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Product Content - Responsive Grid */}
          {currentDeal && (
            <div className="flex-1 flex flex-col p-4 md:p-5 relative">
              <Link
                to={`/products/${currentDeal.id}`}
                className="flex-1 flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 group"
              >
                {/* Image Section: 
                    - Mobile: Full width
                    - Tablet/Desktop: 40% width fixed
                */}
                <div className="relative w-full sm:w-[40%] aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-auto bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 flex items-center justify-center overflow-hidden border border-border/20 group-hover:border-primary/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={currentDeal.image}
                    alt={currentDeal.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-sm px-2 py-0.5 text-[10px] sm:text-xs font-bold w-fit">
                    -{currentDeal.discount}%
                  </Badge>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    {/* Title */}
                    <h4 className="font-bold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {currentDeal.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs bg-primary/5 text-primary border-primary/20 px-1.5 py-0 h-5 gap-1"
                      >
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        {currentDeal.rating || "4.5"}
                      </Badge>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {currentDeal.reviews || 128} {t("reviews") || "reviews"}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="space-y-4 mt-auto">
                    <div className="flex flex-col-reverse flex-wrap items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        {formatPrice(currentDeal.price)}
                        <span className="text-xs font-normal text-muted-foreground ml-1">
                          {language === "en"
                            ? "sum"
                            : language === "ru"
                            ? "сум"
                            : "so'm"}
                        </span>
                      </span>
                      {currentDeal.originalPrice && (
                        <span className="text-xs sm:text-sm text-muted-foreground line-through">
                          {formatPrice(currentDeal.originalPrice)}
                          <span className="text-xs font-normal text-muted-foreground ml-1">
                            {language === "en"
                              ? "sum"
                              : language === "ru"
                              ? "сум"
                              : "so'm"}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="w-full h-10 rounded-lg shadow-md bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-sm font-semibold"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t("addToCart") || "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Footer: Pagination (Dots) & Controls */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/40">
                {/* Custom Dot Pagination */}
                <div className="flex items-center gap-1.5">
                  {flashDeals.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentDealIndex
                          ? "w-6 bg-primary" // Active stick
                          : "w-1.5 bg-muted-foreground/30" // Inactive dot
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      prevDeal();
                    }}
                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-foreground/70"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      nextDeal();
                    }}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
