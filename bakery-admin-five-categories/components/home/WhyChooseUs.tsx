import { Award, Heart, Leaf, Palette, Timer, ThumbsUp } from 'lucide-react'

const features = [
  { icon: Award, title: 'Certified Baker', description: 'Professionally trained and certified in baking arts.' },
  { icon: Heart, title: 'Made with Love', description: 'Every treat is handcrafted with passion and care.' },
  { icon: Leaf, title: 'Premium Ingredients', description: 'Only the finest, freshest ingredients in every bite.' },
  { icon: Palette, title: 'Custom Designs', description: 'Unique designs tailored to your special occasions.' },
  { icon: Timer, title: 'Always Fresh', description: 'Baked fresh for every order - never mass produced.' },
  { icon: ThumbsUp, title: '100% Satisfaction', description: 'Your happiness is guaranteed with every order.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cocoa-dark mb-4">Why Choose Us</h2>
          <p className="text-cocoa-medium text-lg max-w-2xl mx-auto">
            What makes Cake Cravings special
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-cream-light rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="bg-gold/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-cocoa-dark font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-cocoa-light text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
