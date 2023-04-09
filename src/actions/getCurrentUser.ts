import prisma from '@/libs/prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export const getSession = async () => await getServerSession(authOptions)

export const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch {
    return null
  }
}
