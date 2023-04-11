import { router, publicProcedure } from "../server";
import { z } from "zod";
import { userService } from '../../services/userService';
import { prisma } from '../../../prisma/prisma';

// User Router
export const userRouter = router({
  getUser: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await prisma.userService.getUser(input);
    }),
  createUser: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.userService.createUser(input);
    }),
  updateUser: publicProcedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        role: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      return await prisma.userService.updateUser(input.id, input.data);
    }),
  deleteUser: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      return await prisma.userService.deleteUser(input);
    }),
});
