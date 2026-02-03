import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cake Cravings - Homemade Cakes & Treats',
  description: 'Delight in freshly baked homemade cakes, brownies, cupcakes, biscuits, and chocolates. Each treat is crafted with love using premium ingredients.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
