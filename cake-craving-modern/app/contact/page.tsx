'use client';

import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useProducts, ContactSettings } from '@/lib/ProductsContext';

const defaultContact: ContactSettings = {
  phone1: '+91 88384 24741',
  phone2: '+91 99413 56037',
  email: 'cake.cravings22@gmail.com',
  address: '14, Alagrisamy Street, Avadi, Chennai, Tamil Nadu',
  whatsappNumber: '918838424741'
};

export default function ContactPage() {
  const { contact: contextContact, addMessage } = useProducts();
  const [isClient, setIsClient] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use context contact on client, fallback to default on server
  const contact = isClient ? contextContact : defaultContact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save message to the admin panel
    addMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    // Reset submitted state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent('Hi! I would like to order a cake.')}`;

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

      {/* WhatsApp Floating Button (Mobile) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 md:hidden"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="font-semibold">Chat on WhatsApp</span>
      </a>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gold/20">
              <h2 className="text-3xl font-bold text-cocoa-dark mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Thank you! Your message has been sent. We'll get back to you soon.</span>
                </div>
              )}

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
                {/* WhatsApp Chat Button (Desktop) */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <MessageCircle size={28} className="fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Chat on WhatsApp</h3>
                    <p className="text-white/90">Quick response for orders & inquiries</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Phone size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Phone / WhatsApp</h3>
                    <p className="text-cocoa-medium">{contact.phone1}</p>
                    <p className="text-cocoa-medium">{contact.phone2}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Mail size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Email</h3>
                    <p className="text-cocoa-medium">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gold/20">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <MapPin size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cocoa-dark mb-1">Location</h3>
                    <p className="text-cocoa-medium whitespace-pre-line">
                      {contact.address}
                      <br />(Door nearby location / Self pickup)
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
                  Please order 2 days prior to your celebration. We specialize in custom cakes for all occasions - birthdays, weddings, anniversaries, and more. Contact us via DM or WhatsApp for personalized quotes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
