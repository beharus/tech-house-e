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
  ourStores: { uz: 'Magazinlarimiz', ru: 'Наши магазины', en: 'Our Stores' },
  delivery: { uz: 'Yetkazib berish', ru: 'Доставка', en: 'Delivery' },
  catalog: { uz: 'Katalog', ru: 'Каталог', en: 'Catalog' },
  search: { uz: "Qidirish...", ru: 'Поиск...', en: 'Search...' },
  
  searchPhone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
  searchFridge: { uz: 'Muzlatgich', ru: 'Холодильник', en: 'Fridge' },
  searchTV: { uz: 'Televizor', ru: 'Телевизор', en: 'TV' },
  searchLaptop: { uz: 'Noutbuk', ru: 'Ноутбук', en: 'Laptop' },
  searchHeadphones: { uz: "Quloqchinlar", ru: 'Наушники', en: 'Headphones' },
  
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
  
  flashDeals: { uz: 'Kunning tovarlari', ru: 'Товары дня', en: 'Flash Deals' },
  viewAllDeals: { uz: 'Barcha aksiyalar', ru: 'Все акции', en: 'View All Deals' },
  shopNow: { uz: 'Xarid qilish', ru: 'Купить', en: 'Shop Now' },
  
  hotDeals: { uz: 'Aksiya mahsulotlari', ru: 'Горячие предложения', en: 'Hot Deals' },
  newArrivals: { uz: 'Yangi kelganlar', ru: 'Новинки', en: 'New Arrivals' },
  bestSellers: { uz: 'Eng ko\'p sotilganlar', ru: 'Хиты продаж', en: 'Best Sellers' },
  recentlyViewed: { uz: 'Yaqinda ko\'rilganlar', ru: 'Недавно просмотренные', en: 'Recently Viewed' },
  viewAll: { uz: 'Barchasi', ru: 'Смотреть все', en: 'View All' },
  
  inStock: { uz: 'Mavjud', ru: 'В наличии', en: 'In Stock' },
  outOfStock: { uz: 'Mavjud emas', ru: 'Нет в наличии', en: 'Out of Stock' },
  addToCart: { uz: 'Savatga qo\'shish', ru: 'В корзину', en: 'Add to Cart' },
  new: { uz: 'Yangi', ru: 'Новинка', en: 'New' },
  discount: { uz: 'Chegirma', ru: 'Скидка', en: 'Discount' },
  perMonth: { uz: 'oyiga', ru: 'в месяц', en: '/month' },
  monthly: { uz: '/ oyiga', ru: '/ мес', en: '/ mo' },
  
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
  
  home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
  back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
  products: { uz: 'Mahsulotlar', ru: 'Товары', en: 'Products' },
  
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
  
  popularBrands: { uz: 'Mashhur brendlar', ru: 'Популярные бренды', en: 'Popular Brands' },
  
  selectLanguage: { uz: 'Tilni tanlang', ru: 'Выберите язык', en: 'Select Language' },
  
  cart: { uz: 'Savat', ru: 'Корзина', en: 'Cart' },
  emptyCart: { uz: 'Savat bo\'sh', ru: 'Корзина пуста', en: 'Your cart is empty' },
  total: { uz: 'Jami', ru: 'Итого', en: 'Total' },
  checkout: { uz: 'Rasmiylashtirish', ru: 'Оформить заказ', en: 'Checkout' },
  continueShopping: { uz: 'Xaridni davom ettirish', ru: 'Продолжить покупки', en: 'Continue Shopping' },
  
  pcsInStock: { uz: 'dona mavjud', ru: 'шт. в наличии', en: 'pcs in stock' },

  backToHome: { uz: 'Bosh sahifaga qaytish', ru: 'Вернуться на главную', en: 'Back to Home' },
  rememberMe: { uz: 'Meni eslab qol', ru: 'Запомнить меня', en: 'Remember me' },
  forgotPassword: { uz: 'Parolni unutdingizmi?', ru: 'Забыли пароль?', en: 'Forgot password?' },
  login: { uz: 'Kirish', ru: 'Вход', en: 'Login' },
  register: { uz: 'Ro\'yxatdan o\'tish', ru: 'Регистрация', en: 'Register' },
  email: { uz: 'Email', ru: 'Email', en: 'Email' },
  password: { uz: 'Parol', ru: 'Пароль', en: 'Password' },
  fullName: { uz: 'To\'liq ism', ru: 'Полное имя', en: 'Full Name' },
  confirmPassword: { uz: 'Parolni tasdiqlang', ru: 'Подтвердите пароль', en: 'Confirm Password' },
  loading: { uz: 'Yuklanmoqda...', ru: 'Загрузка...', en: 'Loading...' },
  
  wishlist: { uz: 'Sevimlilar', ru: 'Избранное', en: 'Wishlist' },
  emptyWishlist: { uz: 'Sevimlilar ro\'yxati bo\'sh', ru: 'Список избранного пуст', en: 'Your wishlist is empty' },
  addedToCart: { uz: 'Savatga qo\'shildi', ru: 'Добавлено в корзину', en: 'Added to cart' },
  removedFromWishlist: { uz: 'Sevimlilardan olib tashlandi', ru: 'Удалено из избранного', en: 'Removed from wishlist' },
  addedToWishlist: { uz: 'Sevimlilarga qo\'shildi', ru: 'Добавлено в избранное', en: 'Added to wishlist' },
  moveToCart: { uz: 'Savatga ko\'chirish', ru: 'Переместить в корзину', en: 'Move to Cart' },
  remove: { uz: 'O\'chirish', ru: 'Удалить', en: 'Remove' },
  
  hoverCategory: { uz: 'Elementlarni ko\'rish uchun kategoriyani tanlang', ru: 'Наведите на категорию для просмотра', en: 'Hover over a category to see items' },
  
  categories: { uz: 'Kategoriyalar', ru: 'Категории', en: 'Categories' },
  filters: { uz: 'Filtrlar', ru: 'Фильтры', en: 'Filters' },
  clearFilters: { uz: 'Filtrlarni tozalash', ru: 'Очистить фильтры', en: 'Clear Filters' },
  priceRange: { uz: 'Narx oralig\'i', ru: 'Диапазон цен', en: 'Price Range' },
  brands: { uz: 'Brendlar', ru: 'Бренды', en: 'Brands' },
  colors: { uz: 'Ranglar', ru: 'Цвета', en: 'Colors' },
  andUp: { uz: 'va yuqori', ru: 'и выше', en: '& up' },
  productsFound: { uz: 'mahsulot topildi', ru: 'товаров найдено', en: 'products found' },
  sortBy: { uz: 'Saralash', ru: 'Сортировать', en: 'Sort by' },
  popular: { uz: 'Ommabop', ru: 'Популярные', en: 'Popular' },
  newest: { uz: 'Yangi', ru: 'Новые', en: 'Newest' },
  priceLowHigh: { uz: 'Narx: Pastdan yuqoriga', ru: 'Цена: по возрастанию', en: 'Price: Low to High' },
  priceHighLow: { uz: 'Narx: Yuqoridan pastga', ru: 'Цена: по убыванию', en: 'Price: High to Low' },
  allProducts: { uz: 'Barcha mahsulotlar', ru: 'Все товары', en: 'All Products' },
  dealsDiscounts: { uz: 'Aksiyalar va chegirmalar', ru: 'Акции и скидки', en: 'Deals & Discounts' },
  
  welcomeBack: { uz: 'Qaytganingiz bilan!', ru: 'С возвращением!', en: 'Welcome back!' },
  loginSuccess: { uz: 'Muvaffaqiyatli kirdingiz', ru: 'Вы успешно вошли', en: 'You have successfully logged in' },
  error: { uz: 'Xatolik', ru: 'Ошибка', en: 'Error' },
  passwordsNotMatch: { uz: 'Parollar mos kelmaydi', ru: 'Пароли не совпадают', en: 'Passwords do not match' },
  success: { uz: 'Muvaffaqiyat!', ru: 'Успешно!', en: 'Success!' },
  accountCreated: { uz: 'Hisob yaratildi', ru: 'Аккаунт создан', en: 'Account created' },
  
  orContinueWith: { uz: 'yoki davom eting', ru: 'или продолжите с', en: 'or continue with' },
  termsAgree: { uz: 'Ro\'yxatdan o\'tish orqali siz', ru: 'Регистрируясь, вы соглашаетесь с', en: 'By registering, you agree to our' },
  termsOfService: { uz: 'Foydalanish shartlari', ru: 'Условия использования', en: 'Terms of Service' },
  and: { uz: 'va', ru: 'и', en: 'and' },
  privacyPolicy: { uz: 'Maxfiylik siyosati', ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
  
  recentSearches: { uz: 'So\'nggi qidiruvlar', ru: 'Недавние поиски', en: 'Recent Searches' },
  clear: { uz: 'Tozalash', ru: 'Очистить', en: 'Clear' },
  trending: { uz: 'Trendda', ru: 'В тренде', en: 'Trending' },
  
  profile: { uz: 'Profil', ru: 'Профиль', en: 'Profile' },
  myOrders: { uz: 'Mening buyurtmalarim', ru: 'Мои заказы', en: 'My Orders' },
  addresses: { uz: 'Manzillar', ru: 'Адреса', en: 'Addresses' },
  loyaltyPoints: { uz: 'Bonuslar', ru: 'Бонусные баллы', en: 'Loyalty Points' },
  notifications: { uz: 'Bildirishnomalar', ru: 'Уведомления', en: 'Notifications' },
  settings: { uz: 'Sozlamalar', ru: 'Настройки', en: 'Settings' },
  logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Log Out' },
  personalInfo: { uz: 'Shaxsiy ma\'lumotlar', ru: 'Личная информация', en: 'Personal Information' },
  save: { uz: 'Saqlash', ru: 'Сохранить', en: 'Save' },
  edit: { uz: 'Tahrirlash', ru: 'Редактировать', en: 'Edit' },
  phone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
  birthDate: { uz: 'Tug\'ilgan sana', ru: 'Дата рождения', en: 'Birth Date' },
  totalOrders: { uz: 'Jami buyurtmalar', ru: 'Всего заказов', en: 'Total Orders' },
  points: { uz: 'Ball', ru: 'Баллы', en: 'Points' },
  orders: { uz: 'Buyurtmalar', ru: 'Заказы', en: 'Orders' },
  items: { uz: 'ta mahsulot', ru: 'товаров', en: 'items' },
  default: { uz: 'Asosiy', ru: 'По умолчанию', en: 'Default' },
  addAddress: { uz: 'Manzil qo\'shish', ru: 'Добавить адрес', en: 'Add New Address' },
  orderUpdates: { uz: 'Buyurtma yangilanishlari', ru: 'Обновления заказов', en: 'Order Updates' },
  orderUpdatesDesc: { uz: 'Buyurtma holati haqida xabar oling', ru: 'Получайте уведомления о статусе заказа', en: 'Get notified about your order status' },
  promotions: { uz: 'Aksiyalar', ru: 'Акции', en: 'Promotions' },
  promotionsDesc: { uz: 'Maxsus takliflar va chegirmalar', ru: 'Специальные предложения и скидки', en: 'Receive special offers and deals' },
  newsletter: { uz: 'Yangiliklar', ru: 'Рассылка', en: 'Newsletter' },
  newsletterDesc: { uz: 'Haftalik mahsulot yangiliklari', ru: 'Еженедельные обновления', en: 'Weekly product updates and tips' },
  
  compare: { uz: 'Solishtrish', ru: 'Сравнение', en: 'Compare' },
  compareProducts: { uz: 'Mahsulotlarni solishtirish', ru: 'Сравнение товаров', en: 'Compare Products' },
  productsSelected: { uz: 'ta mahsulot tanlandi', ru: 'товаров выбрано', en: 'products selected' },
  backToProducts: { uz: 'Mahsulotlarga qaytish', ru: 'Назад к товарам', en: 'Back to Products' },
  noProductsToCompare: { uz: 'Solishtirish uchun mahsulot yo\'q', ru: 'Нет товаров для сравнения', en: 'No products to compare' },
  addProductsToCompare: { uz: 'Xususiyatlarini solishtirish uchun mahsulotlar qo\'shing', ru: 'Добавьте товары для сравнения характеристик', en: 'Add products to compare their features' },
  addProduct: { uz: 'Mahsulot qo\'shish', ru: 'Добавить товар', en: 'Add Product' },
  selectProduct: { uz: 'Mahsulotni tanlang', ru: 'Выберите товар', en: 'Select a Product' },
  maxCompareProducts: { uz: 'Maksimum 4 ta mahsulot solishtiriladi', ru: 'Максимум 4 товара для сравнения', en: 'Maximum 4 products can be compared' },
  price: { uz: 'Narx', ru: 'Цена', en: 'Price' },
  features: { uz: 'Xususiyatlar', ru: 'Характеристики', en: 'Features' },
  addedToCompare: { uz: 'Solishtirishga qo\'shildi', ru: 'Добавлено к сравнению', en: 'Added to compare' },
  
  orderTracking: { uz: 'Buyurtmani kuzatish', ru: 'Отслеживание заказа', en: 'Order Tracking' },
  trackYourOrder: { uz: 'Buyurtmangizni real vaqtda kuzating', ru: 'Отслеживайте статус заказа в реальном времени', en: 'Track your order status in real-time' },
  backToProfile: { uz: 'Profilga qaytish', ru: 'Вернуться в профиль', en: 'Back to Profile' },
  enterOrderId: { uz: 'Buyurtma raqamini kiriting', ru: 'Введите номер заказа', en: 'Enter your order ID' },
  searching: { uz: 'Qidirilmoqda...', ru: 'Поиск...', en: 'Searching...' },
  trackOrder: { uz: 'Buyurtmani kuzatish', ru: 'Отследить заказ', en: 'Track Order' },
  trackingNumber: { uz: 'Kuzatuv raqami', ru: 'Номер отслеживания', en: 'Tracking Number' },
  inTransit: { uz: 'Yo\'lda', ru: 'В пути', en: 'In Transit' },
  progress: { uz: 'Jarayon', ru: 'Прогресс', en: 'Progress' },
  steps: { uz: 'qadam', ru: 'шагов', en: 'steps' },
  orderItems: { uz: 'Buyurtma mahsulotlari', ru: 'Товары заказа', en: 'Order Items' },
  deliveryInfo: { uz: 'Yetkazib berish ma\'lumotlari', ru: 'Информация о доставке', en: 'Delivery Information' },
  estimatedDelivery: { uz: 'Taxminiy yetkazib berish', ru: 'Ожидаемая доставка', en: 'Estimated Delivery' },
  carrier: { uz: 'Kuryer xizmati', ru: 'Служба доставки', en: 'Carrier' },
  shippingAddress: { uz: 'Yetkazib berish manzili', ru: 'Адрес доставки', en: 'Shipping Address' },
  needHelp: { uz: 'Yordam kerakmi?', ru: 'Нужна помощь?', en: 'Need Help?' },
  contactSupport: { uz: 'Buyurtmangiz haqida savollar uchun qo\'llab-quvvatlash xizmatiga murojaat qiling.', ru: 'Свяжитесь с нашей службой поддержки по вопросам о заказе.', en: 'Contact our support team for any questions about your order.' },
  callSupport: { uz: 'Qo\'llab-quvvatlashga qo\'ng\'iroq qilish', ru: 'Позвонить в поддержку', en: 'Call Support' },
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
