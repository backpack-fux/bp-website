// src/services/documentService.ts
import { prisma } from '../../prisma/prisma';
import { EmbedDocument } from '../models/EmbedDocument';
import { logger } from '../utils/logger';

export const createDocument = async (data: Omit<EmbedDocument, 'id'>): Promise<EmbedDocument> => {
  logger.info(`Creating document with data: ${JSON.stringify(data)}`);
  const createdDocument = await prisma.embedDocument.create({ 
    data 
  });
  logger.info(`Created document: ${JSON.stringify(createdDocument)}`);
  return createdDocument as EmbedDocument;
};

export const getDocumentById = async (id: number): Promise<EmbedDocument | null> => {
  logger.info(`Getting document by id: ${id}`);
  const document: EmbedDocument | null = await prisma.embedDocument.findUnique({
    where: { id },
  });
  logger.info(`Retrieved document: ${JSON.stringify(document)}`);
  return document;
};

export const updateDocument = async (id: number, documentData: Partial<EmbedDocument>): Promise<EmbedDocument | null> => {
  logger.info(`Updating document with id: ${id} and data: ${JSON.stringify(documentData)}`);
  const updatedDocument = await prisma.embedDocument.update({
    where: { id },
    data: documentData,
  });
  logger.info(`Updated document: ${JSON.stringify(updatedDocument)}`);
  return updatedDocument;
};  

export const deleteDocument = async (id: number): Promise<EmbedDocument | null> => {
  logger.info(`Deleting document with id: ${id}`);
  const deletedDocument = await prisma.embedDocument.delete({
    where: { id },
  });
  logger.info(`Deleted document: ${JSON.stringify(deletedDocument)}`);
  return deletedDocument;
};

export const searchDocuments = async (searchTerm: string): Promise<EmbedDocument[]> => {
  logger.info(`Searching documents with searchTerm: ${searchTerm}`);
  const documents = await prisma.embedDocument.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { content: { contains: searchTerm } },
        { tags: { hasSome: searchTerm } },
      ],
    },
  });
  logger.info(`Found documents: ${JSON.stringify(documents)}`);
  return documents as EmbedDocument[];
};
