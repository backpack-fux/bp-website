import type { AppRouter } from '../../server/routers/_app';
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const API_URL = process.env.NEXT_PUBLIC_TRPC_API_URL;
    if (!API_URL) {
      throw new Error('NEXT_PUBLIC_TRPC_API_URL environment variable is not set.');
    }

    return {
      links: [
        httpBatchLink({
          url: API_URL,
          async headers() {
            return {
              // Add any custom headers here
            };
          },
        }),
      ],
    };
  },
});
