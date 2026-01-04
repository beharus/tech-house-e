import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 50 50" className="w-10 h-10 shrink-0">
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary-foreground))" />
                    <stop offset="100%" stopColor="hsl(var(--primary-foreground) / 0.8)" />
                  </linearGradient>
                </defs>
                <path d="M8 8 L42 8 L42 16 L29 16 L29 42 L21 42 L21 16 L8 16 Z" fill="url(#footerLogoGradient)" />
                <path d="M25 24 L40 42 L32 42 L25 32 Z" fill="url(#footerLogoGradient)" />
              </svg>
              <span className="text-xl font-bold">
                <span className="opacity-90">ech</span>House
              </span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              {t('companyInfo')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">{t('information')}</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('aboutUs')}</Link></li>
              <li><Link to="/delivery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('delivery')}</Link></li>
              <li><Link to="/payment" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('paymentMethods')}</Link></li>
              <li><Link to="/warranty" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('warranty')}</Link></li>
              <li><Link to="/returns" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('returns')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">{t('customerService')}</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('contactUs')}</Link></li>
              <li><Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('faq')}</Link></li>
              <li><Link to="/stores" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('storeLocations')}</Link></li>
              <li><Link to="/loyalty" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('loyaltyProgram')}</Link></li>
              <li><Link to="/support" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('supportCenter')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                +998 71 200 00 00
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                info@techhouse.uz
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-1" />
                Tashkent, Uzbekistan<br />Navoi Street, 15
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2026 Tech House. {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
            {/* Uzbek Payment Methods */}
            <div className="flex items-center justify-center h-7 md:h-8 px-2 md:px-3 bg-primary-foreground rounded text-primary font-bold text-[10px] md:text-xs">
              UZCARD
            </div>
            <div className="flex items-center justify-center h-7 md:h-8 px-2 md:px-3 bg-primary-foreground rounded text-primary font-bold text-[10px] md:text-xs">
              HUMO
            </div>
            <div className="flex items-center justify-center h-7 md:h-8 px-2 md:px-3 bg-[#00CCCC] rounded text-foreground font-bold text-[10px] md:text-xs">
              payme
            </div>
            <div className="flex items-center justify-center h-7 md:h-8 px-2 md:px-3 bg-[#009FE3] rounded text-primary-foreground font-bold text-[10px] md:text-xs">
              Click
            </div>
            <div className="flex items-center justify-center h-7 md:h-8 px-2 md:px-3 bg-[#EE5C24] rounded text-white font-bold text-[10px] md:text-xs">
              Oson
            </div>
            <div className="flex items-center justify-center h-7 md:h-8 px-2 md:px-3 bg-[#FFD700] rounded text-black font-bold text-[10px] md:text-xs">
              APELSIN
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 md:h-6 opacity-80 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 md:h-6 opacity-80" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
