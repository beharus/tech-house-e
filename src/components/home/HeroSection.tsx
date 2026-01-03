import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { products as allProducts } from '@/data/products';
import heroBanner from '@/assets/hero-banner.jpg';

const slides = [
  {
    id: 1,
    titleKey: 'smartHomeCollection',
    title: { uz: 'Aqlli uy to\'plami', ru: 'Коллекция умного дома', en: 'Smart Home Collection' },
    subtitle: { uz: 'Uyingizni yangilang', ru: 'Преобразите свой дом', en: 'Transform your living space' },
    description: { uz: '30% gacha chegirma tanlangan qurilmalar uchun', ru: 'До 30% скидки на избранные устройства', en: 'Up to 30% off on selected smart devices' },
    image: heroBanner,
    link: '/products?category=smart-home',
    bg: 'bg-gradient-to-r from-primary/90 to-primary/70',
  },
  {
    id: 2,
    titleKey: 'newYearSale',
    title: { uz: 'Yangi yil aksiyasi', ru: 'Новогодняя распродажа', en: 'New Year Sale' },
    subtitle: { uz: 'Cheklangan vaqt taklifi', ru: 'Ограниченное предложение', en: 'Limited time offer' },
    description: { uz: 'Oshxona jihozlariga eksklyuziv chegirmalar', ru: 'Эксклюзивные скидки на кухонную технику', en: 'Exclusive deals on kitchen appliances' },
    image: heroBanner,
    link: '/products?discount=true',
    bg: 'bg-gradient-to-r from-chart-4/90 to-chart-3/70',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 9, seconds: 41 });
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const { language, t } = useLanguage();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const flashDeals = allProducts.filter(p => p.discount).slice(0, 4);

  // Auto slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection('right');
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
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
    setSlideDirection('right');
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const nextDeal = () => setCurrentDealIndex(prev => (prev + 1) % flashDeals.length);
  const prevDeal = () => setCurrentDealIndex(prev => (prev - 1 + flashDeals.length) % flashDeals.length);

  const currentDeal = flashDeals[currentDealIndex];

  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0').split('');

  return (
    <section className="container py-6 pt-[180px]">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main slider */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[2/1]">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-transform duration-500 ease-out ${
                  index === currentSlide 
                    ? 'translate-x-0' 
                    : index < currentSlide 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                }`}
              >
                <div className={`absolute inset-0 ${slide.bg}`} />
                <img
                  src={slide.image}
                  alt={slide.title[language]}
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="p-8 max-w-md">
                    <p className="text-primary-foreground/80 text-sm font-medium mb-2">
                      {slide.subtitle[language]}
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
                      {slide.title[language]}
                    </h2>
                    <p className="text-primary-foreground/80 mb-6">
                      {slide.description[language]}
                    </p>
                    <Link to={slide.link}>
                      <Button size="lg" variant="secondary" className="shadow-lg">
                        {t('shopNow')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 hover:bg-card flex items-center justify-center transition-colors shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 hover:bg-card flex items-center justify-center transition-colors shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/40 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flash deals */}
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          {/* Header with timer */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">{t('flashDeals')}</h3>
            <div className="flex items-center gap-1">
              {formatTimeUnit(timeLeft.hours).map((digit, i) => (
                <span key={`h-${i}`} className="w-7 h-8 bg-foreground text-background rounded flex items-center justify-center font-mono font-bold text-sm">
                  {digit}
                </span>
              ))}
              <span className="font-bold mx-0.5">:</span>
              {formatTimeUnit(timeLeft.minutes).map((digit, i) => (
                <span key={`m-${i}`} className="w-7 h-8 bg-foreground text-background rounded flex items-center justify-center font-mono font-bold text-sm">
                  {digit}
                </span>
              ))}
              <span className="font-bold mx-0.5">:</span>
              {formatTimeUnit(timeLeft.seconds).map((digit, i) => (
                <span key={`s-${i}`} className="w-7 h-8 bg-foreground text-background rounded flex items-center justify-center font-mono font-bold text-sm">
                  {digit}
                </span>
              ))}
            </div>
          </div>

          {/* Deal content */}
          {currentDeal && (
            <Link to={`/products/${currentDeal.id}`} className="block">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/30 mb-4">
                <img
                  src={currentDeal.image}
                  alt={currentDeal.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              <div className="flex gap-2 mb-3">
                <Badge variant="destructive">-{currentDeal.discount}%</Badge>
                <Badge className="bg-destructive/10 text-destructive border-0">{t('discount')}</Badge>
              </div>
              
              <h4 className="font-medium mb-2 line-clamp-2">{currentDeal.name}</h4>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm border border-border rounded px-2 py-0.5">
                  {formatPrice(Math.round(currentDeal.price / 12))} {language === 'en' ? 'sum/mo' : language === 'ru' ? 'сум/мес' : "so'm/oy"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  {currentDeal.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(currentDeal.originalPrice)} {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
                    </p>
                  )}
                  <p className="text-xl font-bold">
                    {formatPrice(currentDeal.price)} {language === 'en' ? 'sum' : language === 'ru' ? 'сум' : "so'm"}
                  </p>
                </div>
                <Button size="icon" className="h-10 w-10 rounded-xl">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </Link>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prevDeal}
              className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {flashDeals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDealIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentDealIndex ? 'bg-destructive' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextDeal}
              className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
