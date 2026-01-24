'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { products } from '@/lib/data/products';
import ProductCard from '@/components/products/ProductCard';
import { ChocolateType } from '@/types/product';

export default function ProductsPage() {
  const [selectedType, setSelectedType] = useState<ChocolateType | 'All'>('All');

  const filteredProducts =
    selectedType === 'All'
      ? products
      : products.filter((product) => product.type === selectedType);

  const types: (ChocolateType | 'All')[] = ['All', 'Dark', 'Milk', 'Vegan'];

  return (
    <div className="min-h-screen bg-cream-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Our Chocolate Collection
          </h1>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            Explore our full range of handcrafted chocolates, from rich dark chocolates to creamy milk varieties
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <Filter size={20} className="text-cocoa-dark" />
              <span className="text-sm font-semibold text-cocoa-dark">Filter by type:</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-cocoa-dark text-gold shadow-lg scale-105'
                      : 'bg-white text-cocoa-dark hover:bg-cream border border-gold/30 hover:border-gold'
                  }`}
                >
                  {type}
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
