'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
  icon: IconType
  label: string
  onClick: (value: string) => void
  selected?: boolean
}

export const CategoryInput: FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => (
  <div
    onClick={() => onClick(label)}
    className={`
      flex 
      cursor-pointer 
      flex-col 
      gap-3 
      rounded-xl 
      border-2
      p-4 
      transition 
      hover:border-black 
      ${selected ? 'border-black' : 'border-neutral-200'}`}
  >
    <Icon size={30} />
    <div className={'font-semibold'}>{label}</div>
  </div>
)