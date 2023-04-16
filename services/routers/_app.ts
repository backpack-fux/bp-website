// services/routers/_app.ts
import { router } from '../utils/trpc/trpc';
import { chatMessageRouter } from './chatMessageRouter';
import { conversationRouter } from './conversationRouter';

export const appRouter = router({
  chatbot: chatMessageRouter,
  conversation: conversationRouter,
});

export type AppRouter = typeof appRouter;


