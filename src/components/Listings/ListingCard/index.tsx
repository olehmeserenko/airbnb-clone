'use client'

import { FC, MouseEvent, useCallback, useMemo } from 'react'

import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import HeartButton from '@/components/HeartButton'
import { useCountries } from '@/hooks/useCountries'
import { SafeListing, SafeReservation, SafeUser } from '@/types'

interface ListingCardProps {
  data: SafeListing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

export const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) return

      onAction?.(actionId)
    },
    [onAction, actionId, disabled],
  )

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className={'group col-span-1 cursor-pointer'}
    >
      <div className={'flex w-full flex-col gap-2'}>
        <div
          className={'relative aspect-square w-full overflow-hidden rounded-xl'}
        >
          <Image
            fill
            alt={'Listing'}
            src={data.imageSrc}
            className={
              'h-full w-full object-cover transition group-hover:scale-110'
            }
          />
          <div className={'absolute right-3 top-3'}>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className={'text-lg font-semibold'}>
          {location?.region}
          {', '}
          {location?.label}
        </div>
        <div className={'font-light text-neutral-500'}>
          {reservationDate || data.category}
        </div>
        <div className={'flex flex-row items-center gap-1'}>
          <div className={'font-semibold'}>
            {'$ '}
            {price}
          </div>
          {!reservation && <div className={'font-light'}>{'night'}</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
