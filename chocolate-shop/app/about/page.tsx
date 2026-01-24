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
            Where passion meets craftsmanship in every hand-poured chocolate
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
                Handcrafted with Love, One Batch at a Time
              </h2>
              <p className="text-lg text-cocoa-medium leading-relaxed">
                At Artisan Chocolates, we believe that the best things in life are made by hand.
                Our journey began in a small kitchen with a simple mission: to create exceptional
                chocolates using only the finest ingredients and traditional techniques.
              </p>
              <p className="text-lg text-cocoa-medium leading-relaxed">
                Every piece of chocolate is carefully hand-poured in small batches, ensuring
                consistent quality and attention to detail. We source our cocoa from sustainable
                farms and use only premium ingredients—no artificial flavors, no preservatives,
                just pure, delicious chocolate.
              </p>
              <p className="text-lg text-cocoa-medium leading-relaxed">
                Our commitment to quality means we never rush the process. Each chocolate is
                allowed to set naturally, developing the perfect texture and flavor that makes
                our creations truly special.
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
                Every chocolate is hand-poured with care and passion, never mass-produced.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Award size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Premium Quality</h3>
              <p className="text-cocoa-medium">
                We use only the finest cocoa beans and ingredients from trusted suppliers.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Leaf size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Sustainable</h3>
              <p className="text-cocoa-medium">
                Our ingredients are ethically sourced from sustainable farms around the world.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full">
                <Users size={36} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Family Owned</h3>
              <p className="text-cocoa-medium">
                A small family business dedicated to bringing joy through chocolate.
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
                    Single-origin cocoa beans from ethical farms
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    Organic sugar and natural sweeteners
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
                    Fresh nuts and fruits from local suppliers
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✓</span>
                  <span className="text-lg text-cream">
                    No artificial colors, flavors, or preservatives
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
            Taste the passion and craftsmanship in every bite. Order your handcrafted chocolates today.
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Our Collection
          </a>
        </div>
      </section>
    </div>
  );
}
