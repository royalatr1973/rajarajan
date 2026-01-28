import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { products as fallbackProducts } from './data/products';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const isSanityConfigured = projectId && projectId !== 'placeholder';

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (!builder) {
    // Return a mock builder that mimics the ImageUrlBuilder interface
    return {
      url: () => (typeof source === 'string' ? source : ''),
      width: function() { return this; },
      height: function() { return this; },
    } as any;
  }
  return builder.image(source);
}

// Fallback data
const fallbackTestimonials = [
  { _id: '1', name: 'Divya Krishnan', text: 'Ordered a custom birthday cake for my son and it was absolutely stunning! The taste was even better than it looked. Thank you!', rating: 5, order: 1 },
  { _id: '2', name: 'Raj Patel', text: 'The chocolate truffle cake was a masterpiece! Not only beautiful but incredibly delicious. Will definitely order again!', rating: 5, order: 2 },
  { _id: '3', name: 'Priya Sharma', text: 'Loved the custom theme cake for my daughter\'s birthday. The quality and attention to detail were exceptional!', rating: 5, order: 3 },
  { _id: '4', name: 'Arun Kumar', text: 'Perfect anniversary cake! Fresh, delicious, and beautifully decorated. Highly recommend The Cake Craving!', rating: 5, order: 4 },
];

// Query helpers with fallback
export async function getProducts() {
  if (!client) return fallbackProducts;
  try {
    const products = await client.fetch(`*[_type == "product"] | order(order asc)`);
    return products.length > 0 ? products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getTestimonials() {
  if (!client) return fallbackTestimonials;
  try {
    const testimonials = await client.fetch(`*[_type == "testimonial"] | order(order asc)`);
    return testimonials.length > 0 ? testimonials : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getHero() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "hero"][0]`);
  } catch {
    return null;
  }
}

export async function getSiteSettings() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "siteSettings"][0]`);
  } catch {
    return null;
  }
}

export async function getWhyChooseUs() {
  if (!client) return [];
  try {
    return await client.fetch(`*[_type == "whyChooseUs"] | order(order asc)`);
  } catch {
    return [];
  }
}

export async function getCategories() {
  if (!client) return [];
  try {
    return await client.fetch(`*[_type == "category"] | order(order asc)`);
  } catch {
    return [];
  }
}
