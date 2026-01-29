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
  title: 'Home made, customized cakes for every celebration',
  subtitle: 'Cake is the secret ingredient for a joyful celebration, make it little sweeter with our delectable cakes!',
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
  phone1: '+91 88384 24741',
  phone2: '+91 99413 56037',
  email: 'cake.cravings22@gmail.com',
  address: '14, Alagrisamy Street, Avadi, Chennai, Tamil Nadu',
  whatsappNumber: '918838424741'
};

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hero, setHero] = useState<HeroSettings>(defaultHero);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);

  // Load data from Supabase or localStorage
  const loadData = useCallback(async () => {
    setIsLoading(true);

    if (isSupabaseConfigured() && supabase) {
      try {
        // Try to fetch from Supabase
        const [productsRes, heroRes, testimonialsRes, contactRes, messagesRes] = await Promise.all([
          supabase.from('products').select('*').order('sort_order'),
          supabase.from('hero_settings').select('*').single(),
          supabase.from('testimonials').select('*').order('sort_order'),
          supabase.from('contact_settings').select('*').single(),
          supabase.from('messages').select('*').order('created_at', { ascending: false })
        ]);

        if (!productsRes.error && productsRes.data && productsRes.data.length > 0) {
          setUseSupabase(true);

          // Map products from DB format to app format
          setProducts(productsRes.data.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: p.price || 0,
            image: p.image || '',
            type: p.category || 'Classic',
            isBestSeller: p.is_bestseller || false
          })));

          if (!heroRes.error && heroRes.data) {
            setHero({
              title: heroRes.data.title,
              subtitle: heroRes.data.subtitle || '',
              ctaText: heroRes.data.cta_text || 'Order Now',
              backgroundImage: heroRes.data.background_image || ''
            });
          }

          if (!testimonialsRes.error && testimonialsRes.data) {
            setTestimonials(testimonialsRes.data.map(t => ({
              id: t.id,
              name: t.name,
              text: t.content,
              rating: t.rating || 5
            })));
          }

          if (!contactRes.error && contactRes.data) {
            setContact({
              phone1: contactRes.data.phone || '',
              phone2: contactRes.data.phone2 || '',
              email: contactRes.data.email || '',
              address: contactRes.data.address || '',
              whatsappNumber: contactRes.data.whatsapp || ''
            });
          }

          if (!messagesRes.error && messagesRes.data) {
            setMessages(messagesRes.data.map(m => ({
              id: m.id,
              name: m.name,
              email: m.email || '',
              phone: m.phone || '',
              message: m.message,
              date: m.created_at,
              read: m.read || false
            })));
          }

          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('Supabase not available, falling back to localStorage', error);
      }
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem('cake-craving-products');
      if (storedProducts) {
        try {
          setProducts(JSON.parse(storedProducts));
        } catch {
          setProducts(initialProducts);
        }
      }

      const storedHero = localStorage.getItem('cake-craving-hero');
      if (storedHero) {
        try {
          setHero(JSON.parse(storedHero));
        } catch {
          setHero(defaultHero);
        }
      }

      const storedTestimonials = localStorage.getItem('cake-craving-testimonials');
      if (storedTestimonials) {
        try {
          setTestimonials(JSON.parse(storedTestimonials));
        } catch {
          setTestimonials(defaultTestimonials);
        }
      }

      const storedContact = localStorage.getItem('cake-craving-contact');
      if (storedContact) {
        try {
          setContact(JSON.parse(storedContact));
        } catch {
          setContact(defaultContact);
        }
      }

      const storedMessages = localStorage.getItem('cake-craving-messages');
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages));
        } catch {
          setMessages([]);
        }
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Save to localStorage as backup (always)
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('cake-craving-products', JSON.stringify(products));
    }
  }, [products, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('cake-craving-hero', JSON.stringify(hero));
    }
  }, [hero, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('cake-craving-testimonials', JSON.stringify(testimonials));
    }
  }, [testimonials, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('cake-craving-contact', JSON.stringify(contact));
    }
  }, [contact, isLoading]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('cake-craving-messages', JSON.stringify(messages));
    }
  }, [messages, isLoading]);

  // Products functions
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newId = (Math.max(...products.map(p => parseInt(p.id) || 0), 0) + 1).toString();
    const newProduct: Product = { ...productData, id: newId };

    setProducts(prev => [...prev, newProduct]);

    if (useSupabase && supabase) {
      await supabase.from('products').insert({
        id: newId,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        category: productData.type,
        is_bestseller: productData.isBestSeller || false,
        sort_order: products.length + 1
      });
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, ...productData } : p
    ));

    if (useSupabase && supabase) {
      const updateData: Record<string, unknown> = {};
      if (productData.name !== undefined) updateData.name = productData.name;
      if (productData.description !== undefined) updateData.description = productData.description;
      if (productData.price !== undefined) updateData.price = productData.price;
      if (productData.image !== undefined) updateData.image = productData.image;
      if (productData.type !== undefined) updateData.category = productData.type;
      if (productData.isBestSeller !== undefined) updateData.is_bestseller = productData.isBestSeller;

      await supabase.from('products').update(updateData).eq('id', id);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    if (useSupabase && supabase) {
      await supabase.from('products').delete().eq('id', id);
    }
  };

  const reorderProducts = async (newProducts: Product[]) => {
    setProducts(newProducts);

    if (useSupabase && supabase) {
      // Update sort_order for all products
      const sb = supabase;
      const updates = newProducts.map((p, index) =>
        sb.from('products').update({ sort_order: index + 1 }).eq('id', p.id)
      );
      await Promise.all(updates);
    }
  };

  const resetProducts = async () => {
    setProducts(initialProducts);
    setHero(defaultHero);
    setTestimonials(defaultTestimonials);
    setContact(defaultContact);

    if (typeof window !== 'undefined') {
      localStorage.setItem('cake-craving-products', JSON.stringify(initialProducts));
      localStorage.setItem('cake-craving-hero', JSON.stringify(defaultHero));
      localStorage.setItem('cake-craving-testimonials', JSON.stringify(defaultTestimonials));
      localStorage.setItem('cake-craving-contact', JSON.stringify(defaultContact));
    }

    // Note: Supabase reset would need to be handled separately if needed
  };

  // Hero functions
  const updateHero = async (heroData: Partial<HeroSettings>) => {
    const newHero = { ...hero, ...heroData };
    setHero(newHero);

    if (useSupabase && supabase) {
      await supabase.from('hero_settings').upsert({
        id: 1,
        title: newHero.title,
        subtitle: newHero.subtitle,
        cta_text: newHero.ctaText,
        background_image: newHero.backgroundImage
      });
    }
  };

  // Testimonials functions
  const addTestimonial = async (testimonialData: Omit<Testimonial, 'id'>) => {
    const newId = (Math.max(...testimonials.map(t => parseInt(t.id) || 0), 0) + 1).toString();
    const newTestimonial: Testimonial = { ...testimonialData, id: newId };
    setTestimonials(prev => [...prev, newTestimonial]);

    if (useSupabase && supabase) {
      await supabase.from('testimonials').insert({
        id: newId,
        name: testimonialData.name,
        content: testimonialData.text,
        rating: testimonialData.rating,
        sort_order: testimonials.length + 1
      });
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t =>
      t.id === id ? { ...t, ...testimonialData } : t
    ));

    if (useSupabase && supabase) {
      const updateData: Record<string, unknown> = {};
      if (testimonialData.name !== undefined) updateData.name = testimonialData.name;
      if (testimonialData.text !== undefined) updateData.content = testimonialData.text;
      if (testimonialData.rating !== undefined) updateData.rating = testimonialData.rating;

      await supabase.from('testimonials').update(updateData).eq('id', id);
    }
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));

    if (useSupabase && supabase) {
      await supabase.from('testimonials').delete().eq('id', id);
    }
  };

  // Contact functions
  const updateContact = async (contactData: Partial<ContactSettings>) => {
    const newContact = { ...contact, ...contactData };
    setContact(newContact);

    if (useSupabase && supabase) {
      await supabase.from('contact_settings').upsert({
        id: 1,
        address: newContact.address,
        phone: newContact.phone1,
        phone2: newContact.phone2,
        email: newContact.email,
        whatsapp: newContact.whatsappNumber
      });
    }
  };

  // Messages functions
  const addMessage = async (messageData: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newId = (Math.max(...messages.map(m => parseInt(m.id) || 0), 0) + 1).toString();
    const newMessage: Message = {
      ...messageData,
      id: newId,
      date: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);

    if (useSupabase && supabase) {
      await supabase.from('messages').insert({
        id: newId,
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        message: messageData.message,
        read: false
      });
    }
  };

  const markMessageRead = async (id: string) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, read: true } : m
    ));

    if (useSupabase && supabase) {
      await supabase.from('messages').update({ read: true }).eq('id', id);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));

    if (useSupabase && supabase) {
      await supabase.from('messages').delete().eq('id', id);
    }
  };

  return (
    <ProductsContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, reorderProducts, resetProducts,
      hero, updateHero,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      contact, updateContact,
      messages, addMessage, markMessageRead, deleteMessage,
      isLoading, useSupabase
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
