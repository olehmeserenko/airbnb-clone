import { ReactNode } from 'react'

import { Nunito } from 'next/font/google'

import { LoginModal } from '@components/Modals/LoginModal'
import { RegisterModal } from '@components/Modals/RegisterModal'
import { Navbar } from '@components/Navbar'

import { getCurrentUser } from '@/actions/getCurrentUser'
import { ToasterProvider } from '@/providers/ToasterProvider'

import '../styles/globals.css'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang={'en'}>
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
