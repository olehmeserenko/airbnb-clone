import { ReactNode } from 'react'

import { Nunito } from 'next/font/google'

import { getCurrentUser } from '@/actions/getCurrentUser'
import { SearchModal } from '@/components/Modals/SearchModal'
import { ToasterProvider } from '@/providers/ToasterProvider'
import { ClientOnly } from '@components/ClientOnly'
import { LoginModal } from '@components/Modals/LoginModal'
import { RegisterModal } from '@components/Modals/RegisterModal'
import { RentModal } from '@components/Modals/RentModal'
import { Navbar } from '@components/Navbar'

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
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className={'pb-20 pt-28'}>{children}</div>
      </body>
    </html>
  )
}
