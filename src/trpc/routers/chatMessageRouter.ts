import { router, publicProcedure } from "../server";
import { z } from "zod";
import { prisma } from '../../../prisma/prisma';
import * as chatMessageService from '../../services/chatMessageService';


// ChatMessage Router
export const chatMessageRouter = router({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
    return await chatMessageService.getChatMessage(input);
  }),
  create: publicProcedure
    .input(z.object({ sessionId: z.number(), userId: z.number(), content: z.string(), responseType: z.string() }))
    .mutation(async ({ input }) => {
    return await chatMessageService.createChatMessage(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.object({ sessionId: z.number().optional(), userId: z.number().optional(), content: z.string().optional(), responseType: z.string().optional() }) }))
    .mutation(async ({ input }) => {
    return await chatMessageService.updateChatMessage(input.id, input.data);
  }),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
    return await chatMessageService.deleteChatMessage(input);
  }),
});