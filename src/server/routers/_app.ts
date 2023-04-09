//src/server/routers/_app.ts
import { userRouter } from './userRouter';
import { interactionRouter } from './interactionRouter';
import { router } from '../trpc';

const appRouter = router({
  user: userRouter,
  interaction: interactionRouter,
})

// Export type definition of API
export type AppRouter = typeof appRouter;
