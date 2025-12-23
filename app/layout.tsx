import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${grotesk.variable}`}>
        {children}
      </body>
    </html>
  )
}
