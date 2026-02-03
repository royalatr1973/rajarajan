import { supabase } from './supabase';
import { products as fallbackProducts } from './data/products';

// Fallback testimonials
const fallbackTestimonials = [
  { id: 't1', name: 'Divya Krishnan', text: 'Ordered a custom birthday cake for my son and it was absolutely stunning! The taste was even better than it looked. Thank you!', rating: 5 },
  { id: 't2', name: 'Raj Patel', text: 'The chocolate truffle cake was a masterpiece! Not only beautiful but incredibly delicious. Will definitely order again!', rating: 5 },
  { id: 't3', name: 'Priya Sharma', text: 'Loved the custom theme cake for my daughter\'s birthday. The quality and attention to detail were exceptional!', rating: 5 },
  { id: 't4', name: 'Arun Kumar', text: 'Perfect anniversary cake! Fresh, delicious, and beautifully decorated. Highly recommend The Cake Craving!', rating: 5 },
];

export async function getProducts() {
  if (!supabase) return fallbackProducts;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return fallbackProducts;
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: 0,
      type: p.type,
      image: p.image,
      isBestSeller: p.is_best_seller,
      category: p.category,
    }));
  } catch {
    return fallbackProducts;
  }
}

export async function getTestimonials() {
  if (!supabase) return fallbackTestimonials;
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return fallbackTestimonials;
    return data;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getHero() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .eq('id', 'main')
      .single();
    if (error || !data) return null;
    return {
      title: data.title,
      subtitle: data.subtitle,
      ctaText: data.cta_text,
      backgroundImage: data.background_image,
    };
  } catch {
    return null;
  }
}
