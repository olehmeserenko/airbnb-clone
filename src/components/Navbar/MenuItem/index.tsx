'use client'

import { FC } from 'react'

interface MenuItemProps {
  onClick: () => void
  label: string
}

export const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => (
  <div
    onClick={onClick}
    className={'px-4 py-3 font-semibold transition hover:bg-neutral-100'}
  >
    {label}
  </div>
)
