import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

const slides = [
  {
    id: 1,
    title: 'Smart Home Collection',
    subtitle: 'Transform your living space',
    description: 'Up to 30% off on selected smart devices',
    image: heroBanner,
    cta: 'Shop Now',
    link: '/products?category=smart-home',
  },
  {
    id: 2,
    title: 'New Year Sale',
    subtitle: 'Limited time offer',
    description: 'Exclusive deals on kitchen appliances',
    image: heroBanner,
    cta: 'View Deals',
    link: '/products?discount=true',
  },
];

const flashDeals = [
  { id: 1, name: 'Smart Speaker', discount: 25, endTime: Date.now() + 3600000 * 5 },
  { id: 2, name: 'Robot Vacuum', discount: 20, endTime: Date.now() + 3600000 * 3 },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft: { [key: number]: string } = {};
      flashDeals.forEach(deal => {
        const diff = deal.endTime - Date.now();
        if (diff > 0) {
          const hours = Math.floor(diff / 3600000);
          const minutes = Math.floor((diff % 3600000) / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          newTimeLeft[deal.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimers();
    const timer = setInterval(updateTimers, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="container py-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main slider */}
        <div className="lg:col-span-2 relative rounded-xl overflow-hidden aspect-[16/9] lg:aspect-[2/1]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center">
                <div className="p-8 max-w-md">
                  <p className="text-accent-foreground text-sm font-medium mb-2">{slide.subtitle}</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-card mb-3">{slide.title}</h2>
                  <p className="text-card/80 mb-6">{slide.description}</p>
                  <Link to={slide.link}>
                    <Button size="lg" className="shadow-lg">
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary w-6' : 'bg-card/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flash deals */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold text-lg">Flash Deals</h3>
          </div>
          <div className="space-y-4">
            {flashDeals.map(deal => (
              <Link
                key={deal.id}
                to={`/products/${deal.id}`}
                className="block p-4 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{deal.name}</span>
                  <span className="text-destructive font-bold">-{deal.discount}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span className="font-mono">{timeLeft[deal.id] || '00:00:00'}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/products?discount=true" className="block mt-4">
            <Button variant="outline" className="w-full">
              View All Deals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
