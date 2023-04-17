// services/utils/trpc/context.ts
import { prisma } from '../../../prisma/prisma';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContextInner() {
  return {
    prisma,
  };
}

export async function createContext(opts: CreateNextContextOptions) {
  const contextInner = await createContextInner();
  return {
    ...contextInner,
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
