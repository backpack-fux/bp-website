import { router, publicProcedure } from "../server";
import { z } from "zod";
import * as documentService from '../../services/documentService';

export const documentRouter = router({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
    return await documentService.getDocumentById(input);
  }),
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string(), tags: z.string().optional() }))
    .mutation(async ({ input }) => {
    return await documentService.createDocument(input);
  }),
  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.object({ title: z.string().optional(), content: z.string().optional(), tags: z.string().optional() }) }))
    .mutation(async ({ input }) => {
    return await documentService.updateDocument(input.id, input.data);
  }),
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
    return await documentService.deleteDocument(input);
  }),
  search: publicProcedure
    .input(z.string()).query(async ({ input }) => {
    return await documentService.searchDocuments(input);
  }),
});
