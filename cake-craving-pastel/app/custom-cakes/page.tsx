import Image from 'next/image';
import Link from 'next/link';
import { Cake, Heart, Phone, ArrowRight } from 'lucide-react';

const customCakes = [
  {
    id: 1,
    title: 'Three-Tier Wedding Cake',
    description: 'Elegant white chocolate ganache with gold leaf accents',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
    occasion: 'Wedding',
  },
  {
    id: 2,
    title: 'Birthday Celebration Cake',
    description: 'Multi-layered chocolate cake with raspberry filling',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80',
    occasion: 'Birthday',
  },
  {
    id: 3,
    title: 'Anniversary Special',
    description: 'Heart-shaped dark chocolate cake with rose decorations',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80c05?w=800&q=80',
    occasion: 'Anniversary',
  },
  {
    id: 4,
    title: 'Corporate Event Cake',
    description: 'Branded chocolate cake with company logo',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    occasion: 'Corporate',
  },
  {
    id: 5,
    title: 'Baby Shower Delight',
    description: 'Pastel-themed chocolate cake with fondant decorations',
    image: 'https://images.unsplash.com/photo-1562440499-64c9a5623d78?w=800&q=80',
    occasion: 'Baby Shower',
  },
  {
    id: 6,
    title: 'Graduation Cake',
    description: 'Chocolate truffle cake with graduation cap topper',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80',
    occasion: 'Graduation',
  },
];

export default function CustomCakesPage() {
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark text-cream-light py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-6">
            <Cake size={40} className="text-gold" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Custom Chocolate Cakes</h1>
          <p className="text-xl text-cream max-w-3xl mx-auto leading-relaxed mb-8">
            Make your special moments unforgettable with our handcrafted custom cakes
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone size={20} />
            <span>Order Your Custom Cake</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full">
                <Heart size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Made with Love</h3>
              <p className="text-cocoa-medium">
                Each cake is crafted with care and attention to detail, just for you
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full">
                <Cake size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Fully Customizable</h3>
              <p className="text-cocoa-medium">
                Choose your flavors, designs, colors, and decorations
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full">
                <Phone size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-cocoa-dark">Personal Consultation</h3>
              <p className="text-cocoa-medium">
                Work directly with our bakers to bring your vision to life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
              Our Custom Creations
            </h2>
            <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
              Browse through some of our previous custom cake creations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {customCakes.map((cake) => (
              <div
                key={cake.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold/20"
              >
                <div className="relative h-72 overflow-hidden bg-cream">
                  <Image
                    src={cake.image}
                    alt={cake.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-gold text-cocoa-dark px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {cake.occasion}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cocoa-dark mb-2">
                    {cake.title}
                  </h3>
                  <p className="text-sm text-cocoa-medium">
                    {cake.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cocoa-dark to-cocoa-medium text-cream-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Dream Cake?</h2>
          <p className="text-xl text-cream mb-8 leading-relaxed">
            Whether it's a wedding, birthday, anniversary, or any special occasion, we'll create a masterpiece that tastes as amazing as it looks.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>Get a Quote</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-cream mt-6">
            Minimum 7 days advance notice required for custom orders
          </p>
        </div>
      </section>
    </div>
  );
}
