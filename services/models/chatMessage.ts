//service/models/chatMessage.ts
import { z } from 'zod';

  // Define the ChatMessage schema
export const ChatMessage = z.object({
  id: z.string(),
  conversationId: z.string(),
  conversation: z.array(z.any()),
  speaker: z.string(), // bot or user
  entry: z.string(),
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
});

export type ChatMessageType = z.infer<typeof ChatMessage>;