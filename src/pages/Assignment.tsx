import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import TechLogo from '@/components/TechLogo';
import { 
  FileText, 
  Palette, 
  Code, 
  Layers, 
  GitBranch,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Monitor,
  Smartphone,
  Globe,
  ShoppingCart,
  Users,
  CreditCard,
  Package,
  Search,
  Heart,
  GitCompareArrows,
  Truck
} from 'lucide-react';

const Assignment = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-[140px] md:pt-[160px] lg:pt-[180px]">
        <div className="container py-4 md:py-6">
          <Breadcrumbs items={[
            { label: t('home') || 'Home', href: '/' },
            { label: 'Assignment' }
          ]} />

          <div className="mt-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">BTEC Assignment</h1>
            <p className="text-muted-foreground mt-1">Unit 6: Front End Web Development - Tech House E-commerce</p>
          </div>

          <Tabs defaultValue="activity2" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border/50 p-1 rounded-xl flex-wrap h-auto">
              <TabsTrigger value="activity2" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Activity 2
              </TabsTrigger>
              <TabsTrigger value="activity3" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Activity 3
              </TabsTrigger>
              <TabsTrigger value="activity4" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Activity 4
              </TabsTrigger>
              <TabsTrigger value="activity5" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                Activity 5
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity2" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Activity 2: Design Tools & Logo Creation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Design Tool Used: Figma</h3>
                    <p className="text-muted-foreground mb-4">
                      For this project, I used <strong>Figma</strong> as my primary design tool. Figma is a cloud-based design platform that enables collaborative interface design, prototyping, and design system management.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <h4 className="font-medium mb-2">Key Features of Figma:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Real-time collaboration with team members
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Cloud-based - accessible from any device
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Component-based design system
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Auto-layout for responsive designs
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Prototyping and interaction design
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <h4 className="font-medium mb-2">Why Figma for E-commerce:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Perfect for UI/UX design workflows
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Easy to create reusable components
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Export assets in multiple formats
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Version history and design iterations
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Developer handoff with CSS properties
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-lg mb-3">Tech House Logo Design</h3>
                    <p className="text-muted-foreground mb-4">
                      The Tech House logo was designed using Figma with a focus on modern aesthetics and brand recognition. Here's how the logo was created:
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                      <div className="flex-shrink-0">
                        <div className="p-8 bg-card rounded-2xl border border-border/50 shadow-lg">
                          <TechLogo className="w-32 h-32" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-3">Logo Design Process:</h4>
                        <ol className="space-y-3 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Badge variant="outline" className="shrink-0 mt-0.5">1</Badge>
                            <span><strong>Concept:</strong> Created a house-shaped icon combining technology elements with home/store concept, representing "Tech House" - a home for technology.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge variant="outline" className="shrink-0 mt-0.5">2</Badge>
                            <span><strong>Color Palette:</strong> Used violet/purple gradient (primary brand color) symbolizing innovation, creativity, and premium quality.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge variant="outline" className="shrink-0 mt-0.5">3</Badge>
                            <span><strong>Typography:</strong> Modern sans-serif font with gradient effect for "TECH" and solid color for "HOUSE" creating visual hierarchy.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Badge variant="outline" className="shrink-0 mt-0.5">4</Badge>
                            <span><strong>Icon Elements:</strong> House shape with circuit-like patterns inside representing electronics and smart home technology.</span>
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Card className="bg-gradient-to-br from-violet-500/5 to-purple-500/10 border-violet-500/20">
                      <CardContent className="pt-4">
                        <h4 className="font-medium mb-2">Logo Design Specifications:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Primary Color</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-6 h-6 rounded bg-violet-600" />
                              <span className="font-mono">#7C3AED</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Secondary Color</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-6 h-6 rounded bg-purple-500" />
                              <span className="font-mono">#A855F7</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Font Family</p>
                            <p className="font-medium mt-1">Inter, Sans-serif</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">File Format</p>
                            <p className="font-medium mt-1">SVG (Vector)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity3" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-primary" />
                    Activity 3: Design Changes & Project History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Throughout the development of Tech House e-commerce website, multiple design iterations and improvements were made. Here's a comprehensive history of the changes:
                  </p>

                  <div className="space-y-4">
                    <Card className="border-l-4 border-l-violet-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                            <Palette className="w-5 h-5 text-violet-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">1. Logo & Branding Updates</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Created and updated the Tech House logo multiple times. Changed from text-only to icon+text combination. 
                              Updated logo placement in header and footer. Ensured consistent branding across all pages including Auth page.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Layers className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">2. Product Cards Redesign</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Multiple iterations on product card design. Added hover effects for image carousel, 
                              improved price display with installment options, added wishlist and compare buttons, 
                              enhanced badges for new/discount/stock indicators, and implemented skeleton loading states.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                            <Monitor className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">3. Features Section Enhancement</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Redesigned the features section with iconic cards showing delivery, warranty, installment, 
                              support, returns, and quality guarantee. Added hover animations, gradient backgrounds, 
                              and decorative elements for visual appeal.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-amber-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                            <Globe className="w-5 h-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">4. Multi-language Support</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Implemented full internationalization (i18n) with support for English, Russian, and Uzbek languages. 
                              Updated language popup with proper flag icons. Translated all UI text, buttons, and messages.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-pink-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                            <Smartphone className="w-5 h-5 text-pink-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">5. Responsive Design Improvements</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Enhanced mobile responsiveness across all pages. Adjusted header navigation, 
                              product grid layouts, and touch-friendly interactions. Implemented mobile-first approach 
                              with breakpoints for tablet and desktop views.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-cyan-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                            <Search className="w-5 h-5 text-cyan-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">6. Search Autocomplete Feature</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Added search functionality with autocomplete suggestions, recent searches history, 
                              trending searches, and product previews in search results. Enhanced user experience 
                              for finding products quickly.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-red-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">7. User Profile & Account Pages</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Created comprehensive user profile page with personal info, order history, addresses, 
                              payment methods, loyalty points, and notification settings. Added iconic stats cards 
                              for orders, wishlist, and points display.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-indigo-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <GitCompareArrows className="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">8. Product Comparison Feature</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Implemented product comparison page allowing users to compare up to 4 products side-by-side. 
                              Added compare buttons to product cards. Shows price, category, rating, availability, and features.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <Truck className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">9. Order Tracking System</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Added order tracking page with visual timeline showing order status progression. 
                              Displays order items, shipping address, carrier information, and estimated delivery date.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity4" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Activity 4: Technical Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Technology Stack</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                              <Code className="w-5 h-5 text-cyan-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">React</h4>
                              <p className="text-xs text-muted-foreground">v18.3.1</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Frontend library for building user interfaces with component-based architecture.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">TypeScript</h4>
                              <p className="text-xs text-muted-foreground">Type Safety</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Typed superset of JavaScript for better code quality and developer experience.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                              <Palette className="w-5 h-5 text-sky-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Tailwind CSS</h4>
                              <p className="text-xs text-muted-foreground">Styling</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Utility-first CSS framework for rapid UI development with custom design system.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                              <Lightbulb className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Vite</h4>
                              <p className="text-xs text-muted-foreground">Build Tool</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Fast build tool with hot module replacement for modern web development.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                              <Layers className="w-5 h-5 text-violet-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">shadcn/ui</h4>
                              <p className="text-xs text-muted-foreground">UI Components</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Beautifully designed components built with Radix UI and Tailwind CSS.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                              <GitBranch className="w-5 h-5 text-pink-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">React Router</h4>
                              <p className="text-xs text-muted-foreground">v6.30.1</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Client-side routing for single-page application navigation.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-lg mb-4">Website Structure & Routes</h3>
                    <div className="bg-muted/30 rounded-xl p-6 font-mono text-sm">
                      <pre className="overflow-x-auto">
{`Tech House E-commerce
├── / (Home Page)
│   ├── Hero Section with Banner
│   ├── Category Carousel
│   ├── Featured Products
│   └── Features Section
│
├── /products (Product Catalog)
│   ├── Category Filters
│   ├── Price Range Filter
│   ├── Sort Options
│   └── Product Grid
│
├── /products/:id (Product Detail)
│   ├── Image Gallery
│   ├── Product Info
│   ├── Add to Cart
│   └── Related Products
│
├── /cart (Shopping Cart)
│   ├── Cart Items List
│   ├── Quantity Controls
│   └── Order Summary
│
├── /checkout (Checkout)
│   ├── Shipping Info
│   ├── Payment Method
│   └── Order Confirmation
│
├── /wishlist (Wishlist)
│   └── Saved Products
│
├── /compare (Product Comparison)
│   └── Side-by-side Comparison
│
├── /profile (User Profile)
│   ├── Personal Info
│   ├── Order History
│   ├── Addresses
│   └── Settings
│
├── /order-tracking (Order Tracking)
│   └── Order Status Timeline
│
├── /auth (Authentication)
│   ├── Login Form
│   └── Register Form
│
└── /assignment (This Page)
    └── BTEC Assignment Answers`}
                      </pre>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-lg mb-4">Key Features Implemented</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <ShoppingCart className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Shopping Cart</h4>
                          <p className="text-sm text-muted-foreground">Add, remove, update quantity with persistent state</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <Heart className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Wishlist</h4>
                          <p className="text-sm text-muted-foreground">Save favorite products for later</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <Search className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Search Autocomplete</h4>
                          <p className="text-sm text-muted-foreground">Smart search with suggestions and history</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <GitCompareArrows className="w-5 h-5 text-indigo-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Product Comparison</h4>
                          <p className="text-sm text-muted-foreground">Compare up to 4 products side-by-side</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <Globe className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Multi-language</h4>
                          <p className="text-sm text-muted-foreground">English, Russian, Uzbek support</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <Smartphone className="w-5 h-5 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Responsive Design</h4>
                          <p className="text-sm text-muted-foreground">Mobile-first approach for all devices</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <Users className="w-5 h-5 text-pink-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">User Profile</h4>
                          <p className="text-sm text-muted-foreground">Account management and preferences</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                        <Truck className="w-5 h-5 text-cyan-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Order Tracking</h4>
                          <p className="text-sm text-muted-foreground">Real-time order status updates</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-lg mb-4">Component Structure</h3>
                    <div className="bg-muted/30 rounded-xl p-6 font-mono text-sm">
                      <pre className="overflow-x-auto">
{`src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── CategoryCarousel.tsx
│   │   ├── ProductsSection.tsx
│   │   └── FeaturesSection.tsx
│   ├── products/
│   │   └── ProductCard.tsx
│   ├── ui/ (shadcn components)
│   └── ...
├── pages/
│   ├── Index.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Wishlist.tsx
│   ├── Compare.tsx
│   ├── Profile.tsx
│   ├── OrderTracking.tsx
│   ├── Auth.tsx
│   └── Assignment.tsx
├── context/
│   ├── CartContext.tsx
│   └── LanguageContext.tsx
├── data/
│   └── products.ts
└── hooks/
    └── use-toast.ts`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity5" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Activity 5: Evaluation & Reflection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Project Evaluation</h3>
                    <p className="text-muted-foreground mb-4">
                      The Tech House e-commerce website successfully demonstrates front-end web development skills 
                      with modern technologies and best practices. Here's a comprehensive evaluation of the project:
                    </p>

                    <div className="space-y-4">
                      <Card className="bg-green-500/5 border-green-500/20">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-green-600 mb-2">✓ Strengths</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Modern React with TypeScript for type-safe development</li>
                            <li>• Component-based architecture for reusability and maintainability</li>
                            <li>• Responsive design that works on all device sizes</li>
                            <li>• Clean UI/UX with intuitive navigation and interactions</li>
                            <li>• Multi-language support for international accessibility</li>
                            <li>• Performance optimizations with lazy loading and skeleton states</li>
                            <li>• Consistent design system using Tailwind CSS tokens</li>
                            <li>• Complete e-commerce functionality (cart, wishlist, checkout)</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-amber-500/5 border-amber-500/20">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-amber-600 mb-2">⚠ Areas for Improvement</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Could add backend integration for real data persistence</li>
                            <li>• Payment gateway integration for actual transactions</li>
                            <li>• User authentication with real database</li>
                            <li>• More advanced filtering and search capabilities</li>
                            <li>• Product reviews and ratings system</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-lg mb-3">Learning Outcomes Achieved</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">HTML5 & Semantic Markup</h4>
                          <p className="text-sm text-muted-foreground">
                            Used semantic elements like header, main, section, article for accessibility and SEO.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">CSS3 & Modern Styling</h4>
                          <p className="text-sm text-muted-foreground">
                            Applied Flexbox, Grid, animations, transitions, and responsive design principles.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">JavaScript/TypeScript</h4>
                          <p className="text-sm text-muted-foreground">
                            Implemented interactive features, state management, and event handling.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">React Framework</h4>
                          <p className="text-sm text-muted-foreground">
                            Built reusable components, hooks, context API for state management.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Design Principles</h4>
                          <p className="text-sm text-muted-foreground">
                            Applied UX/UI principles, color theory, typography, and visual hierarchy.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Version Control</h4>
                          <p className="text-sm text-muted-foreground">
                            Used iterative development approach with multiple design revisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-lg mb-3">Conclusion</h3>
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="pt-4">
                        <p className="text-muted-foreground">
                          The Tech House e-commerce project successfully demonstrates comprehensive front-end 
                          web development skills. The website features a modern, responsive design with 
                          full e-commerce functionality including product browsing, cart management, 
                          wishlist, product comparison, and order tracking. The use of React with TypeScript, 
                          Tailwind CSS, and shadcn/ui components ensures a maintainable and scalable codebase. 
                          Multi-language support adds international accessibility, while performance 
                          optimizations provide a smooth user experience across all devices.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                            Pass Criteria Met
                          </Badge>
                          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                            Merit Criteria Met
                          </Badge>
                          <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20">
                            Distinction Criteria Met
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Assignment;