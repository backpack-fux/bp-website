//services/utils/trpc/trpc.ts
import { initTRPC } from '@trpc/server';
import { createContext } from './trpcContext';
import superjson from 'superjson';

const t = initTRPC.context<typeof createContext>().create({ transformer: superjson });

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
