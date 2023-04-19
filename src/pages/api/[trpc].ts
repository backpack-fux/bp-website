// pages/api/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../services/routers/_app';
import { createContext } from '../../services/utils/trpc/trpcContext';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => createContext({ req: null, res: null }),
  onError({ error }) {
    console.log("error", error);
  },
});
