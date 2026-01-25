import Link from 'next/link';
import { Cake, Heart, Users, Gift, Baby, GraduationCap } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Birthday Cakes',
    description: 'Make birthdays special with custom cakes',
    icon: Cake,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 2,
    name: 'Wedding Cakes',
    description: 'Elegant multi-tier cakes for your big day',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 3,
    name: 'Anniversary',
    description: 'Celebrate love with romantic designs',
    icon: Users,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    name: 'Party Cakes',
    description: 'Perfect for all celebrations',
    icon: Gift,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 5,
    name: 'Baby Shower',
    description: 'Adorable cakes for the little ones',
    icon: Baby,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 6,
    name: 'Graduation',
    description: 'Celebrate achievements in style',
    icon: GraduationCap,
    color: 'bg-green-100 text-green-600',
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Cakes for Every Occasion
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            From birthdays to weddings, we create custom cakes for all your celebrations
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href="/custom-cakes"
                className="group bg-cream-light hover:bg-cream p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gold"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-cocoa-dark mb-2">
                  {category.name}
                </h3>
                <p className="text-cocoa-medium text-sm">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/custom-cakes"
            className="inline-flex items-center justify-center bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Custom Cakes
          </Link>
        </div>
      </div>
    </section>
  );
}
