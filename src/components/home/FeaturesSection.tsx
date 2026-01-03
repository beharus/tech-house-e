import { Truck, Shield, CreditCard, Headphones, RotateCcw, Medal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Truck,
      titleKey: 'freeDelivery',
      descKey: 'freeDeliveryDesc',
      gradient: 'from-primary/20 to-chart-1/20',
      iconColor: 'text-primary',
    },
    {
      icon: Shield,
      titleKey: 'warranty',
      descKey: 'warrantyDesc',
      gradient: 'from-chart-2/20 to-chart-3/20',
      iconColor: 'text-chart-2',
    },
    {
      icon: CreditCard,
      titleKey: 'installment',
      descKey: 'installmentDesc',
      gradient: 'from-chart-3/20 to-chart-4/20',
      iconColor: 'text-chart-3',
    },
    {
      icon: Headphones,
      titleKey: 'support',
      descKey: 'supportDesc',
      gradient: 'from-chart-4/20 to-primary/20',
      iconColor: 'text-chart-4',
    },
    {
      icon: RotateCcw,
      titleKey: 'easyReturns',
      descKey: 'easyReturnsDesc',
      gradient: 'from-primary/20 to-chart-2/20',
      iconColor: 'text-primary',
    },
    {
      icon: Medal,
      titleKey: 'qualityGuarantee',
      descKey: 'qualityGuaranteeDesc',
      gradient: 'from-chart-1/20 to-chart-2/20',
      iconColor: 'text-chart-1',
    },
  ];

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('whyChoose')}</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.titleKey}
            className="group relative overflow-hidden rounded-2xl bg-card p-8 transition-all duration-300 hover:shadow-xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
