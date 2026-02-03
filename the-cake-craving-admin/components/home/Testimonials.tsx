import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '@/lib/data-service';

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="bg-cream-light p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gold/20 relative"
            >
              <Quote size={40} className="text-gold/30 absolute top-4 right-4" />

              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-cocoa-dark text-sm mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="border-t border-gold/20 pt-4">
                <p className="font-bold text-cocoa-dark">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
