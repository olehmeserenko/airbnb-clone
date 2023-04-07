'use client'

import { FC } from 'react'

interface HeadingProps {
  center?: boolean
  subtitle?: string
  title: string
}

export const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => (
  <div className={center ? 'text-center' : 'text-start'}>
    <div className={'text-2xl font-bold'}>{title}</div>
    <div className={'mt-2 font-light text-neutral-500'}>{subtitle}</div>
  </div>
)
