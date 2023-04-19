import { router, middleware, publicProcedure } from './trpc';
import { appRouter } from '../../routers/_app';
import { TRPCError } from '@trpc/server';

describe('trpc.ts', () => {
  test('t object should be initialized', () => {
    expect(router).toBeDefined();
    expect(middleware).toBeDefined();
    expect(publicProcedure).toBeDefined();
  });

  test('appRouter should have the correct routers', () => {
    expect(appRouter).toHaveProperty('chatbot');
    expect(appRouter).toHaveProperty('conversation');
    expect(appRouter).toHaveProperty('info');
    expect(appRouter).toHaveProperty('root');
  });

  test('info route should return the correct information', async () => {
    const result = await appRouter.info.call(null, {
        ctx: undefined,
        rawInput: undefined,
        path: '',
        type: 'query'
    });
    expect(result).toEqual({
      chatbot: 'Available routes: sendMessage, addChatMessage, getChatMessagesByConversation, deleteChatMessage',
      conversation: 'Available routes: createConversation, getConversationsByUser',
    });
  });

  test('root route should return success status', async () => {
    const result = await appRouter.root.call(null, {
        ctx: undefined,
        rawInput: undefined,
        path: '',
        type: 'query'
    });
    expect(result).toEqual({ status: 'success' });
  });
  
 
});
