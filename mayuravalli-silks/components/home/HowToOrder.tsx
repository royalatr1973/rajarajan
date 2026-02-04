import { MessageCircle, Palette, CreditCard, Truck } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Us',
    description: 'Browse our collection and reach out via WhatsApp or phone to enquire about your favourite saree.',
  },
  {
    icon: Palette,
    title: 'Choose Your Saree',
    description: 'Select from our curated collections or let us help you find the perfect saree for your occasion.',
  },
  {
    icon: CreditCard,
    title: 'Easy Payment',
    description: 'Pay securely via UPI, bank transfer, or cash on delivery. We make payment simple and safe.',
  },
  {
    icon: Truck,
    title: 'Worldwide Delivery',
    description: 'We ship across India and internationally. Your saree arrives beautifully packaged at your doorstep.',
  },
]

export default function HowToOrder() {
  return (
    <section className="py-20 bg-gradient-to-br from-silk-dark via-silk-medium to-silk-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-4">How to Order</h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Getting your dream silk saree is easy &mdash; just follow these simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="bg-gold/20 rounded-full p-4">
                    <Icon className="h-8 w-8 text-gold" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-gold text-silk-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-cream font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
