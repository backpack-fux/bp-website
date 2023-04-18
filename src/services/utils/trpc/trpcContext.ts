// services/utils/trpc/context.ts
import { prisma } from '../../../../prisma/prisma';
import type { inferAsyncReturnType } from '@trpc/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export async function createContextInner() {
  return {
    prisma,
  };
}

export async function createContext(opts: { req: NextApiRequest | null, res: NextApiResponse | null }) {
  // Check if req is null before calling getSession
  const session = opts.req ? await getSession({ req: opts.req }) : null;
  const contextInner = await createContextInner();
  return {
    ...contextInner,
    session, // add session to the context
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
