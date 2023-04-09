// src/trpc/server.ts
import { initTRPC } from '@trpc/server';
import superjson from 'superjson'; 
// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create({
    transformer: superjson,
});
 
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;