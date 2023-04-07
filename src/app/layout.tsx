import { ReactNode } from 'react'

import { Nunito } from 'next/font/google'

import { RegisterModal } from '@components/Modals/RegisterModal'
import { Navbar } from '@components/Navbar'

import { ToasterProvider } from '@/providers/ToasterProvider'
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
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
