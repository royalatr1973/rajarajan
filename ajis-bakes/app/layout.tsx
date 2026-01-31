import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Ajis Bakes - Great Taste in Every Bite | Custom Cakes Chennai | Order Online",
  description: "Custom cakes crafted for every occasion by Ajis Bakes, Chennai. Great taste in every bite. Order for birthdays, weddings, and all celebrations. Custom theme cakes available.",
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
