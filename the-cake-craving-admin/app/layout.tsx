import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "The Cake Craving - Home Made Cakes | Customized Cakes Chennai | Order Online",
  description: "Certified home baker in Avadi, Chennai. Premium homemade cakes crafted with love. Order 2 days prior for birthdays, weddings, and all celebrations. Custom theme cakes available.",
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
