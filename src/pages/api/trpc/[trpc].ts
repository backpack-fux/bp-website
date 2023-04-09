// src/pages/api/trpc/[trpc].ts
import { apiHandler } from '@trpc/next';
import { AppRouter } from '../../../server/routers/_app';
import { createContext } from '@bpwebsite/server/context';

export default apiHandler<AppRouter>()
  .query('user.*', {
    async resolve({ ctx, req, input, path }) {
      const userRouter = ctx.router.user;
      return userRouter.query({ ctx, req, input, path });
    },
  })
  .mutation('user.*', {
    async resolve({ ctx, req, input, path }) {
      const userRouter = ctx.router.user;
      return userRouter.mutation({ ctx, req, input, path });
    },
  })
  .query('interaction.*', {
    async resolve({ ctx, req, input, path }) {
      const interactionRouter = ctx.router.interaction;
      return interactionRouter.query({ ctx, req, input, path });
    },
  })
  .mutation('interaction.*', {
    async resolve({ ctx, req, input, path }) {
      const interactionRouter = ctx.router.interaction;
      return interactionRouter.mutation({ ctx, req, input, path });
    },
  })
  .middleware(async (ctx, next) => {
    ctx.prisma = prisma;
    return next();
  })
  .onError(({ error }) => {
    console.error('An error occurred in tRPC:', error);
  });
