'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from './data/products';

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
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = 'cake-craving-products';
const HERO_STORAGE_KEY = 'cake-craving-hero';
const TESTIMONIALS_STORAGE_KEY = 'cake-craving-testimonials';
const CONTACT_STORAGE_KEY = 'cake-craving-contact';
const MESSAGES_STORAGE_KEY = 'cake-craving-messages';

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

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hero, setHero] = useState<HeroSettings>(defaultHero);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load all data from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch {
        setProducts(initialProducts);
      }
    }

    const storedHero = localStorage.getItem(HERO_STORAGE_KEY);
    if (storedHero) {
      try {
        setHero(JSON.parse(storedHero));
      } catch {
        setHero(defaultHero);
      }
    }

    const storedTestimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (storedTestimonials) {
      try {
        setTestimonials(JSON.parse(storedTestimonials));
      } catch {
        setTestimonials(defaultTestimonials);
      }
    }

    const storedContact = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (storedContact) {
      try {
        setContact(JSON.parse(storedContact));
      } catch {
        setContact(defaultContact);
      }
    }

    const storedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch {
        setMessages([]);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(hero));
    }
  }, [hero, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
    }
  }, [testimonials, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
    }
  }, [contact, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  // Products functions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = (Math.max(...products.map(p => parseInt(p.id)), 0) + 1).toString();
    const newProduct: Product = { ...productData, id: newId };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, ...productData } : p
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const reorderProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const resetProducts = () => {
    setProducts(initialProducts);
    setHero(defaultHero);
    setTestimonials(defaultTestimonials);
    setContact(defaultContact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(defaultHero));
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(defaultTestimonials));
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(defaultContact));
  };

  // Hero functions
  const updateHero = (heroData: Partial<HeroSettings>) => {
    setHero(prev => ({ ...prev, ...heroData }));
  };

  // Testimonials functions
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newId = (Math.max(...testimonials.map(t => parseInt(t.id)), 0) + 1).toString();
    const newTestimonial: Testimonial = { ...testimonialData, id: newId };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, testimonialData: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t =>
      t.id === id ? { ...t, ...testimonialData } : t
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Contact functions
  const updateContact = (contactData: Partial<ContactSettings>) => {
    setContact(prev => ({ ...prev, ...contactData }));
  };

  // Messages functions
  const addMessage = (messageData: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newId = (Math.max(...messages.map(m => parseInt(m.id)), 0) + 1).toString();
    const newMessage: Message = {
      ...messageData,
      id: newId,
      date: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, read: true } : m
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <ProductsContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, reorderProducts, resetProducts,
      hero, updateHero,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      contact, updateContact,
      messages, addMessage, markMessageRead, deleteMessage
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
