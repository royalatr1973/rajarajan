'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from './data/products';
import { supabase } from './supabase';

export interface HeroSettings {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface ContactSettings {
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  whatsappNumber: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  reorderProducts: (products: Product[]) => void;
  resetProducts: () => void;
  hero: HeroSettings;
  updateHero: (hero: Partial<HeroSettings>) => void;
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  contact: ContactSettings;
  updateContact: (contact: Partial<ContactSettings>) => void;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  isLoading: boolean;
  useSupabase: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const defaultHero: HeroSettings = {
  title: 'Homemade treats crafted for every occasion',
  subtitle: 'Great Taste in Every Bite! Explore our delicious range of cakes, biscuits, chocolates & brownies from Ajis Bakes.',
  ctaText: 'Order Now',
  backgroundImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80'
};

const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Priya S.', text: 'The chocolate truffle cake was absolutely divine! Perfect for my birthday celebration.', rating: 5 },
  { id: '2', name: 'Rahul M.', text: 'Best homemade cakes in Chennai! The butterscotch cake is my favorite.', rating: 5 },
  { id: '3', name: 'Ananya K.', text: 'Ordered a custom cake for my daughter\'s birthday. It exceeded all expectations!', rating: 5 },
  { id: '4', name: 'Vijay R.', text: 'Fresh, delicious, and beautifully decorated. Highly recommend!', rating: 5 },
];

const defaultContact: ContactSettings = {
  phone1: '+91 95661 44888',
  phone2: '',
  email: '',
  address: 'Chennai, Tamil Nadu',
  whatsappNumber: '919566144888'
};

function loadFromLocalStorage() {
  if (typeof window === 'undefined') return null;

  try {
    const storedProducts = localStorage.getItem('ajis-bakes-products');
    const storedHero = localStorage.getItem('ajis-bakes-hero');
    const storedTestimonials = localStorage.getItem('ajis-bakes-testimonials');
    const storedContact = localStorage.getItem('ajis-bakes-contact');
    const storedMessages = localStorage.getItem('ajis-bakes-messages');

    return {
      products: storedProducts ? JSON.parse(storedProducts) : null,
      hero: storedHero ? JSON.parse(storedHero) : null,
      testimonials: storedTestimonials ? JSON.parse(storedTestimonials) : null,
      contact: storedContact ? JSON.parse(storedContact) : null,
      messages: storedMessages ? JSON.parse(storedMessages) : null,
    };
  } catch {
    return null;
  }
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hero, setHero] = useState<HeroSettings>(defaultHero);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sbActive, setSbActive] = useState(false);

  // Fetch from Supabase first, fallback to localStorage only if Supabase fails
  const loadData = useCallback(async () => {
    setIsLoading(true);

    if (supabase) {
      try {
        // Fetch all data from Supabase in parallel
        const [productsRes, heroRes, testimonialsRes, contactRes, messagesRes] = await Promise.all([
          supabase.from('products').select('*').order('sort_order'),
          supabase.from('hero_settings').select('*').single(),
          supabase.from('testimonials').select('*').order('sort_order'),
          supabase.from('contact_settings').select('*').single(),
          supabase.from('messages').select('*').order('created_at', { ascending: false }),
        ]);

        if (!productsRes.error && productsRes.data && productsRes.data.length > 0) {
          setSbActive(true);

          setProducts(productsRes.data.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: p.price || 0,
            image: p.image || '',
            vertical: p.vertical || 'Cakes',
            type: p.category || 'Classic',
            isBestSeller: p.is_bestseller || false
          })));

          if (heroRes && !heroRes.error && heroRes.data) {
            setHero({
              title: heroRes.data.title,
              subtitle: heroRes.data.subtitle || '',
              ctaText: heroRes.data.cta_text || 'Order Now',
              backgroundImage: heroRes.data.background_image || ''
            });
          }

          if (testimonialsRes && !testimonialsRes.error && testimonialsRes.data) {
            setTestimonials(testimonialsRes.data.map((t: Record<string, unknown>) => ({
              id: t.id as string,
              name: t.name as string,
              text: (t.content as string) || '',
              rating: (t.rating as number) || 5
            })));
          }

          if (contactRes && !contactRes.error && contactRes.data) {
            setContact({
              phone1: (contactRes.data.phone as string) || '',
              phone2: (contactRes.data.phone2 as string) || '',
              email: (contactRes.data.email as string) || '',
              address: (contactRes.data.address as string) || '',
              whatsappNumber: (contactRes.data.whatsapp as string) || ''
            });
          }

          if (messagesRes && !messagesRes.error && messagesRes.data) {
            setMessages(messagesRes.data.map((m: Record<string, unknown>) => ({
              id: m.id as string,
              name: m.name as string,
              email: (m.email as string) || '',
              phone: (m.phone as string) || '',
              message: (m.message as string) || '',
              date: (m.created_at as string) || new Date().toISOString(),
              read: (m.read as boolean) || false
            })));
          }

          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.warn('Supabase failed:', error);
      }
    }

    // Fallback: localStorage or defaults
    const stored = loadFromLocalStorage();
    if (stored && stored.products) {
      setProducts(stored.products);
      if (stored.hero) setHero(stored.hero);
      if (stored.testimonials) setTestimonials(stored.testimonials);
      if (stored.contact) setContact(stored.contact);
      if (stored.messages) setMessages(stored.messages);
    } else {
      setProducts(initialProducts);
      setTestimonials(defaultTestimonials);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Save to localStorage as backup (always)
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try { localStorage.setItem('ajis-bakes-products', JSON.stringify(products)); } catch {}
    }
  }, [products, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try { localStorage.setItem('ajis-bakes-hero', JSON.stringify(hero)); } catch {}
    }
  }, [hero, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try { localStorage.setItem('ajis-bakes-testimonials', JSON.stringify(testimonials)); } catch {}
    }
  }, [testimonials, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try { localStorage.setItem('ajis-bakes-contact', JSON.stringify(contact)); } catch {}
    }
  }, [contact, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try { localStorage.setItem('ajis-bakes-messages', JSON.stringify(messages)); } catch {}
    }
  }, [messages, isLoading]);

  // Products functions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = (Math.max(...products.map(p => parseInt(p.id) || 0), 0) + 1).toString();
    const newProduct: Product = { ...productData, id: newId };

    setProducts(prev => [...prev, newProduct]);

    if (sbActive && supabase) {
      supabase.from('products').insert({
        id: newId,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        vertical: productData.vertical,
        category: productData.type,
        is_bestseller: productData.isBestSeller || false,
        sort_order: products.length + 1
      }).then(null, () => {});
    }
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, ...productData } : p
    ));

    if (sbActive && supabase) {
      const updateData: Record<string, unknown> = {};
      if (productData.name !== undefined) updateData.name = productData.name;
      if (productData.description !== undefined) updateData.description = productData.description;
      if (productData.price !== undefined) updateData.price = productData.price;
      if (productData.image !== undefined) updateData.image = productData.image;
      if (productData.vertical !== undefined) updateData.vertical = productData.vertical;
      if (productData.type !== undefined) updateData.category = productData.type;
      if (productData.isBestSeller !== undefined) updateData.is_bestseller = productData.isBestSeller;

      supabase.from('products').update(updateData).eq('id', id).then(null, () => {});
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    if (sbActive && supabase) {
      supabase.from('products').delete().eq('id', id).then(null, () => {});
    }
  };

  const reorderProducts = (newProducts: Product[]) => {
    setProducts(newProducts);

    if (sbActive && supabase) {
      const sb = supabase;
      const updates = newProducts.map((p, index) =>
        sb.from('products').update({ sort_order: index + 1 }).eq('id', p.id)
      );
      Promise.all(updates).then(null, () => {});
    }
  };

  const resetProducts = () => {
    setProducts(initialProducts);
    setHero(defaultHero);
    setTestimonials(defaultTestimonials);
    setContact(defaultContact);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ajis-bakes-products', JSON.stringify(initialProducts));
        localStorage.setItem('ajis-bakes-hero', JSON.stringify(defaultHero));
        localStorage.setItem('ajis-bakes-testimonials', JSON.stringify(defaultTestimonials));
        localStorage.setItem('ajis-bakes-contact', JSON.stringify(defaultContact));
      } catch {}
    }
  };

  // Hero functions
  const updateHero = (heroData: Partial<HeroSettings>) => {
    const newHero = { ...hero, ...heroData };
    setHero(newHero);

    if (sbActive && supabase) {
      supabase.from('hero_settings').upsert({
        id: 1,
        title: newHero.title,
        subtitle: newHero.subtitle,
        cta_text: newHero.ctaText,
        background_image: newHero.backgroundImage
      }).then(null, () => {});
    }
  };

  // Testimonials functions
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newId = (Math.max(...testimonials.map(t => parseInt(t.id) || 0), 0) + 1).toString();
    const newTestimonial: Testimonial = { ...testimonialData, id: newId };
    setTestimonials(prev => [...prev, newTestimonial]);

    if (sbActive && supabase) {
      supabase.from('testimonials').insert({
        id: newId,
        name: testimonialData.name,
        content: testimonialData.text,
        rating: testimonialData.rating,
        sort_order: testimonials.length + 1
      }).then(null, () => {});
    }
  };

  const updateTestimonial = (id: string, testimonialData: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t =>
      t.id === id ? { ...t, ...testimonialData } : t
    ));

    if (sbActive && supabase) {
      const updateData: Record<string, unknown> = {};
      if (testimonialData.name !== undefined) updateData.name = testimonialData.name;
      if (testimonialData.text !== undefined) updateData.content = testimonialData.text;
      if (testimonialData.rating !== undefined) updateData.rating = testimonialData.rating;

      supabase.from('testimonials').update(updateData).eq('id', id).then(null, () => {});
    }
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));

    if (sbActive && supabase) {
      supabase.from('testimonials').delete().eq('id', id).then(null, () => {});
    }
  };

  // Contact functions
  const updateContact = (contactData: Partial<ContactSettings>) => {
    const newContact = { ...contact, ...contactData };
    setContact(newContact);

    if (sbActive && supabase) {
      supabase.from('contact_settings').upsert({
        id: 1,
        address: newContact.address,
        phone: newContact.phone1,
        phone2: newContact.phone2,
        email: newContact.email,
        whatsapp: newContact.whatsappNumber
      }).then(null, () => {});
    }
  };

  // Messages functions
  const addMessage = (messageData: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newId = (Math.max(...messages.map(m => parseInt(m.id) || 0), 0) + 1).toString();
    const newMessage: Message = {
      ...messageData,
      id: newId,
      date: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);

    if (sbActive && supabase) {
      supabase.from('messages').insert({
        id: newId,
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        message: messageData.message,
        read: false
      }).then(null, () => {});
    }
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, read: true } : m
    ));

    if (sbActive && supabase) {
      supabase.from('messages').update({ read: true }).eq('id', id).then(null, () => {});
    }
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));

    if (sbActive && supabase) {
      supabase.from('messages').delete().eq('id', id).then(null, () => {});
    }
  };

  return (
    <ProductsContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, reorderProducts, resetProducts,
      hero, updateHero,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      contact, updateContact,
      messages, addMessage, markMessageRead, deleteMessage,
      isLoading, useSupabase: sbActive
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
