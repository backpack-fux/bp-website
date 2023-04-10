import { router, publicProcedure } from "../server";
import { z } from "zod";
import * as chatSessionService from '../../services/chatSessionService';

export const chatSessionRouter = router({
  get: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
    return await chatSessionService.getChatSession(input);
  }),
  create: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
    return await chatSessionService.createChatSession(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.string(), data: z.object({ userId: z.string().optional() }) }))
    .mutation(async ({ input }) => {
    return await chatSessionService.updateChatSession(input.id, input.data);
  }),
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
    return await chatSessionService.deleteChatSession(input);
  }),
});