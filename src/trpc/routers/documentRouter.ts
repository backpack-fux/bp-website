import { router, publicProcedure } from "../server";
import { z } from "zod";
import * as documentService from '../../services/documentService';
import logger from "../../utils/logger";

export const documentRouter = router({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      logger.info(`Fetching document with id: ${input}`);
      const result = await documentService.getDocumentById(input);
      logger.info(`Document fetched: ${JSON.stringify(result)}`);
      return result;
    }),
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string(), tags: z.array(z.string()).default([]) }))
    .mutation(async ({ input }) => {
      logger.info(`Creating document with data: ${JSON.stringify(input)}`);
      const result = await documentService.createDocument(input);
      logger.info(`Document created: ${JSON.stringify(result)}`);
      return result;
    }),
  update: publicProcedure
    .input(z.object({ id: z.number(), data: z.object({ title: z.string().optional(), content: z.string().optional(), tags: z.array(z.string()).optional() }) }))
    .mutation(async ({ input }) => {
      logger.info(`Updating document with id: ${input.id} and data: ${JSON.stringify(input.data)}`);
      const result = await documentService.updateDocument(input.id, input.data);
      logger.info(`Document updated: ${JSON.stringify(result)}`);
      return result;
    }),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      logger.info(`Deleting document with id: ${input}`);
      const result = await documentService.deleteDocument(input);
      logger.info(`Document deleted: ${JSON.stringify(result)}`);
      return result;
    }),
  search: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      logger.info(`Searching documents with query: ${input}`);
      const result = await documentService.searchDocuments(input);
      logger.info(`Search results: ${JSON.stringify(result)}`);
      return result;
    }),
});