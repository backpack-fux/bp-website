// src/trpc/client.ts

import { createTRPCProxyClient } from '@trpc/client';
import { AppRouter } from './routers/router';

export const trpcClient = createTRPCProxyClient({
    // This seems like it relates to a route of some sort -> ? url: 'http://localhost:3000/trpc', 
});
