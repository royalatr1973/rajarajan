import Link from 'next/link';

const categories = [
  {
    title: 'Cakes',
    icon: '🎂',
    description: 'Homemade cakes for every celebration',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    link: '/products/cakes',
  },
  {
    title: 'Biscuits',
    icon: '🍪',
    description: 'Crispy, buttery biscuits and cookies',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    link: '/products/biscuits',
  },
  {
    title: 'Chocolates',
    icon: '🍫',
    description: 'Premium handcrafted chocolates',
    bgColor: 'bg-brown-50',
    iconColor: 'text-brown-600',
    link: '/products/chocolates',
  },
  {
    title: 'Brownies',
    icon: '🧁',
    description: 'Fudgy, delicious brownies',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    link: '/products/brownies',
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Our Product Range
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            Explore our delicious selection of homemade treats
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className="group"
            >
              <div className={`${category.bgColor} p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center hover:scale-105 border-2 border-gold/20 hover:border-gold`}>
                <div className={`text-5xl mb-4 ${category.iconColor}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-cocoa-dark mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-cocoa-medium">
                  {category.description}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-gold group-hover:text-gold-light">
                  Browse →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
