import { MessageCircle, Calendar, CreditCard, PackageCheck } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: MessageCircle,
    title: 'Contact Us',
    description: 'Reach out via WhatsApp, Instagram DM, or our contact form with your requirements',
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Book 2 Days Prior',
    description: 'Place your order at least 2 days before your celebration date',
  },
  {
    id: 3,
    icon: CreditCard,
    title: 'Confirm Details',
    description: 'Discuss customization, flavors, design, and confirm pricing',
  },
  {
    id: 4,
    icon: PackageCheck,
    title: 'Pickup or Delivery',
    description: 'Collect your fresh homemade cake or opt for nearby location delivery',
  },
];

export default function HowToOrder() {
  return (
    <section className="py-20 bg-gradient-to-br from-cocoa-dark to-cocoa-medium text-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            How to Order
          </h2>
          <p className="text-xl text-cream max-w-2xl mx-auto">
            Simple steps to get your perfect custom cake
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full border-2 border-gold/30 hover:border-gold transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold text-cocoa-dark rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6 mt-2">
                    <Icon size={32} className="text-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-cream text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gold">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-cocoa-dark font-bold px-10 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Start Your Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
