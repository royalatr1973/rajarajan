import Link from 'next/link';
import { Instagram, Facebook, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cocoa-dark text-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gold">Artisan Chocolates</h3>
            <p className="text-cream text-sm leading-relaxed">
              Hand-poured, small-batch chocolates crafted with love and the finest ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-cream hover:text-gold transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-cream hover:text-gold transition-colors duration-300"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-cream hover:text-gold transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li className="text-cream text-sm">Shipping & Returns</li>
              <li className="text-cream text-sm">FAQ</li>
              <li className="text-cream text-sm">Contact Us</li>
              <li className="text-cream text-sm">Privacy Policy</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="bg-gold/20 hover:bg-gold hover:text-cocoa-dark p-2 rounded-full transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gold/20 hover:bg-gold hover:text-cocoa-dark p-2 rounded-full transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gold/20 hover:bg-gold hover:text-cocoa-dark p-2 rounded-full transition-all duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-cream text-sm">
              Stay updated with our latest creations and special offers
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/30 mt-8 pt-8 text-center">
          <p className="text-cream text-sm flex items-center justify-center gap-2">
            © 2024 Artisan Chocolates. Made with <Heart size={16} className="text-gold fill-gold" /> by passionate chocolatiers
          </p>
        </div>
      </div>
    </footer>
  );
}
