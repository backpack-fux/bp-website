// src/__tests__/documentRouter.test.ts
import { documentRouter } from '../trpc/routers/documentRouter';
import * as documentService from '../services/documentService';
import { mockDocumentRouter } from '../utils/mockDocumentRouter';
import { z } from 'zod';

// Mock the documentService functions
jest.mock('../services/documentService');

const exampleDocument = {
  title: 'Test Document',
  content: 'This is a test document.',
  tags: ['test'],
};
describe('Document Router', () => {
  beforeEach(() => {
    // Clear all mock instances and call counts
    jest.clearAllMocks();
  });

  test('get document', async () => {
    const id = 1;
    (documentService.getDocumentById as jest.Mock).mockResolvedValue({ id, ...exampleDocument });

    const result = await mockDocumentRouter.get(id);

    expect(documentService.getDocumentById).toHaveBeenCalledWith(id);
    expect(result).toMatchObject({ id, ...exampleDocument });
  });

  test('create document', async () => {
    const id = 1;
    (documentService.createDocument as jest.Mock).mockResolvedValue({ id, ...exampleDocument });

    const result = await mockDocumentRouter.create(exampleDocument);

    expect(documentService.createDocument).toHaveBeenCalledWith(exampleDocument);
    expect(result).toMatchObject({ id, ...exampleDocument });
  });

  test('update document', async () => {
    const id = 1;
    const updateData = { title: 'Updated Test Document' };
    const updatedDocument = { ...exampleDocument, ...updateData };
    (documentService.updateDocument as jest.Mock).mockResolvedValue(updatedDocument);
  
    const result = await mockDocumentRouter.update(id, updateData);
  
    expect(documentService.updateDocument).toHaveBeenCalledWith(id, updateData);
    expect(result).toMatchObject(updatedDocument);
  });

  test('delete document', async () => {
    const id = 1;
    (documentService.deleteDocument as jest.Mock).mockResolvedValue({ id, ...exampleDocument });

    const result = await mockDocumentRouter.delete(id);

    expect(documentService.deleteDocument).toHaveBeenCalledWith(id);
    expect(result).toMatchObject({ id, ...exampleDocument });
  });

  test('search documents', async () => {
    const searchTerm = 'test';
    (documentService.searchDocuments as jest.Mock).mockResolvedValue([{ id: 1, ...exampleDocument }]);

    const result = await mockDocumentRouter.search(searchTerm);

    expect(documentService.searchDocuments).toHaveBeenCalledWith(searchTerm);
    expect(result).toMatchObject([{ id: 1, ...exampleDocument }]);
  });
});
