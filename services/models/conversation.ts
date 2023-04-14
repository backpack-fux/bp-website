import { ChatMessage } from './chatMessage';
import { User } from './user';
import { z } from 'zod';

// Define the Conversation schema
export const Conversation = z.object({
  id: z.string(),
  userId: z.string(),
  user: User,
  messages: z.array(ChatMessage),
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
});

export type ConversationType = z.infer<typeof Conversation>;