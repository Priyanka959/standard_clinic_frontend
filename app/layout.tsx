import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700']
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Dr. Name | Best Dermatologist in Bengaluru',
  description: 'Expert skin care treatments in Bengaluru. Acne, Hair Loss, Laser Therapy, Anti-aging. Book your consultation today.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-body antialiased bg-white text-charcoal`}>
        {children}
      </body>
    </html>
  )
}
