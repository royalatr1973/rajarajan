'use client';

import { useState, useEffect } from 'react';
import { Filter, Cake, Cookie, Candy, CakeSlice } from 'lucide-react';
import ProductCard from './ProductCard';
import { ProductVertical, allVerticals, verticalCategories } from '@/types/product';
import { useProducts } from '@/lib/ProductsContext';

interface ProductsListProps {
  products?: any[];
  initialVertical?: ProductVertical;
}

const verticalIcons: Record<ProductVertical, typeof Cake> = {
  Cakes: Cake,
  Biscuits: Cookie,
  Chocolates: Candy,
  Brownies: CakeSlice,
};

const verticalDescriptions: Record<ProductVertical, string> = {
  Cakes: 'Handcrafted cakes for every celebration',
  Biscuits: 'Freshly baked biscuits and cookies',
  Chocolates: 'Premium handmade chocolates',
  Brownies: 'Rich and decadent brownies',
};

export default function ProductsList({ initialVertical }: ProductsListProps) {
  const { products: contextProducts } = useProducts();
  const [selectedVertical, setSelectedVertical] = useState<ProductVertical>(initialVertical || 'Cakes');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const products = isClient ? contextProducts : [];

  // Filter by vertical first
  const verticalProducts = products.filter(p => p.vertical === selectedVertical);

  // Then filter by sub-category
  const filteredProducts = selectedType === 'All'
    ? verticalProducts
    : verticalProducts.filter(p => p.type === selectedType);

  // Get categories for current vertical
  const categories = verticalCategories[selectedVertical] || [];

  // Reset sub-category filter when vertical changes
  const handleVerticalChange = (vertical: ProductVertical) => {
    setSelectedVertical(vertical);
    setSelectedType('All');
  };

  return (
    <div className="min-h-screen bg-cream-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Our Products
          </h1>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto mb-6">
            Explore our full range of homemade treats - cakes, biscuits, chocolates & brownies
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <span>Contact us to place your order</span>
          </a>
        </div>

        {/* Vertical Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {allVerticals.map((vertical) => {
              const Icon = verticalIcons[vertical];
              const count = products.filter(p => p.vertical === vertical).length;
              return (
                <button
                  key={vertical}
                  onClick={() => handleVerticalChange(vertical)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    selectedVertical === vertical
                      ? 'bg-cocoa-dark text-gold shadow-lg scale-105'
                      : 'bg-white text-cocoa-dark hover:bg-cream border-2 border-gold/30 hover:border-gold'
                  }`}
                >
                  <Icon size={22} />
                  <span>{vertical}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedVertical === vertical
                      ? 'bg-gold/30 text-gold-light'
                      : 'bg-cream text-cocoa-medium'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Description */}
        <div className="text-center mb-8">
          <p className="text-cocoa-medium text-lg">
            {verticalDescriptions[selectedVertical]}
          </p>
        </div>

        {/* Sub-category Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Filter size={20} className="text-cocoa-dark" />
              <span className="text-sm font-semibold text-cocoa-dark">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedType('All')}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                  selectedType === 'All'
                    ? 'bg-cocoa-dark text-gold shadow-lg scale-105'
                    : 'bg-white text-cocoa-dark hover:bg-cream border border-gold/30 hover:border-gold'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedType(cat)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                    selectedType === cat
                      ? 'bg-cocoa-dark text-gold shadow-lg scale-105'
                      : 'bg-white text-cocoa-dark hover:bg-cream border border-gold/30 hover:border-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6 text-center">
          <p className="text-cocoa-medium">
            Showing <span className="font-bold text-cocoa-dark">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-cocoa-medium">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
