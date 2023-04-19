//services/utils/trpc/trpc.ts
import { initTRPC } from '@trpc/server';
import { Context } from './trpcContext';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({ transformer: superjson });
console.log("initTRPC", t);

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
