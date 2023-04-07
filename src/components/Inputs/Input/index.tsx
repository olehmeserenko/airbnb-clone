'use client'

import { FC } from 'react'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { BiDollar } from 'react-icons/bi'

interface InputProps {
  disabled?: boolean
  errors: FieldErrors
  formatPrice?: boolean
  id: string
  label: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  type?: string
}

export const Input: FC<InputProps> = ({
  disabled,
  errors,
  formatPrice,
  id,
  label,
  register,
  required,
  type = 'text',
}) => (
  <div className={'relative w-full'}>
    {formatPrice && (
      <BiDollar
        size={24}
        className={'absolute left-2 top-5 text-neutral-700'}
      />
    )}
    <input
      disabled={disabled}
      id={id}
      placeholder={' '}
      type={type}
      {...register(id, { required })}
      className={`
          peer
          w-full
          rounded-md
          border-2 
          bg-white 
          p-4 
          pt-6
          font-light
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
    />
    <label
      className={`
          text-md 
          absolute
          top-5 
          z-10 
          origin-[0] 
          -translate-y-3 
          transform 
          duration-150 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
    >
      {label}
    </label>
  </div>
)
