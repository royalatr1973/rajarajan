import { Phone, CalendarDays, ClipboardCheck, PackageCheck } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    title: 'Contact Us',
    description: 'Reach out via phone, WhatsApp, or our contact form to discuss your order.',
  },
  {
    icon: CalendarDays,
    title: 'Book 2 Days Prior',
    description: 'Place your order at least 2 days in advance for custom cakes and large orders.',
  },
  {
    icon: ClipboardCheck,
    title: 'Confirm Details',
    description: 'Confirm the flavor, design, size, and delivery details for your order.',
  },
  {
    icon: PackageCheck,
    title: 'Pickup or Delivery',
    description: 'Pick up your freshly baked order or we can arrange delivery to your doorstep.',
  },
]

export default function HowToOrder() {
  return (
    <section className="py-20 bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-4">How to Order</h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Getting your favorite treats is easy - just follow these simple steps
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
                  <span className="absolute -top-2 -right-2 bg-gold text-cocoa-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
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
