// pages/api/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../services/routers/_app';
import { createContext } from '../../services/utils/trpc/trpcContext';

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    console.error('TRPC Error:', error);
  },
});
