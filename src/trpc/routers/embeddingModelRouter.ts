import { router, publicProcedure } from "../server";
import { z } from "zod";
import { embeddingModelService } from '../services/embeddingModelService';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// EmbeddingModel Router
export const embeddingModelRouter = router({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
    return await embeddingModelService.getEmbeddingModel(input);
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ input }) => {
    return await embeddingModelService.createEmbeddingModel(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.object({ name: z.string().optional(), description: z.string().optional() }) }))
    .mutation(async ({ input }) => {
    return await embeddingModelService.updateEmbeddingModel(input.id, input.data);
  }),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
    return await embeddingModelService.deleteEmbeddingModel(input);
  }),
});