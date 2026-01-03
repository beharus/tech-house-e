import { brands } from '@/data/products';

const BrandsSection = () => {
  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Brands</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {brands.map(brand => (
          <div
            key={brand}
            className="flex items-center justify-center p-4 rounded-xl bg-card hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
          >
            <span className="font-semibold text-muted-foreground hover:text-primary transition-colors">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsSection;
