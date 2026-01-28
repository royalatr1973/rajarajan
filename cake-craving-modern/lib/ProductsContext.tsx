'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from './data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = 'cake-craving-products';

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProducts(parsed);
      } catch {
        setProducts(initialProducts);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoaded]);

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

  const resetProducts = () => {
    setProducts(initialProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetProducts }}>
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
