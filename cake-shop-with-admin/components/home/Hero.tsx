import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getHero, urlFor } from '@/lib/sanity';

export default async function Hero() {
  const hero = await getHero();

  // Fallback content if CMS data is not available yet
  const title = hero?.title || 'Home made, customized cakes for every celebration';
  const subtitle = hero?.subtitle || 'Cake is the secret ingredient for a joyful celebration, make it little sweeter with our delectable cakes!';
  const ctaText = hero?.ctaText || 'Order Now';
  const backgroundImage = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1200).url()
    : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80';

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
              {title}
            </h1>

            <p className="text-lg lg:text-xl text-cream leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>{ctaText}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center space-x-2 bg-transparent hover:bg-cream-light/10 text-cream-light border-2 border-cream-light/30 hover:border-gold font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>View Menu</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/30">
              <div>
                <div className="text-3xl font-bold text-gold">100%</div>
                <div className="text-sm text-cream">Homemade</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">2 Days</div>
                <div className="text-sm text-cream">Prior Order</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">Certified</div>
                <div className="text-sm text-cream">Home Baker</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={backgroundImage}
              alt="Homemade cakes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
