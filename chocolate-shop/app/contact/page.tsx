'use client';

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark text-cream-light py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-cream max-w-3xl mx-auto leading-relaxed">
            Have a question or want to place an order? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gold/20">
              <h2 className="text-3xl font-bold text-cocoa-dark mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-cocoa-dark mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:border-gold text-cocoa-dark"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-cocoa-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:border-gold text-cocoa-dark"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-cocoa-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:border-gold text-cocoa-dark"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-cocoa-dark mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:border-gold text-cocoa-dark resize-none"
                    placeholder="Tell us about your order or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-cocoa-dark mb-6">Contact Information</h2>
                <p className="text-lg text-cocoa-medium mb-8">
                  Reach out to us through any of these channels. We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Phone size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Phone</h3>
                    <p className="text-cocoa-medium">+91 98765 43210</p>
                    <p className="text-cocoa-medium">+91 87654 32109</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Mail size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Email</h3>
                    <p className="text-cocoa-medium">orders@artisanchocolates.com</p>
                    <p className="text-cocoa-medium">info@artisanchocolates.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <MapPin size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Location</h3>
                    <p className="text-cocoa-medium">
                      123 Sweet Street<br />
                      Chocolate Lane<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Clock size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Business Hours</h3>
                    <p className="text-cocoa-medium">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-cocoa-medium">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gold/20 to-gold/10 p-6 rounded-xl border border-gold/30">
                <h3 className="font-bold text-cocoa-dark mb-2">Custom Orders Welcome!</h3>
                <p className="text-sm text-cocoa-medium">
                  Looking for custom cakes or bulk orders for events? Contact us for personalized quotes and we'll create something special just for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
