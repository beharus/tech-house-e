import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight,
  Camera,
  Edit2,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Gift,
  Bell
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

const mockOrders = [
  { id: 'ORD-001', date: '2024-01-15', status: 'delivered', total: 2499000, items: 2 },
  { id: 'ORD-002', date: '2024-01-20', status: 'processing', total: 849000, items: 1 },
  { id: 'ORD-003', date: '2024-01-25', status: 'shipped', total: 5799000, items: 3 },
];

const mockAddresses = [
  { id: 1, title: 'Home', address: '123 Main Street, Tashkent, Uzbekistan', isDefault: true },
  { id: 2, title: 'Work', address: '456 Business Ave, Tashkent, Uzbekistan', isDefault: false },
];

const Profile = () => {
  const { t, language } = useLanguage();
  const { wishlist, totalItems } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+998 90 123 45 67',
    birthDate: '1990-01-15',
  });

  const formatPrice = (price: number) => new Intl.NumberFormat('uz-UZ').format(price);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'processing': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, Record<string, string>> = {
      delivered: { en: 'Delivered', ru: 'Доставлен', uz: 'Yetkazildi' },
      shipped: { en: 'Shipped', ru: 'Отправлен', uz: 'Jo\'natildi' },
      processing: { en: 'Processing', ru: 'В обработке', uz: 'Jarayonda' },
    };
    return texts[status]?.[language] || status;
  };

  const menuItems = [
    { icon: Package, label: t('myOrders') || 'My Orders', count: mockOrders.length, href: '#orders' },
    { icon: Heart, label: t('wishlist') || 'Wishlist', count: wishlist.length, href: '/wishlist' },
    { icon: MapPin, label: t('addresses') || 'Addresses', count: mockAddresses.length, href: '#addresses' },
    { icon: CreditCard, label: t('paymentMethods') || 'Payment Methods', count: 2, href: '#payment' },
    { icon: Gift, label: t('loyaltyPoints') || 'Loyalty Points', count: 2500, href: '#loyalty' },
    { icon: Bell, label: t('notifications') || 'Notifications', href: '#notifications' },
    { icon: Settings, label: t('settings') || 'Settings', href: '#settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-[140px] md:pt-[160px] lg:pt-[180px]">
        <div className="container py-4 md:py-6">
          <Breadcrumbs items={[
            { label: t('home') || 'Home', href: '/' },
            { label: t('profile') || 'Profile' }
          ]} />

          <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-6">
            <aside className="space-y-4">
              <Card className="overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-primary to-primary/70" />
                <CardContent className="pt-0 -mt-10">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="w-20 h-20 rounded-full bg-card border-4 border-card overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <h3 className="font-semibold">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                    <Badge className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 border-0">
                      Gold Member
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-2">
                  <nav className="space-y-1">
                    {menuItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.count !== undefined && (
                            <span className="text-xs text-muted-foreground">{item.count}</span>
                          )}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm font-medium">{t('logout') || 'Log Out'}</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            <div className="space-y-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border/50 p-1 rounded-xl">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                    {t('profile') || 'Profile'}
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                    {t('orders') || 'Orders'}
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                    {t('addresses') || 'Addresses'}
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                    {t('settings') || 'Settings'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle>{t('personalInfo') || 'Personal Information'}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        {isEditing ? (t('save') || 'Save') : (t('edit') || 'Edit')}
                      </Button>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {t('fullName') || 'Full Name'}
                        </label>
                        <Input
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {t('email') || 'Email'}
                        </label>
                        <Input
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {t('phone') || 'Phone'}
                        </label>
                        <Input
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {t('birthDate') || 'Birth Date'}
                        </label>
                        <Input
                          type="date"
                          value={userData.birthDate}
                          onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{mockOrders.length}</p>
                            <p className="text-sm text-muted-foreground">{t('totalOrders') || 'Total Orders'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-red-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{wishlist.length}</p>
                            <p className="text-sm text-muted-foreground">{t('wishlist') || 'Wishlist'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <Gift className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">2,500</p>
                            <p className="text-sm text-muted-foreground">{t('points') || 'Points'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="mt-6 space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                              <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date} · {order.items} {t('items') || 'items'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                            <p className="font-semibold">{formatPrice(order.total)} so'm</p>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="addresses" className="mt-6 space-y-4">
                  {mockAddresses.map((addr) => (
                    <Card key={addr.id} className={addr.isDefault ? 'border-primary/50' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center mt-1">
                              <MapPin className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">{addr.title}</p>
                                {addr.isDefault && (
                                  <Badge variant="secondary" className="text-xs">{t('default') || 'Default'}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full gap-2">
                    <MapPin className="w-4 h-4" />
                    {t('addAddress') || 'Add New Address'}
                  </Button>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('notifications') || 'Notifications'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t('orderUpdates') || 'Order Updates'}</p>
                          <p className="text-sm text-muted-foreground">{t('orderUpdatesDesc') || 'Get notified about your order status'}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t('promotions') || 'Promotions'}</p>
                          <p className="text-sm text-muted-foreground">{t('promotionsDesc') || 'Receive special offers and deals'}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t('newsletter') || 'Newsletter'}</p>
                          <p className="text-sm text-muted-foreground">{t('newsletterDesc') || 'Weekly product updates and tips'}</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Profile;