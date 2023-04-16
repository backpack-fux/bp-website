// context.ts
import { prisma } from '../../../prisma/prisma';

export type Context = {
  prisma: typeof prisma;
};

export function createContext(): Context {
  return { prisma };
}