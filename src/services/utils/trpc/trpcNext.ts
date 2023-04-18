import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../../routers/_app';
import superjson from 'superjson';
import { createContext } from './trpcContext';
import { NextApiRequest, NextApiResponse } from 'next';

function getUrl() {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : "http://localhost:3000/api/trpc/";

  return url;
}

export const trpcNext = createTRPCNext<AppRouter>({
  config({ ctx }) {
    console.log('trpcNext config', ctx);

    // Cast ctx.req as NextApiRequest | null
    const createdContext = createContext({ req: ctx?.req as NextApiRequest | null, res: ctx?.res as NextApiResponse | null });

    if (typeof window !== 'undefined') {
      return {
        transformer: superjson,
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === 'development' ||
              (opts.direction === 'down' && opts.result instanceof Error),
          }),
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
        ctx: createdContext,
      };
    }

    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
      ctx: createdContext,
    };
  },
  ssr: true,
});
