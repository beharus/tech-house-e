import { MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

// Store data with translations
const stores = [
  {
    id: 1,
    nameKey: 'storeChilanzar',
    address: 'Chilanzar tumani, Bunyodkor ko\'chasi 15',
    phone: '+998 71 200 01 01',
    hours: '09:00 - 21:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2!3d41.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzAwLjAiTiA2OcKwMTInMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
  },
  {
    id: 2,
    nameKey: 'storeSergeli',
    address: 'Sergeli tumani, Yangi Sergeli MFY',
    phone: '+998 71 200 02 02',
    hours: '09:00 - 21:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.3!3d41.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEyJzAwLjAiTiA2OcKwMTgnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
  },
  {
    id: 3,
    nameKey: 'storeYunusabad',
    address: 'Yunusobod tumani, Amir Temur ko\'chasi 88',
    phone: '+998 71 200 03 03',
    hours: '09:00 - 21:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.28!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDIxJzAwLjAiTiA2OcKwMTYnNDguMCJF!5e0!3m2!1sen!2s!4v1234567890'
  },
  {
    id: 4,
    nameKey: 'storeSamarkand',
    address: 'Samarqand shahri, Registon ko\'chasi 45',
    phone: '+998 66 233 04 04',
    hours: '09:00 - 20:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.5!2d66.96!3d39.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzAwLjAiTiA2NsKwNTcnMzYuMCJF!5e0!3m2!1sen!2s!4v1234567890'
  },
  {
    id: 5,
    nameKey: 'storeBukhara',
    address: 'Buxoro shahri, Navoi ko\'chasi 32',
    phone: '+998 65 221 05 05',
    hours: '09:00 - 20:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.5!2d64.42!3d39.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzEyLjAiTiA2NMKwMjUnMTIuMCJF!5e0!3m2!1sen!2s!4v1234567890'
  }
];

const StoreLocationsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {t('ourStores')}
        </h2>

        {/* Main Map - Shows Tashkent area */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191884.7!2d69.1!3d41.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tech House Stores Map"
          />
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Card key={store.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Store Name */}
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  {t(store.nameKey)}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm">{store.address}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm">{store.phone}</span>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm">{store.hours}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreLocationsSection;
