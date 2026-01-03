import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">TH</span>
              </div>
              <span className="text-xl font-bold">Tech House</span>
            </div>
            <p className="text-secondary-foreground/80 mb-4">
              Your trusted partner for quality household appliances and electronics.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/delivery" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Delivery</Link></li>
              <li><Link to="/payment" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Payment Methods</Link></li>
              <li><Link to="/warranty" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Warranty</Link></li>
              <li><Link to="/returns" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/stores" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Store Locations</Link></li>
              <li><Link to="/loyalty" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Loyalty Program</Link></li>
              <li><Link to="/support" className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-secondary-foreground/80">
                <Phone className="h-4 w-4" />
                +998 71 200 00 00
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/80">
                <Mail className="h-4 w-4" />
                info@techhouse.uz
              </li>
              <li className="flex items-start gap-2 text-secondary-foreground/80">
                <MapPin className="h-4 w-4 mt-1" />
                Tashkent, Uzbekistan<br />Navoi Street, 15
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-secondary-foreground/10 border-secondary-foreground/20"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/60">
            © 2026 Tech House. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-60" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
