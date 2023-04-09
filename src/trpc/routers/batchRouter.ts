import { router, publicProcedure } from "../server";
import { z } from "zod";
import { batchService } from '../services/batchService';

// Batch Router
const batchRouter = router({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
    return await batchService.getBatch(input);
  }),
  create: publicProcedure
    .input(z.array(z.number()))
    .mutation(async ({ input }) => {
    return await batchService.createBatch(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.object({ messages: z.array(z.number()).optional(), status: z.string().optional() }) }))
    .mutation(async ({ input }) => {
    return await batchService.updateBatch(input.id, input.data);
  }),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
    return await batchService.deleteBatch(input);
  }),
});