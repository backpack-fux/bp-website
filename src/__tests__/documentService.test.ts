// src/__tests__/documentService.test.ts
import { prisma } from '../../prisma/prisma';
import * as documentService from '../services/documentService';

describe('Document Service', () => {
  const exampleDocument = {
    title: 'Test Document',
    content: 'This is a test document.',
    tags: ['test'],
  };

  afterEach(async () => {
    await prisma.embedDocument.deleteMany();
  });

  test('createDocument', async () => {
    const createdDocument = await documentService.createDocument(exampleDocument);
    expect(createdDocument).toMatchObject(exampleDocument);
  });

  test('getDocumentById', async () => {
    const createdDocument = await documentService.createDocument(exampleDocument);
    const retrievedDocument = await documentService.getDocumentById(createdDocument.id);
    expect(retrievedDocument).toMatchObject(createdDocument);
  });

  test('updateDocument', async () => {
    const createdDocument = await documentService.createDocument(exampleDocument);
    const updatedDocument = await documentService.updateDocument(createdDocument.id, { title: 'Updated Test Document' });
    expect(updatedDocument?.title).toBe('Updated Test Document');
  });

  test('deleteDocument', async () => {
    const createdDocument = await documentService.createDocument(exampleDocument);
    const deletedDocument = await documentService.deleteDocument(createdDocument.id);
    expect(deletedDocument).toMatchObject(createdDocument);
    const shouldBeNull = await documentService.getDocumentById(createdDocument.id);
    expect(shouldBeNull).toBeNull();
  });

  test('searchDocuments', async () => {
    await documentService.createDocument(exampleDocument);
    const searchResults = await documentService.searchDocuments('test');
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0]).toMatchObject(exampleDocument);
  });
});
