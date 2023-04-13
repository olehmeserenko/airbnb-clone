'use client'

import { FC } from 'react'

import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'

import { Avatar } from '@/components/Avatar'
import { useCountries } from '@/hooks/useCountries'
import { SafeUser } from '@/types'
import { ListingCategory } from '../ListingCategory'

const Map = dynamic(
  () => import('@components/Map').then((component) => component.Map),
  {
    ssr: false,
  },
)

interface ListingInfoProps {
  bathroomCount: number
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
  description: string
  guestCount: number
  locationValue: string
  roomCount: number
  user: SafeUser
}

export const ListingInfo: FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className={'col-span-4 flex flex-col gap-8'}>
      <div className={'flex flex-col gap-2'}>
        <div
          className={'flex flex-row items-center gap-2 text-xl font-semibold'}
        >
          <div>
            {'Hosted by '}
            {user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div
          className={
            'flex flex-row items-center gap-4 font-light text-neutral-500'
          }
        >
          <div>
            {guestCount} {'guests'}
          </div>
          <div>
            {roomCount} {'rooms'}
          </div>
          <div>
            {bathroomCount} {'bathrooms'}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className={'text-lg font-light text-neutral-500'}>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}
