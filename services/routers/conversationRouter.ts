import { z } from 'zod';
import { publicProcedure, router } from '../utils/trpc/trpc';
import { prisma } from '../../prisma/prisma';

const createConversationInput = z.object({
  userId: z.string().describe('The ID of the user'),
});

export const conversationRouter = router({
  createConversation: publicProcedure
    .meta({ description: 'Create a new conversation' })
    .input(createConversationInput)
    .query(async ({ input }) => {
      const newConversation = await prisma.conversation.create({
        data: {
          userId: input.userId,
        },
      });
      return newConversation;
    }),
  getConversationsByUser: publicProcedure
    .meta({ description: 'Get conversations by user ID' })
    .input(z.string().describe('The user ID to fetch conversations for'))
    .query(async ({ input }) => {
      const userId = input;
      const conversations = await prisma.conversation.findMany({
        where: { userId },
      });
      return conversations;
    }),
});

export type ConversationRouter = typeof conversationRouter;
