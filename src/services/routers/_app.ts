// services/routers/_app.ts
import { z } from 'zod';
import { router, publicProcedure } from '../utils/trpc/trpc';
import { chatMessageRouter } from './chatMessageRouter';
import { conversationRouter } from './conversationRouter';

export const appRouter = router({
  chatbot: chatMessageRouter,
  conversation: conversationRouter,
  info: publicProcedure
    .meta({ description: 'Get information about the available routes' })
    .input(z.null())
    .query(async () => {
      return {
        chatbot: 'Available routes: sendMessage, addChatMessage, getChatMessagesByConversation, deleteChatMessage',
        conversation: 'Available routes: createConversation, getConversationsByUser',
      };
    }),
  root: publicProcedure
    .meta({ description: 'Root path' })
    .input(z.null())
    .query(async () => {
      return { status: 'success' };
    }),
});

export type AppRouter = typeof appRouter;
