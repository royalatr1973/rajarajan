'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <nav className="bg-cocoa-dark text-cream-light shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-xl sm:text-2xl font-bold text-gold hover:text-gold-light transition-colors duration-300">
              🍰 The Cake Craving
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="text-cream-light hover:text-gold transition-colors duration-300 font-medium"
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="flex items-center space-x-1 text-cream-light hover:text-gold transition-colors duration-300 font-medium">
                <span>Products</span>
                <ChevronDown size={16} />
              </button>

              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                  <Link
                    href="/products/cakes"
                    className="block px-4 py-2 text-cocoa-dark hover:bg-gold hover:text-cocoa-dark transition-colors"
                  >
                    🎂 Cakes
                  </Link>
                  <Link
                    href="/products/biscuits"
                    className="block px-4 py-2 text-cocoa-dark hover:bg-gold hover:text-cocoa-dark transition-colors"
                  >
                    🍪 Biscuits
                  </Link>
                  <Link
                    href="/products/chocolates"
                    className="block px-4 py-2 text-cocoa-dark hover:bg-gold hover:text-cocoa-dark transition-colors"
                  >
                    🍫 Chocolates
                  </Link>
                  <Link
                    href="/products/brownies"
                    className="block px-4 py-2 text-cocoa-dark hover:bg-gold hover:text-cocoa-dark transition-colors"
                  >
                    🧁 Brownies
                  </Link>
                </div>
              )}
            </div>

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
          <div className="lg:hidden flex items-center">
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
        <div className="lg:hidden bg-cocoa-medium border-t border-gold/30">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block py-3 px-4 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Products Section */}
            <div className="space-y-1">
              <div className="py-2 px-4 text-gold font-semibold text-sm">Products</div>
              <Link
                href="/products/cakes"
                className="block py-2 px-6 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                🎂 Cakes
              </Link>
              <Link
                href="/products/biscuits"
                className="block py-2 px-6 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                🍪 Biscuits
              </Link>
              <Link
                href="/products/chocolates"
                className="block py-2 px-6 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                🍫 Chocolates
              </Link>
              <Link
                href="/products/brownies"
                className="block py-2 px-6 text-cream-light hover:bg-cocoa-dark hover:text-gold rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                🧁 Brownies
              </Link>
            </div>

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
