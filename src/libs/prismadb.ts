import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const client = global.globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.globalThis.prisma = client

export default client
