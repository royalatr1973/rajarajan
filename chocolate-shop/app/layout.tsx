import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Artisan Chocolates - Hand-Poured Small-Batch Chocolates",
  description: "Premium handmade chocolates crafted with love and the finest ingredients. Discover our collection of dark, milk, and vegan chocolates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
