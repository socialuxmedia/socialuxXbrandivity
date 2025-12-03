import type { Metadata } from 'next'
import './globals.css'
import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google'
import Script from 'next/script' // ⬅️ important

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
      {/* ---------- GTM HEAD SCRIPT ---------- */}
      <head>
        <Script
          id="gtm-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5JF37466');
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-50 antialiased font-sans font-light">
        {/* ---------- GTM NOSCRIPT (BODY) ---------- */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5JF37466"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
