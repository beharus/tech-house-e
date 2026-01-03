import { useLanguage } from '@/context/LanguageContext';

const brands = [
  'Samsung', 'LG', 'Xiaomi', 'Dyson', 'Bosch', 'Philips', 'Sony', 'Tefal'
];

const BrandsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">{t('popularBrands')}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {brands.map(brand => (
          <div
            key={brand}
            className="flex items-center justify-center px-8 py-4 bg-card rounded-xl hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsSection;
