'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { ProductsProvider, useProducts } from '@/lib/ProductsContext';
import { Cake } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-cream-light flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="animate-bounce mb-6">
          <Cake size={64} className="text-gold mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-cocoa-dark mb-2">The Cake Craving</h2>
        <p className="text-cocoa-medium mb-6">Loading fresh cakes for you...</p>
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gold animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-gold animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-gold animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useProducts();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <LayoutContent>{children}</LayoutContent>
    </ProductsProvider>
  );
}
