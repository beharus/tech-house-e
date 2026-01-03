import { Truck, Shield, CreditCard, Headphones, RotateCcw, Medal } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders over 500,000 sum',
  },
  {
    icon: Shield,
    title: 'Warranty',
    description: 'Official manufacturer warranty',
  },
  {
    icon: CreditCard,
    title: 'Installment',
    description: 'Buy now, pay later options',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Customer service around the clock',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '14 day return policy',
  },
  {
    icon: Medal,
    title: 'Quality Guarantee',
    description: '100% authentic products',
  },
];

const FeaturesSection = () => {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Tech House?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {features.map(feature => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-card hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
