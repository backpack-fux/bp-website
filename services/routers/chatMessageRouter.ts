// services/routers/chatMessageRouter.ts
import { z } from 'zod';
import { publicProcedure, router } from '../utils/trpc/trpc';
import chatBot from '../libs/langchain/langchain';
import { HumanChatMessage } from 'langchain/schema';
import { buildInquiry } from '../libs/inquiryBuilder/inquiryBuilder';

// Define the callChatbotBackend function
async function callChatMessageBackend(message: string): Promise<string> {
  const humanMessage = new HumanChatMessage(message);
  const response = await chatBot.call([humanMessage]);
  return response.text;
}

const addChatMessageInput = z.object({
  conversationId: z.string().describe('The ID of the conversation'),
  speaker: z.string().describe('The speaker of the chat message'),
  entry: z.string().describe('The content of the chat message'),
});

export const chatMessageRouter = router({
  sendMessage: publicProcedure
    .meta({ description: 'Send a message to the chatbot and get a response' })
    .input(z.object({
      message: z.string().describe('The message to send to the chatbot'),
      userId: z.string().describe('The user ID for fetching conversation history'),
    }))
    .mutation(async ({ input, ctx }) => {
      // Fetch conversation history
      const conversation = await ctx.prisma.conversation.findUnique({
        where: { id: input.userId},
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });
      const conversationHistory = conversation?.messages.map((message) => message.entry) || [];

      // Build the inquiry using the user's input and conversation history
      const inquiry = await buildInquiry(input.message, conversationHistory);

      // Call the chatbot with the inquiry
      const response = await callChatMessageBackend(inquiry);
      return response;
    }),
  addChatMessage: publicProcedure
    .meta({ description: 'Add a chat message to the database' })
    .input(addChatMessageInput)
    .mutation(async ({ input, ctx }) => {
      console.log('Input:', input)

      const newMessage = await ctx.prisma.chatMessage.create({
        data: {
          conversationId: input.conversationId,
          speaker: input.speaker,
          entry: input.entry,
        },
      });
      return newMessage;
    }),
  getChatMessagesByConversation: publicProcedure
    .meta({ description: 'Get chat messages by conversation ID' })
    .input(z.string().describe('The conversation ID to fetch messages for'))
    .query(async ({ input, ctx }) => {
      const conversationId = input;
      const messages = await ctx.prisma.chatMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
      });
      return messages;
    }),
  deleteChatMessage: publicProcedure
    .meta({ description: 'Delete a chat message by its ID' })
    .input(z.string().describe('The ID of the chat message to delete'))
    .mutation(async ({ input, ctx }) => {
      const messageId = input;
      const deletedMessage = await ctx.prisma.chatMessage.delete({
        where: { id: messageId },
      });
      return deletedMessage;
    }),
});

export type ChatMessageRouter = typeof chatMessageRouter;
