import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Solo crear PrismaClient si DATABASE_URL está configurado.
// Reutilizar instancia también en producción (Railway con `next start`).
export const prisma = globalForPrisma.prisma ?? (
  process.env.DATABASE_URL
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    : (null as any)
)

if (process.env.DATABASE_URL && prisma) {
  globalForPrisma.prisma = prisma
}

