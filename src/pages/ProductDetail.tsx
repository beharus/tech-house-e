import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsSection from "@/components/home/ProductsSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ").format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, addToRecentlyViewed, recentlyViewed } = useCart();
  const { t, language } = useLanguage();
  const hasAddedRef = useRef(false);

  const product = products.find((p) => p.id === id);

  const productImages = product?.images?.length
    ? product.images
    : product
      ? [product.image]
      : [];
  const stockCount = product?.stockCount ?? 15;

  useEffect(() => {
    if (product && !hasAddedRef.current) {
      addToRecentlyViewed(product);
      hasAddedRef.current = true;
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-[180px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/products">
              <Button>{t("products")}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title:
        language === "ru"
          ? "Добавлено в корзину"
          : language === "uz"
            ? "Savatga qo'shildi"
            : "Added to cart",
      description: `${quantity}x ${product.name}`,
    });
  };

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const frequentlyBought = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length,
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-[180px]">
        <div className="container py-6">
          <Breadcrumbs
            items={[
              { label: t("home"), href: "/" },
              { label: t("products"), href: "/products" },
              {
                label: product.category,
                href: `/products?category=${product.category.toLowerCase().replace(" ", "-")}`,
              },
              { label: product.name },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl bg-card overflow-hidden">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && <Badge>{t("new")}</Badge>}
                  {product.discount && (
                    <Badge variant="destructive">-{product.discount}%</Badge>
                  )}
                </div>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 hover:bg-card flex items-center justify-center shadow-md transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 hover:bg-card flex items-center justify-center shadow-md transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  {product.isNew && <Badge className="mb-2">{t("new")}</Badge>}
                  <h1 className="text-2xl lg:text-3xl font-bold">
                    {product.name}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} {t("reviews").toLowerCase()})
                </span>
              </div>

              {/* Price */}
              <div className="bg-card rounded-xl p-6 mb-6">
                <div className="flex items-end gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}{" "}
                    {language === "en"
                      ? "sum"
                      : language === "ru"
                        ? "сум"
                        : "so'm"}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}{" "}
                        {language === "en"
                          ? "sum"
                          : language === "ru"
                            ? "сум"
                            : "so'm"}
                      </span>
                      <Badge variant="destructive">-{product.discount}%</Badge>
                    </>
                  )}
                </div>

                {/* Installment */}
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "ru"
                    ? "или от"
                    : language === "uz"
                      ? "yoki"
                      : "or from"}{" "}
                  <span className="text-foreground font-medium">
                    {formatPrice(Math.round(product.price / 12))}{" "}
                    {language === "en"
                      ? "sum"
                      : language === "ru"
                        ? "сум"
                        : "so'm"}
                  </span>{" "}
                  {t("perMonth")} (12{" "}
                  {language === "ru"
                    ? "мес."
                    : language === "uz"
                      ? "oy"
                      : "months"}
                  )
                </p>

                {/* Stock */}
                <p className="text-sm mb-6">
                  <span
                    className={
                      product.inStock ? "text-chart-2" : "text-destructive"
                    }
                  >
                    {product.inStock
                      ? `✓ ${stockCount} ${t("pcsInStock")}`
                      : t("outOfStock")}
                  </span>
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium">{t("quantity")}:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {t("addToCart")}
                  </Button>
                  <Button size="lg" variant="secondary">
                    {t("buyNow")}
                  </Button>
                </div>
              </div>

              {/* Delivery info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">{t("freeDelivery")}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      - {t("freeDeliveryTomorrow")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>{t("officialWarranty")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>{t("returnPolicy")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                {t("description")}
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                {t("specifications")}
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                {t("reviews")} ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-card rounded-xl p-6">
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                {product.features && (
                  <div>
                    <h3 className="font-semibold mb-3">{t("keyFeatures")}:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-card rounded-xl p-6">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">
                        {t("category")}
                      </td>
                      <td className="py-3 font-medium">{product.category}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">
                        {t("rating")}
                      </td>
                      <td className="py-3 font-medium">{product.rating} / 5</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">
                        {t("availability")}
                      </td>
                      <td className="py-3 font-medium">
                        {product.inStock ? t("inStock") : t("outOfStock")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card rounded-xl p-6 text-center">
                <p className="text-muted-foreground">{t("beFirstReview")}</p>
                <Button className="mt-4">{t("writeReview")}</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Frequently bought together */}
          <ProductsSection
            title={t("frequentlyBought")}
            products={frequentlyBought}
          />

          {/* Similar products */}
          {similarProducts.length > 0 && (
            <ProductsSection
              title={t("similarProducts")}
              products={similarProducts}
              viewAllLink={`/products?category=${product.category.toLowerCase().replace(" ", "-")}`}
            />
          )}

          {/* Recently viewed */}
          {recentlyViewed.length > 1 && (
            <ProductsSection
              title={t("recentlyViewed")}
              products={recentlyViewed.filter((p) => p.id !== product.id)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
