import { Truck, Shield, CreditCard, Headphones, RotateCcw, Medal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Truck,
      titleKey: 'freeDelivery',
      descKey: 'freeDeliveryDesc',
      gradientFrom: 'from-violet-500',
      gradientTo: 'to-purple-600',
      bgGradient: 'from-violet-500/10 to-purple-600/10',
    },
    {
      icon: Shield,
      titleKey: 'warranty',
      descKey: 'warrantyDesc',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-600/10',
    },
    {
      icon: CreditCard,
      titleKey: 'installment',
      descKey: 'installmentDesc',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-600',
      bgGradient: 'from-emerald-500/10 to-teal-600/10',
    },
    {
      icon: Headphones,
      titleKey: 'support',
      descKey: 'supportDesc',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-amber-600',
      bgGradient: 'from-orange-500/10 to-amber-600/10',
    },
    {
      icon: RotateCcw,
      titleKey: 'easyReturns',
      descKey: 'easyReturnsDesc',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-rose-600',
      bgGradient: 'from-pink-500/10 to-rose-600/10',
    },
    {
      icon: Medal,
      titleKey: 'qualityGuarantee',
      descKey: 'qualityGuaranteeDesc',
      gradientFrom: 'from-cyan-500',
      gradientTo: 'to-sky-600',
      bgGradient: 'from-cyan-500/10 to-sky-600/10',
    },
  ];

  return (
    <section className="container py-8 md:py-12 lg:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{t('whyChoose')}</h2>
        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.titleKey}
            className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-card p-5 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl border border-border/50 hover:border-primary/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient background on hover - using inline style for dynamic gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary`} />
              </div>
              
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">{t(feature.titleKey)}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
            </div>

            {/* Decorative element */}
            <div className={`absolute -bottom-4 -right-4 w-20 md:w-24 h-20 md:h-24 rounded-full bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} opacity-5 group-hover:scale-150 group-hover:opacity-10 transition-all duration-500`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
