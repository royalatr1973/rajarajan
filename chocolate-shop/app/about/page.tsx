import Image from 'next/image';
import { Heart, Award, Leaf, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark text-cream-light py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-cream max-w-3xl mx-auto leading-relaxed">
            Where passion meets craftsmanship in every homemade cake
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80"
                alt="Chocolate making process"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-cocoa-dark mb-6">
                Homemade with Love, One Cake at a Time
              </h2>
              <p className="text-lg text-cocoa-medium leading-relaxed">
                At The Cake Craving, we believe that the best cakes are made at home with love.
                Our journey began in a small kitchen in Avadi, Chennai with a simple mission: to create
                exceptional homemade cakes for every celebration using only the finest ingredients.
              </p>
              <p className="text-lg text-cocoa-medium leading-relaxed">
                Every cake is carefully crafted by certified home bakers, ensuring consistent quality
                and attention to detail. We use only premium ingredients—no artificial flavors,
                no preservatives, just pure, delicious cakes made fresh to order.
              </p>
              <p className="text-lg text-cocoa-medium leading-relaxed">
                "Cake is the secret ingredient for a joyful celebration, make it little sweeter with
                our delectable cakes!" We require 2 days prior notice to ensure your cake is baked
                fresh and perfect for your special moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-cocoa-dark text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Heart size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Made with Love</h3>
              <p className="text-cocoa-medium">
                Every cake is handmade with care and passion, never mass-produced.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Award size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Certified Baker</h3>
              <p className="text-cocoa-medium">
                Certified home baker ensuring quality and food safety standards.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Leaf size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Fresh & Custom</h3>
              <p className="text-cocoa-medium">
                Freshly baked to order with customization options for your special occasions.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Users size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Home Based</h3>
              <p className="text-cocoa-medium">
                A home-based business in Avadi, Chennai dedicated to bringing joy through cakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-gradient-to-br from-cocoa-dark to-cocoa-medium text-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-6">
                Quality Ingredients, No Compromises
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    Premium quality flour and fresh eggs
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    High-quality chocolate and cocoa powder
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    Real vanilla extract, never artificial
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    Fresh fruits and nuts from trusted suppliers
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    No artificial preservatives, made fresh to order
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&q=80"
                alt="Premium chocolate ingredients"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-cocoa-dark mb-6">
            Experience the Difference
          </h2>
          <p className="text-xl text-cocoa-medium mb-8">
            Taste the passion and craftsmanship in every bite. Order your homemade cakes today. Remember to order 2 days prior!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Order Now
          </a>
        </div>
      </section>
    </div>
  );
}
