import { User } from './user';
import { ChatMessage } from './chatMessage';
import { z } from 'zod';

// Define the Conversation schema
export const Conversation = z.object({
  id: z.string(),
  userId: z.string(),
  user: User,
  messages: z.array(z.any()),
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
});