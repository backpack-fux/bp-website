import { router, publicProcedure } from "../server";
import { z } from "zod";
import { chatSessionService } from '../services/chatSessionService';

// ChatSession Router
const chatSessionRouter = router({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
    return await chatSessionService.getChatSession(input);
  }),
  create: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
    return await chatSessionService.createChatSession(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.object({ userId: z.number().optional() }) }))
    .mutation(async ({ input }) => {
    return await chatSessionService.updateChatSession(input.id, input.data);
  }),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
    return await chatSessionService.deleteChatSession(input);
  }),
});