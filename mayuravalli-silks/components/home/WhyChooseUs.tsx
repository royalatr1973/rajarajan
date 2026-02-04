import { Award, Gem, Leaf, Shield, Truck, Heart } from 'lucide-react'

const features = [
  { icon: Gem, title: 'Pure Silk Guarantee', description: 'Every saree comes with a purity guarantee. Only authentic handwoven silk from trusted weavers.' },
  { icon: Award, title: '20+ Years Legacy', description: 'Two decades of experience in the silk industry. A family tradition of excellence and trust.' },
  { icon: Leaf, title: 'Direct from Weavers', description: 'We source directly from master weavers, ensuring fair prices and authentic craftsmanship.' },
  { icon: Shield, title: 'Quality Assured', description: 'Each saree undergoes rigorous quality checks for zari purity, silk quality, and colour fastness.' },
  { icon: Truck, title: 'Worldwide Shipping', description: 'We deliver across India and internationally. Secure packaging ensures your saree arrives perfect.' },
  { icon: Heart, title: 'Customer First', description: 'Thousands of happy customers worldwide. Personal attention to every order and enquiry.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-silk-dark mb-4">Why Choose Mayuravalli Silks</h2>
          <p className="text-silk-light text-lg max-w-2xl mx-auto">
            What makes us the trusted choice for silk saree connoisseurs
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
                <h3 className="text-silk-dark font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-silk-light text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
