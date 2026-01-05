import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  Search,
  Box,
  Warehouse
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';

interface TrackingStep {
  status: string;
  date: string;
  time: string;
  location: string;
  completed: boolean;
  current: boolean;
}

const mockOrderData = {
  orderId: 'ORD-2024-001234',
  status: 'in_transit',
  estimatedDelivery: '2024-01-28',
  carrier: 'Express Delivery',
  trackingNumber: 'TRK-9876543210',
  items: [
    { name: 'Smart Speaker with Voice Assistant', quantity: 1, price: 849000 },
    { name: 'Wireless Noise Cancelling Headphones', quantity: 2, price: 1299000 },
  ],
  shippingAddress: {
    name: 'John Doe',
    address: '123 Main Street, Tashkent, Uzbekistan',
    phone: '+998 90 123 45 67',
  },
  timeline: [
    { status: 'Order Placed', date: '2024-01-20', time: '14:30', location: 'Online', completed: true, current: false },
    { status: 'Payment Confirmed', date: '2024-01-20', time: '14:32', location: 'Payment Gateway', completed: true, current: false },
    { status: 'Processing', date: '2024-01-21', time: '09:00', location: 'Warehouse', completed: true, current: false },
    { status: 'Shipped', date: '2024-01-22', time: '16:45', location: 'Tashkent Distribution Center', completed: true, current: false },
    { status: 'In Transit', date: '2024-01-25', time: '08:30', location: 'Local Delivery Hub', completed: true, current: true },
    { status: 'Out for Delivery', date: '', time: '', location: '', completed: false, current: false },
    { status: 'Delivered', date: '', time: '', location: '', completed: false, current: false },
  ] as TrackingStep[],
};

const OrderTracking = () => {
  const { t, language } = useLanguage();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orderData, setOrderData] = useState(mockOrderData);
  const [isSearching, setIsSearching] = useState(false);

  const formatPrice = (price: number) => new Intl.NumberFormat('uz-UZ').format(price);

  const getStatusIcon = (status: string, completed: boolean, current: boolean) => {
    if (current) return <Truck className="w-5 h-5 text-primary" />;
    if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <Clock className="w-5 h-5 text-muted-foreground" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_transit': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'processing': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const completedSteps = orderData.timeline.filter(step => step.completed).length;
  const totalSteps = orderData.timeline.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-[140px] md:pt-[160px] lg:pt-[180px]">
        <div className="container py-4 md:py-6">
          <Breadcrumbs items={[
            { label: t('home') || 'Home', href: '/' },
            { label: t('profile') || 'Profile', href: '/profile' },
            { label: t('orderTracking') || 'Order Tracking' }
          ]} />

          <div className="flex items-center justify-between mt-6 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{t('orderTracking') || 'Order Tracking'}</h1>
              <p className="text-muted-foreground mt-1">{t('trackYourOrder') || 'Track your order status in real-time'}</p>
            </div>
            <Link to="/profile">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('backToProfile') || 'Back to Profile'}
              </Button>
            </Link>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder={t('enterOrderId') || 'Enter your order ID (e.g., ORD-2024-001234)'}
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching} className="h-12 px-8 gap-2">
                  <Search className="w-4 h-4" />
                  {isSearching ? (t('searching') || 'Searching...') : (t('trackOrder') || 'Track Order')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        {orderData.orderId}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('trackingNumber') || 'Tracking'}: {orderData.trackingNumber}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(orderData.status)}>
                      {t('inTransit') || 'In Transit'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t('progress') || 'Progress'}</span>
                      <span className="font-medium">{completedSteps}/{totalSteps} {t('steps') || 'steps'}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    {orderData.timeline.map((step, index) => (
                      <div key={index} className="flex gap-4 pb-8 last:pb-0">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            step.current ? 'bg-primary/10 ring-2 ring-primary ring-offset-2' :
                            step.completed ? 'bg-green-500/10' : 'bg-muted'
                          }`}>
                            {getStatusIcon(step.status, step.completed, step.current)}
                          </div>
                          {index < orderData.timeline.length - 1 && (
                            <div className={`absolute top-10 w-0.5 h-full ${
                              step.completed ? 'bg-green-500' : 'bg-border'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className={`font-medium ${step.current ? 'text-primary' : step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.status}
                            </h4>
                            {step.date && (
                              <span className="text-sm text-muted-foreground">
                                {step.date} {step.time && `at ${step.time}`}
                              </span>
                            )}
                          </div>
                          {step.location && (
                            <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {step.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" />
                    {t('orderItems') || 'Order Items'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{t('quantity') || 'Qty'}: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price)} so'm</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    {t('deliveryInfo') || 'Delivery Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('estimatedDelivery') || 'Estimated Delivery'}</p>
                    <p className="font-semibold text-lg text-primary">{orderData.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('carrier') || 'Carrier'}</p>
                    <p className="font-medium">{orderData.carrier}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {t('shippingAddress') || 'Shipping Address'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {orderData.shippingAddress.name.charAt(0)}
                      </span>
                    </div>
                    <p className="font-medium">{orderData.shippingAddress.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{orderData.shippingAddress.address}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {orderData.shippingAddress.phone}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Warehouse className="w-6 h-6 text-primary" />
                    <h4 className="font-semibold">{t('needHelp') || 'Need Help?'}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('contactSupport') || 'Contact our support team for any questions about your order.'}
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    {t('callSupport') || 'Call Support'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default OrderTracking;