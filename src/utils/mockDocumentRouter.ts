// src/__tests__/mockDocumentRouter.ts
import { EmbedDocument } from '../models/EmbedDocument';
import * as documentService from '../services/documentService';

export const mockDocumentRouter = {
  get: async (id: number): Promise<EmbedDocument | null> => {
    return await documentService.getDocumentById(id);
  },
  create: async (data: Omit<EmbedDocument, 'id'>): Promise<EmbedDocument> => {
    return await documentService.createDocument(data);
  },
  update: async (id: number, data: Partial<EmbedDocument>): Promise<EmbedDocument | null> => { // Fix the type of the 'data' parameter here
    return await documentService.updateDocument(id, data);
  },
  delete: async (id: number): Promise<EmbedDocument | null> => {
    return await documentService.deleteDocument(id);
  },
  search: async (searchTerm: string): Promise<EmbedDocument[]> => {
    return await documentService.searchDocuments(searchTerm);
  },
};
