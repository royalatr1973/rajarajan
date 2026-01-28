'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { ProductsProvider } from '@/lib/ProductsContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ProductsProvider>
  );
}
