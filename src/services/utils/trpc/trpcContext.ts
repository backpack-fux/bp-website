// services/utils/trpc/trpcContext.ts
import { prisma } from '../../../../prisma/prisma';
import type { inferAsyncReturnType } from '@trpc/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export async function createContextInner() {
  return {
    prisma,
  };
}

export async function createContext(opts: { req: NextApiRequest | null, res: NextApiResponse | null }): Promise<Context> {
  try {
    console.log("opts.req", opts.req);
    const sessionPromise = opts.req ? getSession({ req: opts.req }) : null;
    console.log("sessionPromise", sessionPromise);
    console.log("opts.req", opts.req);
    const contextInner = await createContextInner();

    return {
      ...contextInner,
      session: sessionPromise,
    };
  } catch (error) {
    // Handle the error appropriately, e.g., return an empty context, or throw a custom error
    return {
      prisma,
      session: null,
    };
  }
}

export type ContextInner = inferAsyncReturnType<typeof createContextInner>;
export type Context = ContextInner & { session: ReturnType<typeof getSession> | null };
