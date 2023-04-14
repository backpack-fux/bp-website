//services/models/user.ts
import { z } from 'zod';

// Define the User schema
export const User = z.object({
  id: z.string(),
  fingerprint: z.string(),
  conversations: z.array(z.any()),
  createdAt: z.instanceof(Date),
  updatedAt: z.instanceof(Date),
});




