'use client'

import { Avatar } from '@components/Avatar'

import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import { useClickOutside } from '@hooks/useClickOutside'
import { useRegisterModal } from '@hooks/useRegisterModal'
import { MenuItem } from '../MenuItem'

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const registerModal = useRegisterModal()

  const ref = useClickOutside(() => setIsOpen(false))

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <div ref={ref} className={'relative'}>
      <div className={'flex flex-row items-center gap-3'}>
        <div
          onClick={() => {}}
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
            <Avatar />
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
            <>
              <MenuItem onClick={() => {}} label={'Login'} />
              <MenuItem onClick={registerModal.onOpen} label={'Sign Up'} />
            </>
          </div>
        </div>
      )}
    </div>
  )
}
