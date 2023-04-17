//service/routers/conversationRouter.ts
import { z } from 'zod';
import { publicProcedure, router } from '../utils/trpc/trpc';

const createConversationInput = z.object({
  userId: z.string().describe('The ID of the user'),
});

export const conversationRouter = router({
  createConversation: publicProcedure
    .meta({ description: 'Create a new conversation' })
    .input(createConversationInput)
    .query(async ({ input, ctx }) => {
      const newConversation = await ctx.prisma.conversation.create({
        data: {
          userId: input.userId,
        },
      });
      return newConversation;
    }),
  getConversationsByUser: publicProcedure
    .meta({ description: 'Get conversations by user ID' })
    .input(z.string().describe('The user ID to fetch conversations for'))
    .query(async ({ input, ctx }) => {
      const userId = input;
      const conversations = await ctx.prisma.conversation.findMany({
        where: { userId },
      });
      return conversations;
    }),
});

export type ConversationRouter = typeof conversationRouter;
