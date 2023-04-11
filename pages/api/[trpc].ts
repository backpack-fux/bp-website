// pages/api/[trpc].ts

import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../server/routers/_app';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => null,
  onError({ error }) {
    console.error('TRPC Error:', error);
  },
});
