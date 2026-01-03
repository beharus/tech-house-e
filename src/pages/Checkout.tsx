import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Truck, Store, CreditCard, Wallet, ChevronLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' sum';
};

const steps = [
  { id: 1, name: 'Your Details' },
  { id: 2, name: 'Delivery' },
  { id: 3, name: 'Payment' },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: '+998',
    firstName: '',
    lastName: '',
    region: '',
    city: '',
    address: '',
    comment: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    clearCart();
    toast({
      title: 'Order placed successfully!',
      description: 'Thank you for your order. You will receive a confirmation shortly.',
    });
    navigate('/');
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.phone.length > 4 && formData.firstName && formData.lastName;
    }
    if (currentStep === 2) {
      if (deliveryMethod === 'delivery') {
        return formData.region && formData.city && formData.address;
      }
      return true;
    }
    return true;
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-6">
          {/* Back button */}
          <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>

          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Progress steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-4 rounded ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6">
                {/* Step 1: Your Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                        1
                      </span>
                      Your Details
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+998 90 123 45 67"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Your first name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Your last name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                        2
                      </span>
                      Delivery Method
                    </h2>

                    <RadioGroup
                      value={deliveryMethod}
                      onValueChange={setDeliveryMethod}
                      className="space-y-3"
                    >
                      <label
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          deliveryMethod === 'delivery'
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Truck className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Home Delivery</p>
                          <p className="text-sm text-muted-foreground">Free delivery</p>
                        </div>
                      </label>

                      <label
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          deliveryMethod === 'pickup'
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Store className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Store Pickup</p>
                          <p className="text-sm text-muted-foreground">Ready tomorrow</p>
                        </div>
                      </label>
                    </RadioGroup>

                    {deliveryMethod === 'delivery' && (
                      <div className="space-y-4 mt-6">
                        <h3 className="font-medium">Delivery Address</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="region">Region *</Label>
                            <Input
                              id="region"
                              name="region"
                              value={formData.region}
                              onChange={handleInputChange}
                              placeholder="Tashkent City"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">District *</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Chilanzar"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street, house, apartment"
                          />
                        </div>
                        <div>
                          <Label htmlFor="comment">Comment (optional)</Label>
                          <Textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            placeholder="Any special instructions"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                        3
                      </span>
                      Payment Method
                    </h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid sm:grid-cols-2 gap-3"
                    >
                      <label
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" className="sr-only" />
                        <CreditCard className="h-8 w-8 text-primary" />
                        <span className="font-medium">Card Online</span>
                      </label>

                      <label
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'payme'
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value="payme" id="payme" className="sr-only" />
                        <Wallet className="h-8 w-8 text-primary" />
                        <span className="font-medium">Payme</span>
                      </label>

                      <label
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'click'
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value="click" id="click" className="sr-only" />
                        <Wallet className="h-8 w-8 text-primary" />
                        <span className="font-medium">Click</span>
                      </label>

                      <label
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === 'cash'
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value="cash" id="cash" className="sr-only" />
                        <Store className="h-8 w-8 text-primary" />
                        <span className="font-medium">Cash on Delivery</span>
                      </label>
                    </RadioGroup>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <div className={currentStep === 1 ? 'ml-auto' : ''}>
                    {currentStep < 3 ? (
                      <Button
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        disabled={!canProceed()}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} size="lg">
                        Place Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 sticky top-32">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg bg-muted/30"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity}x</p>
                        <p className="text-sm font-medium text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-xl text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
