// server/routers/chatbot.ts
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

// Define the callChatbotBackend function
async function callChatbotBackend(message: string): Promise<string> {
    // Add your logic to call the chatbot backend here and return the response
    // For now, let's just return a simple echo response
    return `You said: ${message}`;
  }

export const chatbotRouter = router({
  sendMessage: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const response = await callChatbotBackend(input);
      return response;
    }),
});

export type ChatbotRouter = typeof chatbotRouter;
