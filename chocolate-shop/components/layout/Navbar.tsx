'use client';

import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-cocoa-dark text-cream-light shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-gold hover:text-gold-light transition-colors duration-300">
              Artisan Chocolates
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-cream-light hover:text-gold transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-cream-light hover:text-gold transition-colors duration-300 font-medium"
            >
              Menu
            </Link>
            <Link
              href="/custom-cakes"
              className="text-cream-light hover:text-gold transition-colors duration-300 font-medium"
            >
              Custom Cakes
            </Link>
            <Link
              href="/about"
              className="text-cream-light hover:text-gold transition-colors duration-300 font-medium"
            >
              About Us
            </Link>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="flex items-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark px-4 py-2 rounded-full transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              <Phone size={20} />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cocoa-medium border-t border-gold/30">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block py-3 px-4 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-3 px-4 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/custom-cakes"
              className="block py-3 px-4 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Cakes
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-4 bg-gold text-cocoa-dark hover:bg-gold-light rounded-lg transition-all font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
