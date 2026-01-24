import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Divya Krishnan',
    location: 'Chennai',
    text: 'Ordered a custom birthday cake for my son and it was absolutely stunning! The taste was even better than it looked. Thank you!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'Avadi',
    text: 'The chocolate truffle cake was a masterpiece! Not only beautiful but incredibly delicious. Will definitely order again!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    location: 'Poonamallee',
    text: 'Loved the custom theme cake for my daughter\'s birthday. The quality and attention to detail were exceptional!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Arun Kumar',
    location: 'Chennai',
    text: 'Perfect anniversary cake! Fresh, delicious, and beautifully decorated. Highly recommend The Cake Craving!',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-cream-light p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gold/20 relative"
            >
              <Quote size={40} className="text-gold/30 absolute top-4 right-4" />

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-cocoa-dark text-sm mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-gold/20 pt-4">
                <p className="font-bold text-cocoa-dark">{testimonial.name}</p>
                <p className="text-xs text-cocoa-medium">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
