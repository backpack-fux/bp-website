import { router, publicProcedure } from "../server";
import { z } from "zod";
import { userService } from '../../services/userService';

// User Router
export const userRouter = createRouter()
  .query('getUser', {
    input: Number,
    async resolve({ input }) {
      return await userService.getUser(input);
    },
  })
  .mutation('createUser', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
    }),
    async resolve({ input }) {
      return await userService.createUser(input);
    },
  })
  .mutation('updateUser', {
    input: z.object({
      id: z.number(),
      data: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        role: z.string().optional(),
      }),
    }),
    async resolve({ input }) {
      return await userService.updateUser(input.id, input.data);
    },
  })
  .mutation('deleteUser', {
    input: Number,
    async resolve({ input }) {
      return await userService.deleteUser(input);
    },
  });