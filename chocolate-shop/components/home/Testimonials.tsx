import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Mumbai',
    text: 'The best chocolates I have ever tasted! The dark chocolate sea salt is absolutely divine. Perfect for gifting too!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'Bangalore',
    text: 'Ordered a custom cake for my daughter\'s birthday. It was a masterpiece! Not only beautiful but incredibly delicious. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    location: 'Delhi',
    text: 'As a vegan, I\'m so happy to find such amazing vegan chocolate options. The quality and taste are exceptional!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Amit Kumar',
    location: 'Pune',
    text: 'I ordered chocolates for my wedding favors. Every guest loved them! The presentation and taste were perfect. Thank you!',
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
