'use client'

import { Avatar } from '@components/Avatar'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import { useClickOutside } from '@hooks/useClickOutside'
import { useLoginModal } from '@hooks/useLoginModal'
import { useRegisterModal } from '@hooks/useRegisterModal'
import { useRentModal } from '@hooks/useRentModal'

import { SafeUser } from '@/types'

import { MenuItem } from '../MenuItem'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

export const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const ref = useClickOutside(() => setIsOpen(false))

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div ref={ref} className={'relative'}>
      <div className={'flex flex-row items-center gap-3'}>
        <div
          onClick={onRent}
          className={
            'hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          }
        >
          {'Airbnb your home'}
        </div>
        <div
          onClick={toggleOpen}
          className={
            'hover:shadom-md flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 px-4 py-4 transition md:px-2 md:py-1'
          }
        >
          <AiOutlineMenu />
          <div className={'hidden md:block'}>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={
            'absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4'
          }
        >
          <div className={'flex cursor-pointer flex-col '}>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label={'My Trips'}
                />
                <MenuItem onClick={() => {}} label={'My favorites'} />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label={'My reservations'}
                />
                <MenuItem onClick={() => {}} label={'My properties'} />
                <MenuItem onClick={rentModal.onOpen} label={'Airbnb my home'} />
                <hr />
                <MenuItem onClick={() => signOut()} label={'Logout'} />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label={'Login'} />
                <MenuItem onClick={registerModal.onOpen} label={'Sign Up'} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
