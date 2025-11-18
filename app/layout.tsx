import type { Metadata } from 'next'
import './globals.css'
import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Socialux ✕ Brandivity',
  description:
    'Landing page for Socialux ✕ Brandivity – branding & digital experience.',
}

// Arabe
const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-arabic',
})

// Latin (au cas où tu gardes un peu d’anglais)
const latinFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-latin',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabicFont.variable} ${latinFont.variable}`}
    >
      <body className="bg-slate-950 text-slate-50 antialiased font-sans font-light">
        {children}
      </body>
    </html>
  )
}
