'use client'

import { Container } from '@components/Container'

import { SafeUser } from '@/types'
import { FC } from 'react'
import { Logo } from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const Navbar: FC<NavbarProps> = ({ currentUser }) => (
  <div className={'fixed z-10 w-full bg-white shadow-sm'}>
    <div className={'border-b-[1px] py-4'}>
      <Container>
        <div
          className={
            'flex flex-row items-center justify-between gap-3 md:gap-0'
          }
        >
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  </div>
)
