import { z } from 'zod';
import { prisma } from '../prisma';
import { router, procedure } from '../trpc';

export const userRouter = router({
  getUser: procedure
    .input(z.object({ fingerprint: z.string() }))
    .query(async (req) => {
      return await prisma.user.findUnique({ where: { fingerprint: req.input.fingerprint } });
    }),
  createUser: procedure
    .input(z.object({ fingerprint: z.string() }))
    .mutation(async (req) => {
      return await prisma.user.create({ data: { fingerprint: req.input.fingerprint } });
    }),
});

//export type UserRouter = typeof userRouter;
