// server/routers/_app.ts

// server/_app.ts
// server/routers/_app.ts
import { router } from '../trpc';
import { chatbotRouter } from './chatbot';

export const appRouter = router({
  chatbot: chatbotRouter, // place chatbotRouter under "chatbot" namespace
});

export type AppRouter = typeof appRouter;

