import { ReactNode } from 'react'

import { Nunito } from 'next/font/google'

import { Navbar } from '@components/Navbar'

import '../styles/globals.css'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
