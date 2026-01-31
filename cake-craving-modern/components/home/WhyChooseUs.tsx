import { Award, Clock, ShieldCheck, Sparkles, Heart, ThumbsUp } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Award,
    title: 'Award Winning Taste',
    description: 'Trained in professional baking with years of experience',
  },
  {
    id: 2,
    icon: Heart,
    title: '100% Homemade',
    description: 'Every cake is made fresh from scratch with love',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'Premium Ingredients',
    description: 'Only the finest quality ingredients, no preservatives',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Custom Designs',
    description: 'Personalized cakes tailored to your vision',
  },
  {
    id: 5,
    icon: Clock,
    title: 'Fresh on Order',
    description: 'Baked fresh just for you, never frozen',
  },
  {
    id: 6,
    icon: ThumbsUp,
    title: 'Customer Satisfaction',
    description: 'Hundreds of happy customers and 5-star reviews',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Why Choose The Cake Craving?
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            We're committed to making your celebrations sweeter with quality cakes made from the heart
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gold group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4 group-hover:bg-gold/30 transition-all">
                  <Icon size={32} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold text-cocoa-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-cocoa-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white px-8 py-6 rounded-2xl shadow-lg border-2 border-gold/30">
            <p className="text-cocoa-dark text-lg font-semibold mb-2">
              🏆 Trusted by 500+ Happy Customers in Chennai
            </p>
            <p className="text-cocoa-medium text-sm">
              Rated 4.9/5 on Google Reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
