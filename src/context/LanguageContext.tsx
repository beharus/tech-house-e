import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'uz' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  ourStores: { uz: 'Magazinlarimiz', ru: 'Наши магазины', en: 'Our Stores' },
  delivery: { uz: 'Yetkazib berish', ru: 'Доставка', en: 'Delivery' },
  catalog: { uz: 'Katalog', ru: 'Каталог', en: 'Catalog' },
  search: { uz: "Qidirish...", ru: 'Поиск...', en: 'Search...' },
  
  // Search placeholders for animation
  searchPhone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
  searchFridge: { uz: 'Muzlatgich', ru: 'Холодильник', en: 'Fridge' },
  searchTV: { uz: 'Televizor', ru: 'Телевизор', en: 'TV' },
  searchLaptop: { uz: 'Noutbuk', ru: 'Ноутбук', en: 'Laptop' },
  searchHeadphones: { uz: "Quloqchinlar", ru: 'Наушники', en: 'Headphones' },
  
  // Categories
  discounts: { uz: 'Aksiya va chegirmalar', ru: 'Акции и скидки', en: 'Sales & Discounts' },
  smartphones: { uz: 'Smartfonlar', ru: 'Смартфоны', en: 'Smartphones' },
  airConditioners: { uz: 'Konditsionerlar', ru: 'Кондиционеры', en: 'Air Conditioners' },
  heaters: { uz: 'Isitgichlar', ru: 'Обогреватели', en: 'Heaters' },
  vacuumCleaners: { uz: 'Changyutgichlar', ru: 'Пылесосы', en: 'Vacuum Cleaners' },
  refrigerators: { uz: 'Muzlatgichlar', ru: 'Холодильники', en: 'Refrigerators' },
  laptops: { uz: 'Noutbuklar', ru: 'Ноутбуки', en: 'Laptops' },
  televisions: { uz: 'Televizorlar', ru: 'Телевизоры', en: 'Televisions' },
  smartHome: { uz: 'Aqlli uy', ru: 'Умный дом', en: 'Smart Home' },
  kitchen: { uz: 'Oshxona', ru: 'Кухня', en: 'Kitchen' },
  cleaning: { uz: 'Tozalash', ru: 'Уборка', en: 'Cleaning' },
  climate: { uz: 'Iqlim', ru: 'Климат', en: 'Climate' },
  electronics: { uz: 'Elektronika', ru: 'Электроника', en: 'Electronics' },
  personalCare: { uz: 'Shaxsiy parvarish', ru: 'Личная гигиена', en: 'Personal Care' },
  
  // Hero
  flashDeals: { uz: 'Kunning tovarlari', ru: 'Товары дня', en: 'Flash Deals' },
  viewAllDeals: { uz: 'Barcha aksiyalar', ru: 'Все акции', en: 'View All Deals' },
  shopNow: { uz: 'Xarid qilish', ru: 'Купить', en: 'Shop Now' },
  
  // Product sections
  hotDeals: { uz: 'Aksiya mahsulotlari', ru: 'Горячие предложения', en: 'Hot Deals' },
  newArrivals: { uz: 'Yangi kelganlar', ru: 'Новинки', en: 'New Arrivals' },
  bestSellers: { uz: 'Eng ko\'p sotilganlar', ru: 'Хиты продаж', en: 'Best Sellers' },
  recentlyViewed: { uz: 'Yaqinda ko\'rilganlar', ru: 'Недавно просмотренные', en: 'Recently Viewed' },
  viewAll: { uz: 'Barchasi', ru: 'Смотреть все', en: 'View All' },
  
  // Product card
  inStock: { uz: 'Mavjud', ru: 'В наличии', en: 'In Stock' },
  outOfStock: { uz: 'Mavjud emas', ru: 'Нет в наличии', en: 'Out of Stock' },
  addToCart: { uz: 'Savatga qo\'shish', ru: 'В корзину', en: 'Add to Cart' },
  new: { uz: 'Yangi', ru: 'Новинка', en: 'New' },
  discount: { uz: 'Chegirma', ru: 'Скидка', en: 'Discount' },
  perMonth: { uz: 'oyiga', ru: 'в месяц', en: '/month' },
  
  // Features section
  whyChoose: { uz: 'Nega aynan Tech House?', ru: 'Почему Tech House?', en: 'Why Choose Tech House?' },
  freeDelivery: { uz: 'Bepul yetkazib berish', ru: 'Бесплатная доставка', en: 'Free Delivery' },
  freeDeliveryDesc: { uz: '500 000 so\'mdan ortiq buyurtmalar uchun', ru: 'При заказе от 500 000 сум', en: 'On orders over 500,000 sum' },
  warranty: { uz: 'Kafolat', ru: 'Гарантия', en: 'Warranty' },
  warrantyDesc: { uz: 'Rasmiy ishlab chiqaruvchi kafolati', ru: 'Официальная гарантия производителя', en: 'Official manufacturer warranty' },
  installment: { uz: 'Bo\'lib to\'lash', ru: 'Рассрочка', en: 'Installment' },
  installmentDesc: { uz: 'Qulay bo\'lib to\'lash shartlari', ru: 'Удобная рассрочка', en: 'Buy now, pay later options' },
  support: { uz: '24/7 Qo\'llab-quvvatlash', ru: 'Поддержка 24/7', en: '24/7 Support' },
  supportDesc: { uz: 'Kunlik mijozlarga xizmat ko\'rsatish', ru: 'Обслуживание клиентов 24/7', en: 'Customer service around the clock' },
  easyReturns: { uz: 'Oson qaytarish', ru: 'Лёгкий возврат', en: 'Easy Returns' },
  easyReturnsDesc: { uz: '14 kun ichida qaytarish siyosati', ru: 'Возврат в течение 14 дней', en: '14 day return policy' },
  qualityGuarantee: { uz: 'Sifat kafolati', ru: 'Гарантия качества', en: 'Quality Guarantee' },
  qualityGuaranteeDesc: { uz: '100% asl mahsulotlar', ru: '100% подлинные товары', en: '100% authentic products' },
  
  // Footer
  companyInfo: { uz: 'Uy jihozlari va elektronika uchun ishonchli hamkoringiz.', ru: 'Ваш надежный партнер по бытовой технике и электронике.', en: 'Your trusted partner for quality household appliances and electronics.' },
  information: { uz: 'Ma\'lumot', ru: 'Информация', en: 'Information' },
  aboutUs: { uz: 'Biz haqimizda', ru: 'О нас', en: 'About Us' },
  paymentMethods: { uz: 'To\'lov usullari', ru: 'Способы оплаты', en: 'Payment Methods' },
  returns: { uz: 'Qaytarish', ru: 'Возврат', en: 'Returns' },
  customerService: { uz: 'Mijozlarga xizmat', ru: 'Обслуживание клиентов', en: 'Customer Service' },
  contactUs: { uz: 'Biz bilan bog\'lanish', ru: 'Связаться с нами', en: 'Contact Us' },
  faq: { uz: 'Savol-javoblar', ru: 'Вопросы и ответы', en: 'FAQ' },
  storeLocations: { uz: 'Magazinlar manzili', ru: 'Адреса магазинов', en: 'Store Locations' },
  loyaltyProgram: { uz: 'Sodiqlik dasturi', ru: 'Программа лояльности', en: 'Loyalty Program' },
  supportCenter: { uz: 'Qo\'llab-quvvatlash markazi', ru: 'Центр поддержки', en: 'Support Center' },
  allRightsReserved: { uz: 'Barcha huquqlar himoyalangan.', ru: 'Все права защищены.', en: 'All rights reserved.' },
  
  // Breadcrumbs
  home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
  back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
  products: { uz: 'Mahsulotlar', ru: 'Товары', en: 'Products' },
  
  // Product detail
  description: { uz: 'Tavsif', ru: 'Описание', en: 'Description' },
  specifications: { uz: 'Xususiyatlar', ru: 'Характеристики', en: 'Specifications' },
  reviews: { uz: 'Sharhlar', ru: 'Отзывы', en: 'Reviews' },
  keyFeatures: { uz: 'Asosiy xususiyatlar', ru: 'Ключевые особенности', en: 'Key Features' },
  category: { uz: 'Kategoriya', ru: 'Категория', en: 'Category' },
  rating: { uz: 'Reyting', ru: 'Рейтинг', en: 'Rating' },
  availability: { uz: 'Mavjudlik', ru: 'Наличие', en: 'Availability' },
  writeReview: { uz: 'Sharh yozish', ru: 'Написать отзыв', en: 'Write a Review' },
  beFirstReview: { uz: 'Birinchi bo\'lib sharh qoldiring!', ru: 'Будьте первым, кто оставит отзыв!', en: 'Be the first to review this product!' },
  quantity: { uz: 'Miqdor', ru: 'Количество', en: 'Quantity' },
  buyNow: { uz: 'Hozir sotib olish', ru: 'Купить сейчас', en: 'Buy Now' },
  freeDeliveryTomorrow: { uz: 'Ertaga yoki keyinroq', ru: 'Завтра или позже', en: 'Tomorrow or later' },
  officialWarranty: { uz: 'Rasmiy kafolat - 1 yil', ru: 'Официальная гарантия - 1 год', en: 'Official Warranty - 1 Year' },
  returnPolicy: { uz: '14 kunlik qaytarish siyosati', ru: '14 дней на возврат', en: '14 Day Return Policy' },
  similarProducts: { uz: 'O\'xshash mahsulotlar', ru: 'Похожие товары', en: 'Similar Products' },
  frequentlyBought: { uz: 'Bu tovar bilan birga sotib olinadi', ru: 'С этим товаром покупают', en: 'Frequently Bought Together' },
  
  // Brands
  popularBrands: { uz: 'Mashhur brendlar', ru: 'Популярные бренды', en: 'Popular Brands' },
  
  // Language popup
  selectLanguage: { uz: 'Tilni tanlang', ru: 'Выберите язык', en: 'Select Language' },
  
  // Cart
  cart: { uz: 'Savat', ru: 'Корзина', en: 'Cart' },
  emptyCart: { uz: 'Savat bo\'sh', ru: 'Корзина пуста', en: 'Your cart is empty' },
  total: { uz: 'Jami', ru: 'Итого', en: 'Total' },
  checkout: { uz: 'Rasmiylashtirish', ru: 'Оформить заказ', en: 'Checkout' },
  continueShopping: { uz: 'Xaridni davom ettirish', ru: 'Продолжить покупки', en: 'Continue Shopping' },
  
  // Stock
  pcsInStock: { uz: 'dona mavjud', ru: 'шт. в наличии', en: 'pcs in stock' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  showLanguagePopup: boolean;
  setShowLanguagePopup: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('techhouse-language') as Language;
    if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      // First visit - show language popup
      setShowLanguagePopup(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('techhouse-language', lang);
    setShowLanguagePopup(false);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (translation) {
      return translation[language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, showLanguagePopup, setShowLanguagePopup }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
