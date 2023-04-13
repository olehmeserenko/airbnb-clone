'use client'

import { FC } from 'react'

import Image from 'next/image'

import { Heading } from '@/components/Heading'
import HeartButton from '@/components/HeartButton'
import { useCountries } from '@/hooks/useCountries'
import { SafeUser } from '@/types'

interface ListingHeadProps {
  currentUser?: SafeUser | null
  id: string
  imageSrc: string
  locationValue: string
  title: string
}

export const ListingHead: FC<ListingHeadProps> = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className={'relative h-[60vh] w-full overflow-hidden rounded-xl'}>
        <Image
          src={imageSrc}
          fill
          className={'w-full object-cover'}
          alt={'Image'}
        />
        <div className={'absolute right-5 top-5'}>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
