import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

if (typeof window === 'undefined') {
  prisma = (global as any).prisma || new PrismaClient();

  if (process.env.NODE_ENV !== 'production') {
    (global as any).prisma = prisma;
  }
}

export { prisma };
