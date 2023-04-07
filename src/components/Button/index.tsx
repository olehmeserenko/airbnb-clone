'use client'

import { FC, MouseEvent } from 'react'

import { IconType } from 'react-icons'

interface ButtonProps {
  disabled?: boolean
  icon?: IconType
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  outline?: boolean
  small?: boolean
}

export const Button: FC<ButtonProps> = ({
  disabled,
  icon: Icon,
  label,
  onClick,
  outline,
  small,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`
        relative
        w-full
        rounded-lg
        transition
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
  >
    {Icon && <Icon size={24} className={'absolute left-4 top-3'} />}
    {label}
  </button>
)
