import { getCurrentUser } from '@/actions/getCurrentUser'
import { getListingById } from '@/actions/getListingById'
import { ClientOnly } from '@/components/ClientOnly'
import { EmptyState } from '@/components/EmptyState'

import { getReservations } from '@/actions/getReservations'
import { ListingClient } from './ListingClient'

interface Params {
  listingId?: string
}

const ListingPage = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )

  return (
    <ClientOnly>
      <ListingClient
        currentUser={currentUser}
        listing={listing}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default ListingPage
