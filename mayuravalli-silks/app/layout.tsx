import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mayuravalli Silks - Pure Kanchipuram Silk Sarees',
  description: 'Discover the finest handwoven Kanchipuram silk sarees, soft silk sarees, silk cotton sarees, wedding collections, and Korvai sarees. Over 20 years of tradition, worldwide shipping.',
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
