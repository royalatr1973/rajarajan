import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark text-cream-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30">
              <Sparkles size={18} className="text-gold" />
              <span className="text-sm font-medium text-gold">Handcrafted Excellence</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Small-batch,{' '}
              <span className="text-gold">hand-poured</span> chocolates
            </h1>

            <p className="text-lg lg:text-xl text-cream leading-relaxed max-w-xl">
              Experience the art of chocolate-making with our premium, handcrafted chocolates.
              Each piece is carefully crafted using the finest ingredients and traditional techniques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>Shop Now</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center space-x-2 bg-transparent hover:bg-cream-light/10 text-cream-light border-2 border-cream-light/30 hover:border-gold font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Our Story</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/30">
              <div>
                <div className="text-3xl font-bold text-gold">100%</div>
                <div className="text-sm text-cream">Handmade</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">Fresh</div>
                <div className="text-sm text-cream">Daily Batches</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">Premium</div>
                <div className="text-sm text-cream">Ingredients</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&q=80"
              alt="Artisan chocolates"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/60 to-transparent"></div>

            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-cream-light text-cocoa-dark px-6 py-4 rounded-xl shadow-xl backdrop-blur-sm">
              <div className="text-sm font-semibold">Starting from</div>
              <div className="text-3xl font-bold text-gold">$10.99</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
