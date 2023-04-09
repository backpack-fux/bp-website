// src/trpc/routers.ts
import { userRouter } from './userRouter';
import { documentRouter } from './documentRouter';
import { embeddingModelRouter } from './embeddingModelRouter';
import { chatSessionRouter } from './chatSessionRouter';
import { chatMessageRouter } from './chatMessageRouter';
import { batchRouter } from './batchRouter';
import { router } from '../server';


const appRouter = router({
    user: userRouter,
    document: documentRouter,
    embeddingModel: embeddingModelRouter,
    chatSession: chatSessionRouter,
    chatMessage: chatMessageRouter,
    batch: batchRouter,
});

export type AppRouter = typeof appRouter;






