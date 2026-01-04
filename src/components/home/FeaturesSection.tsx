import React from 'react';
import { Truck, Shield, CreditCard, Headphones, RotateCcw, Medal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Truck, titleKey: 'freeDelivery', descKey: 'freeDeliveryDesc' },
    { icon: Shield, titleKey: 'warranty', descKey: 'warrantyDesc' },
    { icon: CreditCard, titleKey: 'installment', descKey: 'installmentDesc' },
    { icon: Headphones, titleKey: 'support', descKey: 'supportDesc' },
    { icon: RotateCcw, titleKey: 'easyReturns', descKey: 'easyReturnsDesc' },
    { icon: Medal, titleKey: 'qualityGuarantee', descKey: 'qualityGuaranteeDesc' },
  ];

  return (
    <section className="container py-12 md:py-20 lg:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-gray-900">{t('whyChoose')}</h2>
        <div className="w-16 md:w-20 h-1.5 bg-violet-200 mx-auto rounded-full opacity-70" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        {features.map((feature, index) => (
          <div
            key={feature.titleKey}
            // Card base style: White background, subtle border.
            // Hover style: Border becomes transparent, adds a soft lift shadow.
            className="group relative overflow-hidden rounded-2xl md:rounded-[24px] bg-white p-6 lg:p-8 transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] border border-gray-100 hover:border-transparent"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 1. Card Main Hover Gradient (White to Violet) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white via-white to-violet-100/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0"
            />
            
            {/* Content Layer (z-10 to sit above backgrounds) */}
            <div className="relative z-10">
              {/* 2. Icon Container with Gradient Background (Matching reference image) */}
              {/* Using a soft gradient from purple-50 to violet-100 to get that specific look */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[20px] bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center mb-6 group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm">
                <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-violet-600" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 group-hover:text-violet-900 transition-colors duration-300">{t(feature.titleKey)}</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{t(feature.descKey)}</p>
            </div>

            {/* 3. Decorative Circle on Bottom Right */}
            {/* Large, subtle circle that becomes slightly more defined on hover */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-violet-100/50 blur-xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out z-0 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;